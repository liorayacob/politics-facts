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
          <CartesianGrid strokeDasharray="3 3" stroke="#2c2f42" />
          <XAxis dataKey="name" stroke="#9994ab" tick={{ fill: "#9994ab" }} />
          <YAxis stroke="#9994ab" tick={{ fill: "#9994ab" }} />
          <Tooltip
            contentStyle={{ background: "#1c1e2e", border: "1px solid #2c2f42", borderRadius: 8 }}
            labelStyle={{ color: "#f3ede2" }}
            itemStyle={{ color: "#f3ede2" }}
          />
          <Legend wrapperStyle={{ color: "#f3ede2" }} />
          {parties.map((party) => (
            <Bar key={party.slug} dataKey={party.slug} name={party.name} fill={party.color} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
