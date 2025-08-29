"use client";

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface LineConfig {
  key: string;
  name: string;
  color: string;
  type?: "linear" | "monotone" | "step" | "basis" | "natural"; 
}

interface Props {
  title: string;
  yLabel: string;
  data: any[];
  lines: LineConfig[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="bg-black text-white p-3 rounded-2xl shadow-md"
        style={{ minWidth: "120px" }}
      >
        <p className="text-sm mb-1">{label}</p>
        {payload.map((item: any, idx: number) => (
          <p key={idx} className="text-sm flex justify-between">
            <span>{item.name}:</span>
            <span className="font-semibold">{item.value}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const CustomLegend = (props: any) => {
  const { payload } = props;
  return (
    <div className="flex flex-col items-end gap-1 mb-3">
      {payload.map((entry: any, index: number) => (
        <div
          key={`item-${index}`}
          className="flex items-center text-black text-sm font-normal"
        >
          <span
            className="w-2 h-2 rounded-full mr-2"
            style={{ backgroundColor: entry.color }}
          ></span>
          {entry.value}
        </div>
      ))}
    </div>
  );
};

const LineChartComponent: React.FC<Props> = ({ title, yLabel, data, lines }) => {
  return (
    <div className="bg-white shadow rounded-2xl p-6 w-full">
      <h2 className="text-[20px] font-medium text-green-700 mb-8">{title}</h2>
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={data}>
          <CartesianGrid stroke="#E0E0E0" strokeOpacity={0.3} />
          <XAxis dataKey="time" />
          <YAxis
            label={{ value: yLabel, angle: -90, position: "insideLeft" }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            content={<CustomLegend />}
            layout="vertical"
            verticalAlign="top"
            align="right"
          />
          {lines.map((line, idx) => (
            <Line
              key={idx}
              dataKey={line.key}
              stroke={line.color}
              name={line.name}
              strokeWidth={2}
              dot={false}
              type={line.type || "linear"} 
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartComponent;
