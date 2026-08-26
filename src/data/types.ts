export interface Party {
  slug: string;
  name: string;
  founded: number;
  color: string;
  description: string;
  ideology: string[];
}

export interface Politician {
  slug: string;
  name: string;
  partySlug: string;
  role: string;
  bio: string;
  isChair: boolean;
  termCount: number;
}

export interface ElectionResult {
  year: number;
  knesset: number;
  turnoutPercent: number;
}

// A ticket is what actually appeared on the ballot in a given Knesset election —
// a single party running alone, or several parties running as one joint list
// under a shared letter (e.g. Religious Zionism + Otzma Yehudit + Noam in 2022).
export interface Ticket {
  slug: string;
  knesset: number;
  letter: string;
  name: string;
  color: string;
  votePct: number;
  seats: number;
  memberPartySlugs: string[];
  seatsByMemberParty?: Record<string, number>;
}

export interface CityResult {
  slug: string;
  name: string;
  turnoutPercent: number;
  votePercentByParty: Record<string, number>;
}
