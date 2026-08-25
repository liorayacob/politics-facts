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
    color: "#c73e3e",
    description: "תיאור לדוגמה — יש להחליף בפרטים אמיתיים ומתועדים.",
    ideology: ["תגית 1", "תגית 2"],
  },
  {
    slug: "yesh-atid",
    name: "יש עתיד",
    founded: 2012,
    color: "#1b998b",
    description: "תיאור לדוגמה — יש להחליף בפרטים אמיתיים ומתועדים.",
    ideology: ["תגית 1", "תגית 2"],
  },
  {
    slug: "national-unity",
    name: "המחנה הממלכתי",
    founded: 2020,
    color: "#2f66c9",
    description: "תיאור לדוגמה — יש להחליף בפרטים אמיתיים ומתועדים.",
    ideology: ["תגית 1", "תגית 2"],
  },
  {
    slug: "religious-zionism",
    name: "הציונות הדתית",
    founded: 1999,
    color: "#2e7d5b",
    description: "תיאור לדוגמה — יש להחליף בפרטים אמיתיים ומתועדים.",
    ideology: ["תגית 1", "תגית 2"],
  },
  {
    slug: "shas",
    name: "ש\"ס",
    founded: 1984,
    color: "#c15a2e",
    description: "תיאור לדוגמה — יש להחליף בפרטים אמיתיים ומתועדים.",
    ideology: ["תגית 1", "תגית 2"],
  },
  {
    slug: "torah-judaism",
    name: "יהדות התורה",
    founded: 1992,
    color: "#6a3fd6",
    description: "תיאור לדוגמה — יש להחליף בפרטים אמיתיים ומתועדים.",
    ideology: ["תגית 1", "תגית 2"],
  },
  {
    slug: "yisrael-beiteinu",
    name: "ישראל ביתנו",
    founded: 1999,
    color: "#a3348a",
    description: "תיאור לדוגמה — יש להחליף בפרטים אמיתיים ומתועדים.",
    ideology: ["תגית 1", "תגית 2"],
  },
  {
    slug: "labor",
    name: "העבודה",
    founded: 1968,
    color: "#6f8a1f",
    description: "תיאור לדוגמה — יש להחליף בפרטים אמיתיים ומתועדים.",
    ideology: ["תגית 1", "תגית 2"],
  },
];

export function getPartyBySlug(slug: string): Party | undefined {
  return parties.find((p) => p.slug === slug);
}
