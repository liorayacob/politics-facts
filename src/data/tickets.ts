// Tickets = what actually appeared on the ballot in a given Knesset election:
// one party running alone, or several parties running together as one joint
// list under a single letter and sharing one bag of votes/seats.
//
// Knesset 25 (2022) below is a real, sourced example of a joint list: Religious
// Zionism, Otzma Yehudit and Noam ran together under letter "ט" and won 14
// seats. Seats, the letter, and the list composition are cross-checked against
// news coverage and Hebrew Wikipedia. Vote percentages are from memory and
// should be double-checked against the official results before publishing:
// https://votes25.bechirot.gov.il/
//
// Knesset 23–24 tickets are still placeholder data (one party per ticket),
// carried over from the old seatsByParty numbers.
import type { Ticket } from "./types";

export const tickets: Ticket[] = [
  // Knesset 23 (2020) — placeholder
  { slug: "likud-23", knesset: 23, letter: "מחל", name: "הליכוד", color: "#3ea6da", votePct: 25.1, seats: 30, memberPartySlugs: ["likud"] },
  { slug: "yesh-atid-23", knesset: 23, letter: "פה", name: "יש עתיד", color: "#29ae45", votePct: 13.6, seats: 16, memberPartySlugs: ["yesh-atid"] },
  { slug: "national-unity-23", knesset: 23, letter: "כן", name: "המחנה הממלכתי", color: "#6029ae", votePct: 12.7, seats: 15, memberPartySlugs: ["national-unity"] },
  { slug: "religious-zionism-23", knesset: 23, letter: "ט", name: "הציונות הדתית", color: "#ae7d29", votePct: 6.8, seats: 8, memberPartySlugs: ["religious-zionism"] },
  { slug: "shas-23", knesset: 23, letter: "שס", name: "ש\"ס", color: "#29ae9a", votePct: 7.6, seats: 9, memberPartySlugs: ["shas"] },
  { slug: "torah-judaism-23", knesset: 23, letter: "ג", name: "יהדות התורה", color: "#ae29a7", votePct: 5.9, seats: 7, memberPartySlugs: ["torah-judaism"] },
  { slug: "yisrael-beiteinu-23", knesset: 23, letter: "ל", name: "ישראל ביתנו", color: "#8aae29", votePct: 5.9, seats: 7, memberPartySlugs: ["yisrael-beiteinu"] },
  { slug: "labor-23", knesset: 23, letter: "אמת", name: "העבודה", color: "#2970ae", votePct: 5.1, seats: 6, memberPartySlugs: ["labor"] },

  // Knesset 24 (2021) — placeholder
  { slug: "likud-24", knesset: 24, letter: "מחל", name: "הליכוד", color: "#3ea6da", votePct: 26.8, seats: 32, memberPartySlugs: ["likud"] },
  { slug: "yesh-atid-24", knesset: 24, letter: "פה", name: "יש עתיד", color: "#29ae45", votePct: 15.2, seats: 18, memberPartySlugs: ["yesh-atid"] },
  { slug: "national-unity-24", knesset: 24, letter: "כן", name: "המחנה הממלכתי", color: "#6029ae", votePct: 11.0, seats: 13, memberPartySlugs: ["national-unity"] },
  { slug: "religious-zionism-24", knesset: 24, letter: "ט", name: "הציונות הדתית", color: "#ae7d29", votePct: 8.4, seats: 10, memberPartySlugs: ["religious-zionism"] },
  { slug: "shas-24", knesset: 24, letter: "שס", name: "ש\"ס", color: "#29ae9a", votePct: 6.7, seats: 8, memberPartySlugs: ["shas"] },
  { slug: "torah-judaism-24", knesset: 24, letter: "ג", name: "יהדות התורה", color: "#ae29a7", votePct: 5.9, seats: 7, memberPartySlugs: ["torah-judaism"] },
  { slug: "yisrael-beiteinu-24", knesset: 24, letter: "ל", name: "ישראל ביתנו", color: "#8aae29", votePct: 5.1, seats: 6, memberPartySlugs: ["yisrael-beiteinu"] },
  { slug: "labor-24", knesset: 24, letter: "אמת", name: "העבודה", color: "#2970ae", votePct: 4.2, seats: 5, memberPartySlugs: ["labor"] },

  // Knesset 25 (2022) — real results. This is the joint-list example.
  { slug: "likud-25", knesset: 25, letter: "מחל", name: "הליכוד", color: "#3ea6da", votePct: 23.41, seats: 32, memberPartySlugs: ["likud"] },
  { slug: "yesh-atid-25", knesset: 25, letter: "פה", name: "יש עתיד", color: "#29ae45", votePct: 17.79, seats: 24, memberPartySlugs: ["yesh-atid"] },
  {
    slug: "religious-zionism-list-25",
    knesset: 25,
    letter: "ט",
    name: "הציונות הדתית",
    color: "#ae7d29",
    votePct: 10.84,
    seats: 14,
    memberPartySlugs: ["religious-zionism", "otzma-yehudit", "noam"],
    // Seat split by list position: הציונות הדתית 1,3,4,6,8,12,14 · עוצמה יהודית 2,5,7,9,10,13 · נעם 11
    seatsByMemberParty: { "religious-zionism": 7, "otzma-yehudit": 6, noam: 1 },
  },
  { slug: "national-unity-25", knesset: 25, letter: "כן", name: "המחנה הממלכתי", color: "#6029ae", votePct: 9.15, seats: 12, memberPartySlugs: ["national-unity"] },
  { slug: "shas-25", knesset: 25, letter: "שס", name: "ש\"ס", color: "#29ae9a", votePct: 8.25, seats: 11, memberPartySlugs: ["shas"] },
  { slug: "torah-judaism-25", knesset: 25, letter: "ג", name: "יהדות התורה", color: "#ae29a7", votePct: 5.30, seats: 7, memberPartySlugs: ["torah-judaism"] },
  { slug: "yisrael-beiteinu-25", knesset: 25, letter: "ל", name: "ישראל ביתנו", color: "#8aae29", votePct: 4.49, seats: 6, memberPartySlugs: ["yisrael-beiteinu"] },
  { slug: "raam-25", knesset: 25, letter: "עם", name: "רע\"ם", color: "#ae2953", votePct: 3.77, seats: 5, memberPartySlugs: ["raam"] },
  { slug: "hadash-taal-25", knesset: 25, letter: "ום", name: "חד\"ש-תע\"ל", color: "#36ae29", votePct: 3.76, seats: 5, memberPartySlugs: ["hadash-taal"] },
  { slug: "labor-25", knesset: 25, letter: "אמת", name: "העבודה", color: "#2970ae", votePct: 3.69, seats: 4, memberPartySlugs: ["labor"] },
];

export function getTicketsByKnesset(knesset: number): Ticket[] {
  return tickets.filter((t) => t.knesset === knesset);
}

export function getTicketsForParty(partySlug: string): Ticket[] {
  return tickets.filter((t) => t.memberPartySlugs.includes(partySlug));
}
