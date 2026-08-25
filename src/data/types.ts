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
  seatsByParty: Record<string, number>;
}

export interface CityResult {
  slug: string;
  name: string;
  turnoutPercent: number;
  votePercentByParty: Record<string, number>;
}
