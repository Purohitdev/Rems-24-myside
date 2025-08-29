import ReactECharts from "echarts-for-react";

type BinLabel = "0-1" | "1-2" | "2-3" | "3-4" | "4-5" | "5-6" | "6-7" | "7+";

type WindRoseDatum = {
  direction: string;               
  values: Partial<Record<BinLabel, number>>;
};

interface WindRoseProps {
  data: WindRoseDatum[];
  unit?: string;                    
  height?: number;                
}

const COLORS: Record<BinLabel, string> = {
  "0-1": "#7B3F97", // purple
  "1-2": "#1F66B1", // deep blue
  "2-3": "#1FA3FF", // light blue
  "3-4": "#1CCAD8", // cyan/teal
  "4-5": "#31C76A", // green
  "5-6": "#A0D911", // lime
  "6-7": "#F4D03F", // yellow/orange
  "7+":  "#E67E22", // orange
};

const BIN_ORDER: BinLabel[] = ["0-1","1-2","2-3","3-4","4-5","5-6","6-7","7+"];

export default function WindRose({ data, unit = "", height = 360 }: WindRoseProps) {
  const directions = data.map(d => d.direction);

  const maxRadius = Math.max(
    0,
    ...data.map(d =>
      BIN_ORDER.reduce((sum, b) => sum + (d.values[b] ?? 0), 0)
    )
  );

  const startAngle = 90 - 360 / (directions.length * 2);

  const option = {
    tooltip: {
      trigger: "item",
      formatter: (p: any) => {
        const dir = p.name;
        const bin = p.seriesName;
        const val = p.value;
        return `${dir}<br/>${bin}: <b>${val}</b>`;
      }
    },
    legend: {
      orient: "vertical",
      right: 10,
      top: "middle",
      textStyle: { fontSize: 12 },
      itemWidth: 18,
      itemHeight: 12,
      data: BIN_ORDER,
      z: 20 
    },
    angleAxis: {
      type: "category",
      data: directions,
      startAngle,          
      clockwise: false,   
      axisLabel: { fontWeight: "bold" },
      axisTick: { show: false },
      axisLine: { lineStyle: { color: "#333" } },
      z: 10                
    },
    radiusAxis: {
      type: "value",
      min: 0,
      max: maxRadius,
      axisLabel: {
        formatter: (v: number) => {
          if (!unit) return v;
          if (unit === "k") return `${(v / 1000).toFixed(1)}k`;
          return `${v}${unit}`;
        }
      },
      splitLine: { lineStyle: { type: "dashed", color: "#bbb" } },
      axisLine: { show: false },
      axisTick: { show: false },
      z: 10               
    },
    polar: {
      center: ["50%", "50%"],
      radius: "78%"
    },
    graphic: [{
      type: "circle",
      left: "center",
      top: "center",
      shape: { r: 28 },
      style: { fill: "#ffffff" }
    }],
    series: BIN_ORDER.map((bin) => ({
      name: bin,
      type: "bar",
      coordinateSystem: "polar",
      stack: "wind",
      roundCap: false,
      barCategoryGap: "0%",
      itemStyle: { color: COLORS[bin] },
      data: data.map(d => d.values[bin] ?? 0),
      z: 1 
    }))
  };

  return (
    <div className="w-full">
      <ReactECharts option={option} style={{ height }} notMerge lazyUpdate />
    </div>
  );
}
