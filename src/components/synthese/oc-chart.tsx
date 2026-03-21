"use client";

import {
  ComposedChart, Bar, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend, ReferenceLine,
  ResponsiveContainer, Cell,
} from "recharts";
import { useTheme } from "next-themes";
import type { Rapport } from "@/data/rapports";

interface Props {
  rapports: Rapport[];
  highlightId?: number;
}

export function OcChart({ rapports, highlightId }: Props) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const data = rapports.map((r) => ({
    name: `T${r.id}`,
    temp: r.profil.tempMax,
    freq: r.profil.frequenceGhz,
    stable: r.profil.stable,
    bsod: r.profil.bsod,
    id: r.id,
  }));

  const gridColor  = isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.05)";
  const textColor  = isDark ? "#525e7a" : "#8892a4";
  const tooltipBg  = isDark ? "#0c0e1a" : "#ffffff";
  const tooltipBdr = isDark ? "#1a1e30" : "#e5e7eb";

  const barColor = (entry: typeof data[0]) => {
    if (entry.bsod) return isDark ? "#ff4466" : "#ef4444";
    if (entry.id === (highlightId ?? 6)) return isDark ? "#00e5a0" : "#10b981";
    if (entry.temp !== null && entry.temp > 90) return isDark ? "#f59e0b" : "#d97706";
    return isDark ? "#00c8ff" : "#0284c7";
  };

  return (
    <ResponsiveContainer width="100%" height={260}>
      <ComposedChart data={data} margin={{ top: 8, right: 12, left: -8, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
        <XAxis
          dataKey="name"
          tick={{ fontSize: 11, fill: textColor, fontFamily: "var(--font-jetbrains)" }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          yAxisId="temp"
          orientation="left"
          domain={[0, 110]}
          tick={{ fontSize: 10, fill: textColor, fontFamily: "var(--font-jetbrains)" }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => `${v}°`}
        />
        <YAxis
          yAxisId="freq"
          orientation="right"
          domain={[3.5, 4.5]}
          tick={{ fontSize: 10, fill: textColor, fontFamily: "var(--font-jetbrains)" }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => `${v}G`}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: tooltipBg,
            border: `1px solid ${tooltipBdr}`,
            borderRadius: "10px",
            fontSize: "12px",
            fontFamily: "var(--font-jetbrains)",
            boxShadow: isDark ? "0 8px 32px rgba(0,0,0,0.4)" : "0 4px 16px rgba(0,0,0,0.1)",
          }}
          labelStyle={{ fontWeight: 600, marginBottom: 4, color: isDark ? "#f0f4ff" : "#0d1020" }}
          formatter={(value, name) => {
            if (name === "Température") return [`${value} °C`, name];
            if (name === "Fréquence") return [`${value} GHz`, name];
            return [value, name];
          }}
          cursor={{ fill: isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)" }}
        />
        <Legend
          wrapperStyle={{ fontSize: 11, paddingTop: 12, fontFamily: "var(--font-jetbrains)" }}
          iconType="circle"
          iconSize={7}
        />
        <ReferenceLine
          yAxisId="temp"
          y={90}
          stroke={isDark ? "#ff4466" : "#ef4444"}
          strokeDasharray="4 4"
          opacity={0.5}
          label={{
            value: "90°C",
            fill: isDark ? "#ff4466" : "#ef4444",
            fontSize: 10,
            position: "insideTopRight",
            fontFamily: "var(--font-jetbrains)",
          }}
        />
        <Bar yAxisId="temp" dataKey="temp" name="Température" radius={[4, 4, 0, 0]} maxBarSize={40}>
          {data.map((entry) => (
            <Cell
              key={entry.id}
              fill={barColor(entry)}
              opacity={entry.temp === null ? 0.15 : 0.85}
            />
          ))}
        </Bar>
        <Line
          yAxisId="freq"
          type="monotone"
          dataKey="freq"
          name="Fréquence"
          stroke={isDark ? "#00c8ff" : "#0284c7"}
          strokeWidth={2}
          dot={{ r: 3.5, fill: isDark ? "#00c8ff" : "#0284c7", strokeWidth: 0 }}
          activeDot={{ r: 5, strokeWidth: 0 }}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
