// Placeholder data — real, recognizable party names so the map/legend look
// meaningful, but colors, founding years, and descriptions are all
// placeholders for you to replace with sourced facts. Colors were picked
// purely for maximum visual distinction on the map/legend (evenly spread
// hues) — they don't try to match each party's real branding.
import type { Party } from "./types";

export const parties: Party[] = [
  {
    slug: "likud",
    name: "הליכוד",
    founded: 1973,
    color: "#ff5d5d",
    description: "תיאור לדוגמה — יש להחליף בפרטים אמיתיים ומתועדים.",
    ideology: ["תגית 1", "תגית 2"],
  },
  {
    slug: "yesh-atid",
    name: "יש עתיד",
    founded: 2012,
    color: "#4ecdc4",
    description: "תיאור לדוגמה — יש להחליף בפרטים אמיתיים ומתועדים.",
    ideology: ["תגית 1", "תגית 2"],
  },
  {
    slug: "national-unity",
    name: "המחנה הממלכתי",
    founded: 2020,
    color: "#4d96ff",
    description: "תיאור לדוגמה — יש להחליף בפרטים אמיתיים ומתועדים.",
    ideology: ["תגית 1", "תגית 2"],
  },
  {
    slug: "religious-zionism",
    name: "הציונות הדתית",
    founded: 1999,
    color: "#43aa8b",
    description: "תיאור לדוגמה — יש להחליף בפרטים אמיתיים ומתועדים.",
    ideology: ["תגית 1", "תגית 2"],
  },
  {
    slug: "shas",
    name: "ש\"ס",
    founded: 1984,
    color: "#f4784a",
    description: "תיאור לדוגמה — יש להחליף בפרטים אמיתיים ומתועדים.",
    ideology: ["תגית 1", "תגית 2"],
  },
  {
    slug: "torah-judaism",
    name: "יהדות התורה",
    founded: 1992,
    color: "#7c5cff",
    description: "תיאור לדוגמה — יש להחליף בפרטים אמיתיים ומתועדים.",
    ideology: ["תגית 1", "תגית 2"],
  },
  {
    slug: "yisrael-beiteinu",
    name: "ישראל ביתנו",
    founded: 1999,
    color: "#d65db1",
    description: "תיאור לדוגמה — יש להחליף בפרטים אמיתיים ומתועדים.",
    ideology: ["תגית 1", "תגית 2"],
  },
  {
    slug: "labor",
    name: "העבודה",
    founded: 1968,
    color: "#b0e64c",
    description: "תיאור לדוגמה — יש להחליף בפרטים אמיתיים ומתועדים.",
    ideology: ["תגית 1", "תגית 2"],
  },
];

export function getPartyBySlug(slug: string): Party | undefined {
  return parties.find((p) => p.slug === slug);
}
