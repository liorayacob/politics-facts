// slug must match the "slug" property inside public/data/cities-boundaries.json
// so the map can join geometry with results. Turnout and vote-share numbers
// are placeholder — replace with the real per-city results once you have the
// government export file.
import type { CityResult } from "./types";

export const cities: CityResult[] = [
  { slug: "jerusalem", name: "ירושלים", turnoutPercent: 61.2, votePercentByParty: { "party-a": 45, "party-b": 40 } },
  { slug: "tel-aviv", name: "תל אביב-יפו", turnoutPercent: 68.5, votePercentByParty: { "party-a": 35, "party-b": 55 } },
  { slug: "haifa", name: "חיפה", turnoutPercent: 63.0, votePercentByParty: { "party-a": 48, "party-b": 42 } },
  { slug: "rishon-lezion", name: "ראשון לציון", turnoutPercent: 66.3, votePercentByParty: { "party-a": 41, "party-b": 47 } },
  { slug: "petah-tikva", name: "פתח תקווה", turnoutPercent: 65.1, votePercentByParty: { "party-a": 46, "party-b": 43 } },
  { slug: "ashdod", name: "אשדוד", turnoutPercent: 60.7, votePercentByParty: { "party-a": 55, "party-b": 33 } },
  { slug: "netanya", name: "נתניה", turnoutPercent: 64.1, votePercentByParty: { "party-a": 50, "party-b": 38 } },
  { slug: "beer-sheva", name: "באר שבע", turnoutPercent: 59.4, votePercentByParty: { "party-a": 52, "party-b": 36 } },
  { slug: "bnei-brak", name: "בני ברק", turnoutPercent: 72.8, votePercentByParty: { "party-a": 68, "party-b": 12 } },
  { slug: "holon", name: "חולון", turnoutPercent: 62.5, votePercentByParty: { "party-a": 44, "party-b": 46 } },
  { slug: "ramat-gan", name: "רמת גן", turnoutPercent: 67.9, votePercentByParty: { "party-a": 33, "party-b": 58 } },
  { slug: "bat-yam", name: "בת ים", turnoutPercent: 58.6, votePercentByParty: { "party-a": 47, "party-b": 41 } },
  { slug: "ashkelon", name: "אשקלון", turnoutPercent: 59.9, votePercentByParty: { "party-a": 54, "party-b": 34 } },
  { slug: "rehovot", name: "רחובות", turnoutPercent: 65.7, votePercentByParty: { "party-a": 43, "party-b": 48 } },
  { slug: "herzliya", name: "הרצליה", turnoutPercent: 69.4, votePercentByParty: { "party-a": 32, "party-b": 59 } },
  { slug: "kfar-saba", name: "כפר סבא", turnoutPercent: 70.2, votePercentByParty: { "party-a": 34, "party-b": 57 } },
  { slug: "hadera", name: "חדרה", turnoutPercent: 61.8, votePercentByParty: { "party-a": 49, "party-b": 39 } },
  { slug: "modiin", name: "מודיעין-מכבים-רעות", turnoutPercent: 71.5, votePercentByParty: { "party-a": 38, "party-b": 53 } },
  { slug: "nazareth", name: "נצרת", turnoutPercent: 47.3, votePercentByParty: { "party-a": 20, "party-b": 18 } },
  { slug: "raanana", name: "רעננה", turnoutPercent: 71.0, votePercentByParty: { "party-a": 31, "party-b": 60 } },
  { slug: "givatayim", name: "גבעתיים", turnoutPercent: 70.6, votePercentByParty: { "party-a": 28, "party-b": 62 } },
  { slug: "lod", name: "לוד", turnoutPercent: 54.2, votePercentByParty: { "party-a": 50, "party-b": 30 } },
  { slug: "ramla", name: "רמלה", turnoutPercent: 55.8, votePercentByParty: { "party-a": 51, "party-b": 31 } },
  { slug: "eilat", name: "אילת", turnoutPercent: 57.8, votePercentByParty: { "party-a": 39, "party-b": 49 } },
  { slug: "kiryat-gat", name: "קרית גת", turnoutPercent: 58.3, votePercentByParty: { "party-a": 53, "party-b": 32 } },
  { slug: "kiryat-ata", name: "קרית אתא", turnoutPercent: 60.1, votePercentByParty: { "party-a": 47, "party-b": 41 } },
  { slug: "kiryat-shmona", name: "קרית שמונה", turnoutPercent: 56.4, votePercentByParty: { "party-a": 56, "party-b": 29 } },
];

export function getCityBySlug(slug: string): CityResult | undefined {
  return cities.find((c) => c.slug === slug);
}

export function getWinningPartySlug(city: CityResult): string {
  return Object.entries(city.votePercentByParty).sort((a, b) => b[1] - a[1])[0][0];
}
