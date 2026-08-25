// Placeholder data — replace with real, sourced biographical facts
import type { Politician } from "./types";

export const politicians: Politician[] = [
  {
    slug: "politician-a",
    name: "שם פוליטיקאי א'",
    partySlug: "party-a",
    role: "יו\"ר מפלגה",
    bio: "ביוגרפיה לדוגמה — יש להחליף בפרטים אמיתיים ומתועדים.",
  },
  {
    slug: "politician-b",
    name: "שם פוליטיקאי ב'",
    partySlug: "party-b",
    role: "חבר/ת כנסת",
    bio: "ביוגרפיה לדוגמה — יש להחליף בפרטים אמיתיים ומתועדים.",
  },
];

export function getPoliticianBySlug(slug: string): Politician | undefined {
  return politicians.find((p) => p.slug === slug);
}
