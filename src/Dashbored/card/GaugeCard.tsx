import React from "react";
import {
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
} from "recharts";

interface GaugeCardProps {
  id: string;
  min: number;
  max: number;
  avg: number;
  current: number;
  change: number;
}

const GaugeCard: React.FC<GaugeCardProps> = ({
  id,
  min,
  max,
  avg,
  current,
  change,
}) => {
  const percent = ((current - min) / (max - min)) * 100;

  let color = "#2ECC71"; // green
  if (percent > 70) color = "#E74C3C"; // red
  else if (percent > 40) color = "#F1C40F"; // yellow

  const data = [{ name: "value", value: percent, fill: color }];

  return (
    <div className="bg-white rounded-xl shadow-md p-4 ">
      <div className="flex justify-between items-center pb-2 mb-2">
        <h2 className="font-medium text-xl">{id}</h2>
        <span
          className={`font-bold ${change > 0
              ? "text-[#006A02]"
              : change < 0
                ? "text-red-600"
                : "text-gray-500"
            }`}
        >
          {change > 0 ? `+ ${change}` : change}
        </span>
      </div>

      <hr className="border-t border-gray-300" />

      <div className="flex justify-between items-center">
        <div className="text-sm text-black space-y-3 mt-4">
          <div>
            <p className="font-medium">{min}</p>
            <p className="text-sm font-normal  text-gray-500">Minimum</p>
          </div>
          <hr className="border-t border-gray-300" />

          <div>
            <p className="font-medium">{max}</p>
            <p className="text-sm text-gray-500">Maximum</p>
          </div>
          <hr className="border-t border-gray-300" />

          <div>
            <p className="font-medium">{avg}</p>
            <p className="text-sm text-gray-500">Average</p>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <RadialBarChart
            width={180}
            height={120}
            cx="50%"
            cy="100%"
            innerRadius="80%"
            outerRadius="100%"
            startAngle={180}
            endAngle={0}
            data={data}
          >
            <PolarAngleAxis
              type="number"
              domain={[0, 100]}
              tick={false}
              axisLine={false}
            />
            <RadialBar
              background
              // clockWise.    givibf error
              dataKey="value"
              cornerRadius={10}
            />
          </RadialBarChart>

          <p className="text-xl font-bold text-green-700">{current} C</p>
        </div>
      </div>
    </div>
  );
};

export default GaugeCard;
