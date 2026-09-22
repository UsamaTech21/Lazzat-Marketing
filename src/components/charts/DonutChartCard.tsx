"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip, Legend } from "recharts";

type Row = { name: string; value: number };

type Props = {
  title: string;
  data: Row[];
  height?: number;
  colors?: string[];
};

const DEFAULT_COLORS = ["#1d4ed8", "#0ea5e9", "#334155", "#64748b", "#94a3b8", "#cbd5e1"];

export function DonutChartCard({
  title,
  data,
  height = 240,
  colors = DEFAULT_COLORS,
}: Props) {
  return (
    <div className="chart-card">
      <h3>{title}</h3>
      <div style={{ width: "100%", height }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius="55%"
              outerRadius="78%"
              paddingAngle={2}
              stroke="#fff"
              strokeWidth={2}
            >
              {data.map((_, i) => (
                <Cell key={i} fill={colors[i % colors.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                borderRadius: 10,
                border: "1px solid #e2e8f0",
                fontSize: 13,
              }}
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              wrapperStyle={{ fontSize: 12, color: "#475569" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
