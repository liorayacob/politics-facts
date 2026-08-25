// Coordinates are real (approximate city centers) so marker placement looks right.
// Turnout and vote-share numbers are placeholder — replace with the real per-city
// results once you have the government export file.
import type { CityResult } from "./types";

export const cities: CityResult[] = [
  {
    slug: "jerusalem",
    name: "ירושלים",
    lat: 31.78,
    lng: 35.22,
    turnoutPercent: 61.2,
    votePercentByParty: { "party-a": 45, "party-b": 40 },
  },
  {
    slug: "tel-aviv",
    name: "תל אביב-יפו",
    lat: 32.08,
    lng: 34.78,
    turnoutPercent: 68.5,
    votePercentByParty: { "party-a": 35, "party-b": 55 },
  },
  {
    slug: "haifa",
    name: "חיפה",
    lat: 32.79,
    lng: 34.99,
    turnoutPercent: 63.0,
    votePercentByParty: { "party-a": 48, "party-b": 42 },
  },
  {
    slug: "beer-sheva",
    name: "באר שבע",
    lat: 31.25,
    lng: 34.79,
    turnoutPercent: 59.4,
    votePercentByParty: { "party-a": 52, "party-b": 36 },
  },
  {
    slug: "netanya",
    name: "נתניה",
    lat: 32.33,
    lng: 34.86,
    turnoutPercent: 64.1,
    votePercentByParty: { "party-a": 50, "party-b": 38 },
  },
  {
    slug: "ashdod",
    name: "אשדוד",
    lat: 31.8,
    lng: 34.65,
    turnoutPercent: 60.7,
    votePercentByParty: { "party-a": 55, "party-b": 33 },
  },
  {
    slug: "rishon-lezion",
    name: "ראשון לציון",
    lat: 31.97,
    lng: 34.79,
    turnoutPercent: 66.3,
    votePercentByParty: { "party-a": 41, "party-b": 47 },
  },
  {
    slug: "eilat",
    name: "אילת",
    lat: 29.56,
    lng: 34.95,
    turnoutPercent: 57.8,
    votePercentByParty: { "party-a": 39, "party-b": 49 },
  },
];

export function getCityBySlug(slug: string): CityResult | undefined {
  return cities.find((c) => c.slug === slug);
}

export function getWinningPartySlug(city: CityResult): string {
  return Object.entries(city.votePercentByParty).sort((a, b) => b[1] - a[1])[0][0];
}
