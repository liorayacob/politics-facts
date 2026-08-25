"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import type { ElectionResult } from "@/data/types";
import { parties } from "@/data/parties";

export default function SeatsChart({ elections }: { elections: ElectionResult[] }) {
  const data = elections.map((election) => ({
    name: `כנסת ${election.knesset}`,
    ...election.seatsByParty,
  }));

  return (
    <div className="chart-wrap">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e6ddc7" />
          <XAxis dataKey="name" stroke="#7c7261" tick={{ fill: "#7c7261" }} />
          <YAxis stroke="#7c7261" tick={{ fill: "#7c7261" }} />
          <Tooltip
            contentStyle={{ background: "#241f16", border: "1px solid #241f16", borderRadius: 8 }}
            labelStyle={{ color: "#faf6ee" }}
            itemStyle={{ color: "#faf6ee" }}
          />
          <Legend wrapperStyle={{ color: "#241f16" }} />
          {parties.map((party) => (
            <Bar key={party.slug} dataKey={party.slug} name={party.name} fill={party.color} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
