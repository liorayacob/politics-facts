"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import type { ElectionResult, Ticket } from "@/data/types";
import { getTicketsByKnesset } from "@/data/tickets";
import PartyLegend from "./PartyLegend";

// A ticket running alone is charted under its own party's slug so the same
// party lines up as one consistent, same-colored series across elections.
// A joint ticket (multiple member parties) gets its own series keyed by the
// ticket slug, since it's a genuinely different electoral entity.
function seriesKeyFor(ticket: Ticket): string {
  return ticket.memberPartySlugs.length === 1 ? ticket.memberPartySlugs[0] : ticket.slug;
}

function ChartTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: { name?: string; value?: number | string; color?: string }[];
}) {
  if (!active || !payload?.length) return null;

  const entry = payload[0];
  if (typeof entry.value !== "number") return null;

  return (
    <div className="chart-tooltip">
      <div className="chart-tooltip-row">
        <span className="party-dot" style={{ background: entry.color ?? "#999" }} />
        {entry.name}: {entry.value}
      </div>
    </div>
  );
}

export default function SeatsChart({ elections }: { elections: ElectionResult[] }) {
  const ticketsByElection = elections.map((election) => ({
    election,
    tickets: getTicketsByKnesset(election.knesset),
  }));

  const data = ticketsByElection.map(({ election, tickets }) => {
    const row: Record<string, number | string> = { name: `כנסת ${election.knesset}` };
    tickets.forEach((ticket) => {
      row[seriesKeyFor(ticket)] = ticket.seats;
    });
    return row;
  });

  const seriesMap = new Map<string, { name: string; color: string }>();
  ticketsByElection.forEach(({ tickets }) => {
    tickets.forEach((ticket) => {
      const key = seriesKeyFor(ticket);
      if (!seriesMap.has(key)) {
        seriesMap.set(key, { name: ticket.name, color: ticket.color });
      }
    });
  });
  const series = Array.from(seriesMap.entries()).map(([slug, v]) => ({ slug, ...v }));

  // Two series can share a name+color (e.g. "הציונות הדתית" ran alone in
  // knesset 23–24, then joint in 25) — the legend should show it once.
  const legendSeries = Array.from(
    new Map(series.map((s) => [s.name, s])).values()
  );

  return (
    <div>
      <div className="chart-wrap">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 8 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e6ddc7" vertical={false} />
            <XAxis dataKey="name" stroke="#7c7261" tick={{ fill: "#7c7261" }} />
            <YAxis stroke="#7c7261" tick={{ fill: "#7c7261" }} />
            <Tooltip content={<ChartTooltip />} cursor={{ fill: "rgba(184, 121, 26, 0.08)" }} shared={false} />
            {series.map((s) => (
              <Bar key={s.slug} dataKey={s.slug} name={s.name} fill={s.color} />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
      <PartyLegend title="מקרא" parties={legendSeries} />
    </div>
  );
}
