// Election metadata (turnout). Seats/votes per list live in tickets.ts —
// see getTicketsByKnesset().
import type { ElectionResult } from "./types";

export const elections: ElectionResult[] = [
  { year: 2020, knesset: 23, turnoutPercent: 60.0 }, // placeholder
  { year: 2021, knesset: 24, turnoutPercent: 62.5 }, // placeholder
  { year: 2022, knesset: 25, turnoutPercent: 70.63 }, // real
];
