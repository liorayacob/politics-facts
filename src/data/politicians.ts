// Placeholder data — replace with real, sourced biographical facts
import type { Politician } from "./types";

export const politicians: Politician[] = [
  {
    slug: "politician-a",
    name: "שם פוליטיקאי א'",
    partySlug: "party-a",
    role: "יו\"ר מפלגה",
    bio: "ביוגרפיה לדוגמה — יש להחליף בפרטים אמיתיים ומתועדים.",
    isChair: true,
    termCount: 4,
  },
  {
    slug: "politician-c",
    name: "שם פוליטיקאי ג'",
    partySlug: "party-a",
    role: "חבר כנסת",
    bio: "ביוגרפיה לדוגמה — יש להחליף בפרטים אמיתיים ומתועדים.",
    isChair: false,
    termCount: 2,
  },
  {
    slug: "politician-d",
    name: "שם פוליטיקאית ד'",
    partySlug: "party-a",
    role: "חברת כנסת",
    bio: "ביוגרפיה לדוגמה — יש להחליף בפרטים אמיתיים ומתועדים.",
    isChair: false,
    termCount: 1,
  },
  {
    slug: "politician-b",
    name: "שם פוליטיקאי ב'",
    partySlug: "party-b",
    role: "יו\"ר מפלגה",
    bio: "ביוגרפיה לדוגמה — יש להחליף בפרטים אמיתיים ומתועדים.",
    isChair: true,
    termCount: 3,
  },
  {
    slug: "politician-e",
    name: "שם פוליטיקאית ה'",
    partySlug: "party-b",
    role: "חברת כנסת",
    bio: "ביוגרפיה לדוגמה — יש להחליף בפרטים אמיתיים ומתועדים.",
    isChair: false,
    termCount: 1,
  },
];

export function getPoliticianBySlug(slug: string): Politician | undefined {
  return politicians.find((p) => p.slug === slug);
}

export function getPartyMembers(partySlug: string): Politician[] {
  return politicians
    .filter((p) => p.partySlug === partySlug)
    .sort((a, b) => {
      if (a.isChair !== b.isChair) return a.isChair ? -1 : 1;
      return b.termCount - a.termCount;
    });
}

export function getPartyChair(partySlug: string): Politician | undefined {
  return politicians.find((p) => p.partySlug === partySlug && p.isChair);
}
