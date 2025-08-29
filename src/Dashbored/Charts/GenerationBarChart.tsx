"use client";

import { useState, useMemo } from "react";
import NavTabs from "../../Navtabs"; 
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface InverterDataPoint {
  day: string;
  generation: number;
  expected: number;
}

interface GenerationAreaChartProps {
  title?: string;
  inverterTabs?: string[];
  defaultInverter?: string;
  inverterData: Record<string, InverterDataPoint[]>; 
}

const GenerationAreaChartComponent = ({
  title = "Inverters Power Generation",
  inverterTabs = ["Inv-01", "Inv-02", "Inv-03", "Inv-04"],
  defaultInverter = "Inv-01",
  inverterData,
}: GenerationAreaChartProps) => {
  const [activeInverter, setActiveInverter] = useState<string>(defaultInverter);

  const memoizedData = useMemo<InverterDataPoint[]>(
    () => inverterData[activeInverter] || [],
    [inverterData, activeInverter]
  );

  const achieved = useMemo<number>(
    () => memoizedData.reduce((sum, d) => sum + (d.generation ?? 0), 0),
    [memoizedData]
  );

  const expected = useMemo<number>(
    () => memoizedData.reduce((sum, d) => sum + (d.expected ?? 0), 0),
    [memoizedData]
  );

  return (
    <div className="bg-white shadow rounded-2xl p-6 w-full">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-xl font-semibold mt-2">{title}</h2>

        <div className="flex flex-col items-end space-y-2">
          <NavTabs
            tabs={inverterTabs}
            defaultTab={defaultInverter}
            onChange={setActiveInverter}
          />

          <div className="text-right mt-6">
            <p className="font-semibold text-black text-base">
              {achieved.toLocaleString()} kWh Power Generated
            </p>
            <p>
              Achieved:{" "}
              <span className="font-normal text-sm text-[#777777]">
                {achieved.toLocaleString()} kWh
              </span>{" "}
              | Expected:{" "}
              <span className="font-normal text-sm text-[#777777]">
                {expected.toLocaleString()} kWh
              </span>
            </p>
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={memoizedData}>
          <XAxis
            dataKey="day"
            tick={{ fill: "#6B7280" }}
            axisLine={{ stroke: "#E5E7EB" }}
            tickLine={{ stroke: "#E5E7EB" }}
          />
          <YAxis
            tick={{ fill: "#6B7280" }}
            axisLine={{ stroke: "#E5E7EB" }}
            tickLine={{ stroke: "#E5E7EB" }}
            domain={[0, "auto"]}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "black",
              borderRadius: "8px",
              color: "white",
            }}
            formatter={(value) => [`${value} kW`, "Generation"]}
          />

          <defs>
            <linearGradient id="colorGen" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#D6F7FF" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#D6F7FF" stopOpacity={0.1} />
            </linearGradient>
          </defs>

          <Area
            type="monotone"
            dataKey="generation"
            stroke="#38BDF8"
            strokeWidth={2}
            fill="url(#colorGen)"
            dot={{ r: 3, fill: "#38BDF8", stroke: "white", strokeWidth: 1 }}
            activeDot={{ r: 6, fill: "#38BDF8" }}
          />
        </AreaChart>
      </ResponsiveContainer>

      <p className="text-center text-sm mt-4 text-gray-500">
        {activeInverter} {title} (August)
      </p>
    </div>
  );
};

export default GenerationAreaChartComponent;
