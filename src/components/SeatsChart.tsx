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
import { getPartyBySlug } from "@/data/parties";
import { getTicketsByKnesset } from "@/data/tickets";
import PartyLegend from "./PartyLegend";

// A ticket running alone is charted under its own party's slug so the same
// party lines up as one consistent, same-colored series across elections.
// A joint ticket (multiple member parties) gets its own series keyed by the
// ticket slug, since it's a genuinely different electoral entity.
function seriesKeyFor(ticket: Ticket): string {
  return ticket.memberPartySlugs.length === 1 ? ticket.memberPartySlugs[0] : ticket.slug;
}

function findTicket(knesset: number, seriesKey: string): Ticket | undefined {
  return getTicketsByKnesset(knesset).find((t) => seriesKeyFor(t) === seriesKey);
}

function ChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { dataKey?: string | number; value?: number | string }[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;

  const knesset = Number(String(label).replace(/\D/g, ""));
  const rows = payload
    .filter((entry) => typeof entry.value === "number" && entry.value > 0)
    .sort((a, b) => (b.value as number) - (a.value as number));

  if (rows.length === 0) return null;

  return (
    <div className="chart-tooltip">
      <strong>{label}</strong>
      {rows.map((entry) => {
        const seriesKey = String(entry.dataKey);
        const ticket = findTicket(knesset, seriesKey);
        const isJoint = (ticket?.memberPartySlugs.length ?? 0) > 1;
        return (
          <div key={seriesKey} className="chart-tooltip-row-group">
            <div className="chart-tooltip-row">
              <span className="party-dot" style={{ background: ticket?.color ?? "#999" }} />
              {ticket?.name ?? seriesKey}: {entry.value}
              {ticket && <span className="chart-tooltip-letter"> (אות {ticket.letter})</span>}
            </div>
            {isJoint && (
              <div className="chart-tooltip-sublist">
                רשימה משותפת:{" "}
                {ticket!.memberPartySlugs
                  .map((slug) => {
                    const party = getPartyBySlug(slug);
                    const seats = ticket!.seatsByMemberParty?.[slug];
                    return `${party?.name ?? slug}${seats ? ` (${seats})` : ""}`;
                  })
                  .join(", ")}
              </div>
            )}
          </div>
        );
      })}
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
            <Tooltip content={<ChartTooltip />} cursor={{ fill: "rgba(184, 121, 26, 0.08)" }} />
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
