// One-time data-import script: reads the government "results by locality"
// export (columns: סמל ועדה, שם ישוב, סמל ישוב, בזב, מצביעים, פסולים, כשרים,
// then one column per party ballot letter-code) and regenerates
// src/data/cities.generated.ts with real turnout/vote-share numbers for the
// localities we already have map boundaries for.
//
// Usage:
//   1. Put the file at scripts/data/election-results.xlsx (or .csv)
//   2. Fill in scripts/data/party-letter-map.json with the letters that
//      matter to you (the report at the end lists what's still unmapped)
//   3. npm run import:elections
//   4. Review src/data/cities.generated.ts, then rename it to cities.ts
//      (or copy the parts you want) once it looks right.

import ExcelJS from "exceljs";
import { readFileSync, writeFileSync, existsSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, "data");
const XLSX_PATH = path.join(DATA_DIR, "election-results.xlsx");
const CSV_PATH = path.join(DATA_DIR, "election-results.csv");
const OUTPUT_PATH = path.join(__dirname, "..", "src", "data", "cities.generated.ts");

const METADATA_COLUMNS = {
  committee: "סמל ועדה",
  name: "שם ישוב",
  cityCode: "סמל ישוב",
  registered: "בזב",
  voted: "מצביעים",
  invalid: "פסולים",
  valid: "כשרים",
};

function loadJson(file) {
  return JSON.parse(readFileSync(path.join(DATA_DIR, file), "utf-8"));
}

function normalizeName(name) {
  return String(name)
    .trim()
    .replace(/\s+/g, " ")
    .replace(/\s*-\s*/g, "-")
    .replace(/["']/g, "");
}

async function loadWorkbookSheet() {
  const workbook = new ExcelJS.Workbook();
  if (existsSync(XLSX_PATH)) {
    await workbook.xlsx.readFile(XLSX_PATH);
    return workbook.worksheets[0];
  }
  if (existsSync(CSV_PATH)) {
    await workbook.csv.readFile(CSV_PATH);
    return workbook.worksheets[0];
  }
  throw new Error(
    `No input file found. Put the results file at:\n  ${XLSX_PATH}\nor\n  ${CSV_PATH}`
  );
}

function cellText(cell) {
  if (cell === null || cell === undefined) return "";
  if (typeof cell === "object" && "text" in cell) return String(cell.text);
  if (typeof cell === "object" && "result" in cell) return String(cell.result);
  return String(cell);
}

function cellNumber(cell) {
  const n = Number(cellText(cell).replace(/,/g, ""));
  return Number.isFinite(n) ? n : 0;
}

async function main() {
  const sheet = await loadWorkbookSheet();
  const letterToParty = loadJson("party-letter-map.json");
  const cityAliases = loadJson("city-name-aliases.json");

  const nameToSlug = new Map();
  const slugToCanonicalName = new Map();
  for (const [slug, names] of Object.entries(cityAliases)) {
    if (slug.startsWith("_")) continue;
    slugToCanonicalName.set(slug, names[0]);
    for (const name of names) nameToSlug.set(normalizeName(name), slug);
  }

  const headerRow = sheet.getRow(1);
  const headerToCol = new Map();
  headerRow.eachCell((cell, colNumber) => {
    headerToCol.set(cellText(cell.value).trim(), colNumber);
  });

  const requiredCols = {};
  for (const [key, header] of Object.entries(METADATA_COLUMNS)) {
    const col = headerToCol.get(header);
    if (!col) throw new Error(`Column "${header}" not found in the file header row.`);
    requiredCols[key] = col;
  }

  const partyCols = []; // { letter, col, slug|null }
  for (const [header, col] of headerToCol.entries()) {
    if (Object.values(METADATA_COLUMNS).includes(header)) continue;
    partyCols.push({ letter: header, col, slug: letterToParty[header] ?? null });
  }

  const resultsBySlug = new Map(); // slug -> { name, registered, voted, valid, votesByParty }
  const unmatchedNames = new Map(); // raw name -> row count
  const unmappedLetterTotals = new Map(); // letter -> total votes
  let rowCount = 0;

  sheet.eachRow((row, rowNumber) => {
    if (rowNumber === 1) return;
    rowCount++;

    const rawName = cellText(row.getCell(requiredCols.name).value);
    const slug = nameToSlug.get(normalizeName(rawName));

    for (const { letter, col, slug: partySlug } of partyCols) {
      const votes = cellNumber(row.getCell(col).value);
      if (!partySlug) {
        unmappedLetterTotals.set(letter, (unmappedLetterTotals.get(letter) ?? 0) + votes);
      }
    }

    if (!slug) {
      unmatchedNames.set(rawName, (unmatchedNames.get(rawName) ?? 0) + 1);
      return;
    }

    const registered = cellNumber(row.getCell(requiredCols.registered).value);
    const voted = cellNumber(row.getCell(requiredCols.voted).value);
    const valid = cellNumber(row.getCell(requiredCols.valid).value);

    if (!resultsBySlug.has(slug)) {
      resultsBySlug.set(slug, {
        name: slugToCanonicalName.get(slug) ?? rawName,
        registered: 0,
        voted: 0,
        valid: 0,
        votesByParty: {},
      });
    }
    const entry = resultsBySlug.get(slug);
    entry.registered += registered;
    entry.voted += voted;
    entry.valid += valid;

    for (const { col, slug: partySlug } of partyCols) {
      if (!partySlug) continue;
      const votes = cellNumber(row.getCell(col).value);
      entry.votesByParty[partySlug] = (entry.votesByParty[partySlug] ?? 0) + votes;
    }
  });

  const cities = [];
  for (const [slug, entry] of resultsBySlug.entries()) {
    const turnoutPercent = entry.registered > 0 ? Math.round((entry.voted / entry.registered) * 1000) / 10 : 0;
    const votePercentByParty = {};
    for (const [partySlug, votes] of Object.entries(entry.votesByParty)) {
      if (votes === 0) continue;
      votePercentByParty[partySlug] = entry.valid > 0 ? Math.round((votes / entry.valid) * 1000) / 10 : 0;
    }
    cities.push({ slug, name: entry.name, turnoutPercent, votePercentByParty });
  }
  cities.sort((a, b) => a.slug.localeCompare(b.slug));

  const fileContents = `// Generated by scripts/import-election-results.mjs — review before replacing cities.ts
import type { CityResult } from "./types";

export const cities: CityResult[] = ${JSON.stringify(cities, null, 2)};

export function getCityBySlug(slug: string): CityResult | undefined {
  return cities.find((c) => c.slug === slug);
}

export function getWinningPartySlug(city: CityResult): string {
  return Object.entries(city.votePercentByParty).sort((a, b) => b[1] - a[1])[0][0];
}
`;

  writeFileSync(OUTPUT_PATH, fileContents, "utf-8");

  const expectedSlugs = new Set(nameToSlug.values());

  console.log(`\nProcessed ${rowCount} rows.`);
  console.log(`Matched ${resultsBySlug.size} / ${expectedSlugs.size} known localities.`);
  console.log(`Wrote ${path.relative(process.cwd(), OUTPUT_PATH)}\n`);

  const missing = [...expectedSlugs].filter((s) => !resultsBySlug.has(s));
  if (missing.length) {
    console.log("Known localities NOT found in the file (check city-name-aliases.json):");
    console.log("  " + missing.join(", ") + "\n");
  }

  const topUnmatched = [...unmatchedNames.entries()].slice(0, 15);
  if (topUnmatched.length) {
    console.log(`${unmatchedNames.size} other locality names in the file were not in our known list (first 15):`);
    for (const [name] of topUnmatched) console.log("  " + name);
    console.log("");
  }

  const topUnmappedLetters = [...unmappedLetterTotals.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 15);
  if (topUnmappedLetters.length) {
    console.log("Party letter-codes with no mapping yet, by national vote total (add these to party-letter-map.json):");
    for (const [letter, votes] of topUnmappedLetters) console.log(`  ${letter}: ${votes.toLocaleString()} votes`);
    console.log("");
  }
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
