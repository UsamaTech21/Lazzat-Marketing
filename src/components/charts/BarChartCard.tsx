"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Row = { name: string; value: number };

type Props = {
  title: string;
  data: Row[];
  color?: string;
  height?: number;
  layout?: "vertical" | "horizontal";
};

export function BarChartCard({
  title,
  data,
  color = "#1d4ed8",
  height = 240,
  layout = "horizontal",
}: Props) {
  const isVertical = layout === "vertical";

  return (
    <div className="chart-card">
      <h3>{title}</h3>
      <div style={{ width: "100%", height }}>
        <ResponsiveContainer>
          <BarChart
            data={data}
            layout={isVertical ? "vertical" : "horizontal"}
            margin={{ top: 4, right: 8, left: isVertical ? 8 : 0, bottom: 4 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={!isVertical} />
            {isVertical ? (
              <>
                <XAxis type="number" tick={{ fontSize: 12, fill: "#64748b" }} />
                <YAxis
                  type="category"
                  dataKey="name"
                  width={88}
                  tick={{ fontSize: 12, fill: "#475569" }}
                />
              </>
            ) : (
              <>
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#64748b" }} interval={0} />
                <YAxis tick={{ fontSize: 12, fill: "#64748b" }} width={40} />
              </>
            )}
            <Tooltip
              contentStyle={{
                borderRadius: 10,
                border: "1px solid #e2e8f0",
                fontSize: 13,
              }}
            />
            <Bar
              dataKey="value"
              fill={color}
              radius={isVertical ? [0, 6, 6, 0] : [6, 6, 0, 0]}
              maxBarSize={48}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
