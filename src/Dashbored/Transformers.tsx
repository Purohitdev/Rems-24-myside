import { useState, useEffect } from "react";
import NavTabs from "../Navtabs";
import TopBar from "./TopBar";
import GaugeCard from "./card/GaugeCard";
import GraphWithFilter from "./Charts/GraphWithFilter";

import { RadialBarChart, RadialBar, PolarAngleAxis } from "recharts";
import DataTable from "./Table/DataTable";

interface LiveData {
  id: string;
  min: number;
  max: number;
  avg: number;
  current: number;
  change: number;
}

interface Column {
  key: string;
  label: string;
}

const Transformers = () => {
  const [activeTab, setActiveTab] = useState<string>("Live");
  const [currentTime, setCurrentTime] = useState<string>("");
  const [activeLogTab, setActiveLogTab] = useState<string>("WTI-HV-1");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const day = now.getDate();
      const month = now.toLocaleString("default", { month: "long" });
      const year = now.getFullYear();
      let hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12;
      setCurrentTime(`${day} ${month} ${year}, ${hours}:${minutes} ${ampm}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const liveData: LiveData[] = [
    { id: "WTI-HV1-TRANS", min: 28.0, max: 46.4, avg: 34.729, current: 35.3, change: +0.4 },
    { id: "WTI-HV2-TRANS", min: 27.0, max: 36.4, avg: 35, current: 38.2, change: -0.2 },
    { id: "WTI-HV3-TRANS", min: 28.0, max: 46.4, avg: 34.729, current: 36.3, change: +1.2 },
    { id: "WTI-HV4-TRANS", min: 28.0, max: 46.4, avg: 34.729, current: 35.3, change: +0.4 },
    { id: "WTI-HV5-TRANS", min: 27.0, max: 36.4, avg: 35, current: 38.2, change: -0.2 },
    { id: "WTI-HV6-TRANS", min: 28.0, max: 46.4, avg: 34.729, current: 36.3, change: +1.2 },
  ];


  const sampleData1 = [
    { time: "17:01", value: 0.35, max: 1, min: 0.25, avg: 0.7 },
    { time: "17:02", value: 0.28, max: 1, min: 0.25, avg: 0.7 },
    { time: "17:03", value: 0.52, max: 1, min: 0.25, avg: 0.7 },
    { time: "17:04", value: 0.38, max: 1, min: 0.25, avg: 0.7 },
    { time: "17:05", value: 0.67, max: 1, min: 0.25, avg: 0.7 },
    { time: "17:06", value: 0.89, max: 1, min: 0.25, avg: 0.7 },
    { time: "17:07", value: 1.05, max: 1, min: 0.25, avg: 0.7 },
    { time: "17:08", value: 0.92, max: 1, min: 0.25, avg: 0.7 },
    { time: "17:09", value: 0.81, max: 1, min: 0.25, avg: 0.7 },
    { time: "17:10", value: 0.66, max: 1, min: 0.25, avg: 0.7 },
    { time: "17:11", value: 0.55, max: 1, min: 0.25, avg: 0.7 },
    { time: "17:12", value: 0.42, max: 1, min: 0.25, avg: 0.7 },
    { time: "17:13", value: 0.33, max: 1, min: 0.25, avg: 0.7 },
    { time: "17:14", value: 0.27, max: 1, min: 0.25, avg: 0.7 },
    { time: "17:15", value: 0.22, max: 1, min: 0.25, avg: 0.7 },
    { time: "17:16", value: 0.19, max: 1, min: 0.25, avg: 0.7 },
    { time: "17:17", value: 0.16, max: 1, min: 0.25, avg: 0.7 },
    { time: "17:18", value: 0.14, max: 1, min: 0.25, avg: 0.7 },
    { time: "17:19", value: 0.12, max: 1, min: 0.25, avg: 0.7 },
    { time: "17:20", value: 0.11, max: 1, min: 0.25, avg: 0.7 },

  ];

  const sampleData2 = [
    { time: "17:01", value: 0.42 },
    { time: "17:02", value: 0.58 },
    { time: "17:03", value: 0.74 },
    { time: "17:04", value: 0.61 },
  ];

  const sampleData3 = [
    { time: "17:01", value: 0.21 },
    { time: "17:02", value: 0.32 },
    { time: "17:03", value: 0.48 },
    { time: "17:04", value: 0.39 },
  ];

  const plantColumns: Column[] = [
    { key: "serial", label: "Serial No." },
    { key: "date", label: "Date" },
    { key: "wti", label: "WTI Value" },
    { key: "avg", label: "Average Value" },
    { key: "min", label: "Minimum Value" },
    { key: "max", label: "Maximum Value" },
  ];

  const plantData1 = [
    { serial: 1, date: "18-02-2025", wti: 45, avg: 44, min: 40, max: 56 },
    { serial: 2, date: "19-02-2025", wti: 46, avg: 45, min: 42, max: 55 },
    { serial: 3, date: "20-02-2025", wti: 42, avg: 43, min: 39, max: 52 },
    { serial: 3, date: "20-02-2025", wti: 42, avg: 43, min: 39, max: 52 },
    { serial: 3, date: "20-02-2025", wti: 42, avg: 43, min: 39, max: 52 },

  ];

  const plantData2 = [
    { serial: 1, date: "18-02-2025", wti: 39, avg: 40, min: 36, max: 47 },
    { serial: 2, date: "19-02-2025", wti: 41, avg: 42, min: 37, max: 48 },
    { serial: 3, date: "20-02-2025", wti: 38, avg: 39, min: 35, max: 46 },
    { serial: 3, date: "20-02-2025", wti: 38, avg: 39, min: 35, max: 46 },

  ];

  const plantData3 = [
    { serial: 1, date: "18-02-2025", wti: 30, avg: 31, min: 28, max: 35 },
    { serial: 2, date: "19-02-2025", wti: 32, avg: 33, min: 29, max: 36 },
    { serial: 3, date: "20-02-2025", wti: 34, avg: 32, min: 30, max: 37 },
  ];

  const logTabs = ["WTI-HV-1", "WTI-LV-1", "OTI-1", "WTI-HV-2", "WTI-LV-2", "OTI-2"];

  const renderLogContent = (title: string, value: number, min: number, max: number, avg: number, change: number, data: any[], tableData: any[]) => (
    <div className="py-8 flex justify-between flex-wrap ">

      <div className="flex-1 bg-white shadow rounded-2xl p-6 max-w-[29%] flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-medium">{title}</h2>
            <span className="text-[#006A02] font-normal text-sm">
              {change > 0 ? `+${change}` : change}
            </span>
          </div>
          <hr className="border-gray-300 my-3" />

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-[#777777]">Minimum Temp:</span>
              <span className="font-semibold">{min}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#777777]">Maximum Temp:</span>
              <span className="font-semibold">{max}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#777777]">Average Temp:</span>
              <span className="font-semibold">{avg}</span>
            </div>
          </div>

          <div className="flex flex-col items-center my-6">
            <div className="relative w-[180px] h-[120px]">
              <RadialBarChart
                width={180}
                height={120}
                cx="50%"
                cy="100%"
                innerRadius="80%"
                outerRadius="100%"
                startAngle={180}
                endAngle={0}
                data={[
                  {
                    name: "temperature",
                    value: ((value - min) / (max - min)) * 100,
                    fill: "#f97316",
                  },
                ]}
              >
                <PolarAngleAxis type="number" domain={[0, 100]} tick={false} axisLine={false} />
                <RadialBar background  dataKey="value" cornerRadius={10} />
              </RadialBarChart>
            </div>
            <p className="text-[#006A02] font-bold text-xl mt-2">{value} °C</p>
          </div>
        </div>

        <div className="space-y-2 text-sm mt-4">
          <div className="flex justify-between">
            <span className="text-[#006A02] font-semibold">22-08-2025</span>
            <span className="text-[#777777]">Minimum Date</span>
          </div>
          <hr className="border-gray-300" />
          <div className="flex justify-between">
            <span className="text-[#006A02] font-semibold">24-08-2025</span>
            <span className="text-[#777777]">Maximum Date</span>
          </div>
        </div>
      </div>

      <div className="w-[70%]">
        <GraphWithFilter data={data} mainLabel={title} />
      </div>

      <div className="w-[100%] mt-3">
        <DataTable
          columns={plantColumns}
          data={tableData}
          headerBg="#2E7D32"
          borderColor="#2E7D32"
          shadow={true}
          rowsPerPage={4}
        />
      </div>
    </div>
  );

  return (
    <div>
      <TopBar title="Transformers" />
      <div className="py-6 space-y-4">
        <div className="flex justify-between items-center">
          <NavTabs tabs={["Live", "Logs", "Miscellaneous"]} defaultTab="Live" onChange={setActiveTab} />
          <p className="font-medium text-[#006A02]">{currentTime}</p>
        </div>

        <div>
          {activeTab === "Live" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {liveData.map((item) => (
                <GaugeCard key={item.id} {...item} />
              ))}
            </div>
          )}

          {activeTab === "Logs" && (
            <div>
              <div className="flex gap-10 border-b border-gray-200  px-3">
                {logTabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveLogTab(tab)}
                    className={`pb-2 font-medium ${activeLogTab === tab ? "text-[#006A02] border-b-2 border-[#006A02]" : "text-gray-500 hover:text-gray-700"
                      }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div>
                {activeLogTab === "WTI-HV-1" && renderLogContent("WTI-HV1-TRANS.", 35.3, 28.0, 46.4, 34.7, 0.4, sampleData1, plantData1)}
                {activeLogTab === "WTI-LV-1" && renderLogContent("WTI-LV1-TRANS.", 38.2, 27.0, 36.4, 35.0, -0.2, sampleData2, plantData2)}
                {activeLogTab === "OTI-1" && renderLogContent("OTI-1-TRANS.", 32.5, 25.0, 42.0, 33.0, +0.6, sampleData3, plantData3)}
                {activeLogTab === "WTI-HV-2" && renderLogContent("WTI-HV2-TRANS.", 36.3, 28.0, 46.4, 34.7, +1.2, sampleData1, plantData1)}
                {activeLogTab === "WTI-LV-2" && renderLogContent("WTI-LV2-TRANS.", 31.4, 26.0, 40.0, 32.0, -0.5, sampleData2, plantData2)}
                {activeLogTab === "OTI-2" && renderLogContent("OTI-2-TRANS.", 33.8, 27.0, 44.0, 34.0, +0.3, sampleData3, plantData3)}
              </div>
            </div>
          )}

          {activeTab === "Miscellaneous" && <p>Miscellaneous</p>}
        </div>
      </div>
    </div>
  );
};

export default Transformers;
