// slug must match the "slug" property inside public/data/cities-boundaries.json
// so the map can join geometry with results. Turnout and vote-share numbers
// are placeholder — replace with the real per-city results once you have the
// government export file.
import type { CityResult } from "./types";

export const cities: CityResult[] = [
  { slug: "jerusalem", name: "ירושלים", turnoutPercent: 61.2, votePercentByParty: { likud: 28, shas: 22, "torah-judaism": 15, "yesh-atid": 12 } },
  { slug: "tel-aviv", name: "תל אביב-יפו", turnoutPercent: 68.5, votePercentByParty: { "yesh-atid": 34, "national-unity": 22, likud: 14, labor: 11 } },
  { slug: "haifa", name: "חיפה", turnoutPercent: 63.0, votePercentByParty: { likud: 27, "yesh-atid": 24, "national-unity": 16, labor: 9 } },
  { slug: "rishon-lezion", name: "ראשון לציון", turnoutPercent: 66.3, votePercentByParty: { likud: 26, "yesh-atid": 25, "national-unity": 15, "yisrael-beiteinu": 10 } },
  { slug: "petah-tikva", name: "פתח תקווה", turnoutPercent: 65.1, votePercentByParty: { likud: 30, "yesh-atid": 20, "torah-judaism": 12, shas: 9 } },
  { slug: "ashdod", name: "אשדוד", turnoutPercent: 60.7, votePercentByParty: { likud: 29, shas: 24, "yisrael-beiteinu": 14, "yesh-atid": 10 } },
  { slug: "netanya", name: "נתניה", turnoutPercent: 64.1, votePercentByParty: { likud: 31, "yesh-atid": 19, shas: 13, "yisrael-beiteinu": 9 } },
  { slug: "beer-sheva", name: "באר שבע", turnoutPercent: 59.4, votePercentByParty: { likud: 28, "yisrael-beiteinu": 20, shas: 16, "yesh-atid": 11 } },
  { slug: "bnei-brak", name: "בני ברק", turnoutPercent: 72.8, votePercentByParty: { "torah-judaism": 52, shas: 30, likud: 8 } },
  { slug: "holon", name: "חולון", turnoutPercent: 62.5, votePercentByParty: { likud: 27, "yesh-atid": 23, "national-unity": 14, labor: 8 } },
  { slug: "ramat-gan", name: "רמת גן", turnoutPercent: 67.9, votePercentByParty: { "yesh-atid": 30, "national-unity": 21, likud: 15, labor: 10 } },
  { slug: "bat-yam", name: "בת ים", turnoutPercent: 58.6, votePercentByParty: { likud: 29, "yesh-atid": 21, "yisrael-beiteinu": 13, shas: 9 } },
  { slug: "ashkelon", name: "אשקלון", turnoutPercent: 59.9, votePercentByParty: { likud: 30, "yisrael-beiteinu": 18, shas: 15, "yesh-atid": 10 } },
  { slug: "rehovot", name: "רחובות", turnoutPercent: 65.7, votePercentByParty: { likud: 25, "yesh-atid": 24, "national-unity": 16, "torah-judaism": 9 } },
  { slug: "herzliya", name: "הרצליה", turnoutPercent: 69.4, votePercentByParty: { "yesh-atid": 33, "national-unity": 23, likud: 12, labor: 9 } },
  { slug: "kfar-saba", name: "כפר סבא", turnoutPercent: 70.2, votePercentByParty: { "yesh-atid": 32, "national-unity": 22, likud: 13, labor: 9 } },
  { slug: "hadera", name: "חדרה", turnoutPercent: 61.8, votePercentByParty: { likud: 28, "yesh-atid": 20, "yisrael-beiteinu": 12, shas: 10 } },
  { slug: "modiin", name: "מודיעין-מכבים-רעות", turnoutPercent: 71.5, votePercentByParty: { "yesh-atid": 29, "national-unity": 24, likud: 16, "religious-zionism": 8 } },
  { slug: "nazareth", name: "נצרת", turnoutPercent: 47.3, votePercentByParty: { likud: 5, "yesh-atid": 4, "national-unity": 3 } },
  { slug: "raanana", name: "רעננה", turnoutPercent: 71.0, votePercentByParty: { "yesh-atid": 34, "national-unity": 24, likud: 11, labor: 10 } },
  { slug: "givatayim", name: "גבעתיים", turnoutPercent: 70.6, votePercentByParty: { "yesh-atid": 36, "national-unity": 22, labor: 12, likud: 9 } },
  { slug: "lod", name: "לוד", turnoutPercent: 54.2, votePercentByParty: { likud: 26, shas: 16, "yisrael-beiteinu": 13, "yesh-atid": 9 } },
  { slug: "ramla", name: "רמלה", turnoutPercent: 55.8, votePercentByParty: { likud: 27, shas: 15, "yisrael-beiteinu": 13, "yesh-atid": 10 } },
  { slug: "eilat", name: "אילת", turnoutPercent: 57.8, votePercentByParty: { likud: 24, "yesh-atid": 22, "yisrael-beiteinu": 15, "national-unity": 9 } },
  { slug: "kiryat-gat", name: "קרית גת", turnoutPercent: 58.3, votePercentByParty: { likud: 31, shas: 18, "yisrael-beiteinu": 12, "yesh-atid": 8 } },
  { slug: "kiryat-ata", name: "קרית אתא", turnoutPercent: 60.1, votePercentByParty: { likud: 29, "yisrael-beiteinu": 17, "yesh-atid": 15, shas: 9 } },
  { slug: "kiryat-shmona", name: "קרית שמונה", turnoutPercent: 56.4, votePercentByParty: { likud: 33, "yisrael-beiteinu": 16, shas: 12, "yesh-atid": 8 } },
];

export function getCityBySlug(slug: string): CityResult | undefined {
  return cities.find((c) => c.slug === slug);
}

export function getWinningPartySlug(city: CityResult): string {
  return Object.entries(city.votePercentByParty).sort((a, b) => b[1] - a[1])[0][0];
}
