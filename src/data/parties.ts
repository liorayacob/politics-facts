// Placeholder data — real, recognizable party names so the map/legend look
// meaningful, but colors, founding years, and descriptions are all
// placeholders for you to replace with sourced facts.
import type { Party } from "./types";

export const parties: Party[] = [
  {
    slug: "likud",
    name: "הליכוד",
    founded: 1973,
    color: "#3f7fdb",
    description: "תיאור לדוגמה — יש להחליף בפרטים אמיתיים ומתועדים.",
    ideology: ["תגית 1", "תגית 2"],
  },
  {
    slug: "yesh-atid",
    name: "יש עתיד",
    founded: 2012,
    color: "#14b8a6",
    description: "תיאור לדוגמה — יש להחליף בפרטים אמיתיים ומתועדים.",
    ideology: ["תגית 1", "תגית 2"],
  },
  {
    slug: "national-unity",
    name: "המחנה הממלכתי",
    founded: 2020,
    color: "#6366f1",
    description: "תיאור לדוגמה — יש להחליף בפרטים אמיתיים ומתועדים.",
    ideology: ["תגית 1", "תגית 2"],
  },
  {
    slug: "religious-zionism",
    name: "הציונות הדתית",
    founded: 1999,
    color: "#10b981",
    description: "תיאור לדוגמה — יש להחליף בפרטים אמיתיים ומתועדים.",
    ideology: ["תגית 1", "תגית 2"],
  },
  {
    slug: "shas",
    name: "ש\"ס",
    founded: 1984,
    color: "#f59e0b",
    description: "תיאור לדוגמה — יש להחליף בפרטים אמיתיים ומתועדים.",
    ideology: ["תגית 1", "תגית 2"],
  },
  {
    slug: "torah-judaism",
    name: "יהדות התורה",
    founded: 1992,
    color: "#a855f7",
    description: "תיאור לדוגמה — יש להחליף בפרטים אמיתיים ומתועדים.",
    ideology: ["תגית 1", "תגית 2"],
  },
  {
    slug: "yisrael-beiteinu",
    name: "ישראל ביתנו",
    founded: 1999,
    color: "#ef4444",
    description: "תיאור לדוגמה — יש להחליף בפרטים אמיתיים ומתועדים.",
    ideology: ["תגית 1", "תגית 2"],
  },
  {
    slug: "labor",
    name: "העבודה",
    founded: 1968,
    color: "#e6a23c",
    description: "תיאור לדוגמה — יש להחליף בפרטים אמיתיים ומתועדים.",
    ideology: ["תגית 1", "תגית 2"],
  },
];

export function getPartyBySlug(slug: string): Party | undefined {
  return parties.find((p) => p.slug === slug);
}
