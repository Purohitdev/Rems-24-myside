
// import {
//   AreaChart,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   Area,
  
// } from "recharts";

// interface DataPoint {
//   time: string;
//   value: number;
// }

// interface GenerationChartProps {
//   title?: string;
//   totalGenerated: string;
//   generatedTill: string;
//   pr: string;
//   ghi: string;
//   data: DataPoint[];
// }

// export default function GenerationChart({
//   title = "Generation Today",
//   totalGenerated,
//   generatedTill,
//   pr,
//   ghi,
//   data,
// }: GenerationChartProps) {
//   const maxValue = Math.max(...data.map((d) => d.value));

//   return (
//     <div className="w-full bg-white rounded-2xl shadow p-4">
//       <div className="flex justify-between items-start mb-4">
//         <div className="flex gap-4">
//           <div className="flex items-center gap-2">
//             <span className="w-2 h-2 rounded-full bg-green-600" />
//             <p className="font-bold text-sm text-black">{title}</p>
//           </div>
//           <div className="flex items-center gap-2">
//             <span className="w-2 h-2 rounded-full border" />
//             <p className="font-medium text-sm text-black">Generation now</p>
//           </div>
//         </div>

//         <div className="text-left rounded-xl p-4 w-full md:w-fit">
//           <p className="text-xl font-semibold">{totalGenerated}</p>
//           <p className="text-[#777777] mb-2 font-normal ">
//             Generated till {generatedTill}
//           </p>

//           <hr className="my-2 border-gray-300" />

//           <p className="text-xs flex justify-between">
//             <span>PR:</span>
//             <span className="text-red-500 font-semibold">{pr}</span>
//           </p>

//           <p className="text-xs flex justify-between">
//             <span>GHI:</span>
//             <span className="font-semibold text-black">{ghi}</span>
//           </p>
//         </div>
//       </div>

//       <ResponsiveContainer width="100%" height={300}>
//         <AreaChart data={data}>
//           <defs>
//             <linearGradient id="genColor" x1="0" y1="0" x2="0" y2="1">
//               <stop offset="0%" stopColor="#16a34a" stopOpacity={0.4} />
//               <stop offset="100%" stopColor="#16a34a" stopOpacity={0.05} />
//             </linearGradient>
//           </defs>

//           <XAxis dataKey="time" tick={{ fontSize: 12 }} />
//           <YAxis tick={{ fontSize: 12 }} />
//           <Tooltip
//             formatter={(value) => [`${value} kW`, "Generation"]}
//             labelStyle={{ fontSize: 12, color: "#000" }}
//           />
//           <Area
//             type="monotone"
//             dataKey="value"
//             stroke="#16a34a"
//             fill="url(#genColor)"
//             strokeWidth={2}
//             dot={(props) =>
//               props.payload.value === maxValue ? (
//                 <circle
//                   cx={props.cx}
//                   cy={props.cy}
//                   r={5}
//                   fill="#16a34a"
//                   stroke="#fff"
//                   strokeWidth={2}
//                 />
//               ) : null
//             }
//             activeDot={false} 
//           />
//         </AreaChart>
//       </ResponsiveContainer>
//     </div>
//   );
// }


import {
  AreaChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Area,
} from "recharts";

interface DataPoint {
  time: string;
  value: number;
}

interface GenerationChartProps {
  title?: string;
  totalGenerated: string;
  generatedTill: string;
  pr: string;
  ghi: string;
  data: DataPoint[];
}

export default function GenerationChart({
  title = "Generation Today",
  totalGenerated,
  generatedTill,
  pr,
  ghi,
  data,
}: GenerationChartProps) {
  const maxValue = Math.max(...data.map((d) => d.value));

  const MaxDot = (props: any) => {
    const { cx, cy, payload } = props;
    if (payload?.value !== maxValue) return null;
    return (
      <circle
        cx={cx}
        cy={cy}
        r={5}
        fill="#16a34a"
        stroke="#fff"
        strokeWidth={2}
      />
    );
  };

  return (
    <div className="w-full bg-white rounded-2xl shadow p-4">
      <div className="flex justify-between items-start mb-4">
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-600" />
            <p className="font-bold text-sm text-black">{title}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full border" />
            <p className="font-medium text-sm text-black">Generation now</p>
          </div>
        </div>

        <div className="text-left rounded-xl p-4 w-full md:w-fit">
          <p className="text-xl font-semibold">{totalGenerated}</p>
          <p className="text-[#777777] mb-2 font-normal ">
            Generated till {generatedTill}
          </p>

          <hr className="my-2 border-gray-300" />

          <p className="text-xs flex justify-between">
            <span>PR:</span>
            <span className="text-red-500 font-semibold">{pr}</span>
          </p>

          <p className="text-xs flex justify-between">
            <span>GHI:</span>
            <span className="font-semibold text-black">{ghi}</span>
          </p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="genColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#16a34a" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#16a34a" stopOpacity={0.05} />
            </linearGradient>
          </defs>

          <XAxis dataKey="time" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip
            formatter={(value) => [`${value} kW`, "Generation"]}
            labelStyle={{ fontSize: 12, color: "#000" }}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#16a34a"
            fill="url(#genColor)"
            strokeWidth={2}
            dot={<MaxDot />}
            activeDot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
