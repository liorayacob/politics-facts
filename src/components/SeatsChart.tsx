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
import type { ElectionResult } from "@/data/types";
import { parties, getPartyBySlug } from "@/data/parties";
import PartyLegend from "./PartyLegend";

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

  const rows = payload
    .filter((entry) => typeof entry.value === "number" && entry.value > 0)
    .sort((a, b) => (b.value as number) - (a.value as number));

  if (rows.length === 0) return null;

  return (
    <div className="chart-tooltip">
      <strong>{label}</strong>
      {rows.map((entry) => {
        const party = getPartyBySlug(String(entry.dataKey));
        return (
          <div key={String(entry.dataKey)} className="chart-tooltip-row">
            <span className="party-dot" style={{ background: party?.color ?? "#999" }} />
            {party?.name ?? entry.dataKey}: {entry.value}
          </div>
        );
      })}
    </div>
  );
}

export default function SeatsChart({ elections }: { elections: ElectionResult[] }) {
  const data = elections.map((election) => ({
    name: `כנסת ${election.knesset}`,
    ...election.seatsByParty,
  }));

  const partiesInChart = parties.filter((party) =>
    elections.some((election) => (election.seatsByParty[party.slug] ?? 0) > 0)
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
            {partiesInChart.map((party) => (
              <Bar key={party.slug} dataKey={party.slug} name={party.name} stackId="seats" fill={party.color} />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
      <PartyLegend title="מקרא" parties={partiesInChart} />
    </div>
  );
}
