export interface Party {
  slug: string;
  name: string;
  founded: number;
  leader: string;
  description: string;
  ideology: string[];
}

export interface Politician {
  slug: string;
  name: string;
  partySlug: string;
  role: string;
  bio: string;
}

export interface ElectionResult {
  year: number;
  knesset: number;
  turnoutPercent: number;
  seatsByParty: Record<string, number>;
}
