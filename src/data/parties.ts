// Placeholder data — replace with real figures from official sources (e.g. ועדת הבחירות המרכזית, הלמ"ס)
import type { Party } from "./types";

export const parties: Party[] = [
  {
    slug: "party-a",
    name: "מפלגה א'",
    founded: 2000,
    color: "#3f7fdb",
    description: "תיאור לדוגמה — יש להחליף בפרטים אמיתיים.",
    ideology: ["תגית 1", "תגית 2"],
  },
  {
    slug: "party-b",
    name: "מפלגה ב'",
    founded: 2010,
    color: "#e6a23c",
    description: "תיאור לדוגמה — יש להחליף בפרטים אמיתיים.",
    ideology: ["תגית 1", "תגית 2"],
  },
];

export function getPartyBySlug(slug: string): Party | undefined {
  return parties.find((p) => p.slug === slug);
}
