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

  const colors = ["#2563eb", "#f59e0b", "#10b981", "#ef4444", "#8b5cf6"];

  return (
    <div className="chart-wrap">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          {parties.map((party, i) => (
            <Bar key={party.slug} dataKey={party.slug} name={party.name} fill={colors[i % colors.length]} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
