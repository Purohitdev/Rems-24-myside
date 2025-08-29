import { useState, useEffect } from "react";
import NavTabs from "../Navtabs";
import TopBar from "./TopBar";
import InfoCard from "./card/InfoCard";
import DataTable from "./Table/DataTable";
import WindRose from "./Charts/WindRoseChart";
import DateRangePicker from "./Button/DateRangePicker"; // adjust path if needed

export default function WMS() {
  const [activeTab, setActiveTab] = useState("Live");

  // Live time & date
  const [currentTime, setCurrentTime] = useState("");

  // Date filters (default yesterday → today)
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();

      // ✅ Format time in 12-hour AM/PM
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })
      );

      // ✅ Default date range: yesterday → today
      const today = now.toISOString().split("T")[0];
      const yesterday = new Date(now);
      yesterday.setDate(yesterday.getDate() - 1);
      const yDate = yesterday.toISOString().split("T")[0];

      setFromDate(yDate);
      setToDate(today);
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // Weather Data
  const weatherData = [
    { title: "Solar Irradiance", value: "12.0", unit: "W/m²", change: -1, min: 28.0, max: 46.4, avg: 34.729 },
    { title: "Module Temperature", value: "23.0", unit: "°C", change: 0, min: 28.0, max: 46.4, avg: 34.729 },
    { title: "Ambient Temperature", value: "23.2", unit: "°C", change: 4, min: 28.0, max: 46.4, avg: 34.729 },
    { title: "Wind Direction", value: "N: 334°", change: -5, min: 0, max: 0, avg: 0 },
    { title: "Wind Speed", value: "8", unit: "Km/hr", change: -5, min: 8.0, max: 12.4, avg: 9.2 },
    { title: "Rain", value: "22.2", unit: "mm", change: 2, min: 20.0, max: 46.4, avg: 34.729 },
    { title: "Solar Isolation", value: "0.24", unit: "kWh/m²/day", change: -5, min: 0, max: 0, avg: 0 },
  ];

  // Transformer Data
  const transformerData = [
    { title: "WTI - HV-1 TRANS", value: "32.2", unit: "°C", change: -1, min: 23.2, max: 46.4, avg: 34.729 },
    { title: "WTI - LV-1 TRANS", value: "23.0", unit: "°C", change: 0, min: 23.2, max: 46.4, avg: 34.729 },
    { title: "OTI-1 TRANS", value: "23.2", unit: "°C", change: 4, min: 23.2, max: 46.4, avg: 34.729 },
    { title: "WTI - HV-2 TRANS", value: "32.2", unit: "°C", change: -5, min: 23.2, max: 36.3, avg: 34.67 },
    { title: "OTI-2 TRANS", value: "32.2", unit: "°C", change: 0, min: 23.2, max: 12.4, avg: 9.2 },
    { title: "WTI - LV-2 TRANS", value: "32.2", unit: "°C", change: 2, min: 23.2, max: 46.4, avg: 34.729 },
  ];

  const windColumns: Column[] = [
    { key: "serial", label: "Serial No." },
    { key: "dateTime", label: "Date & Time" },
    { key: "windSpeed", label: "Wind Speed" },
    { key: "windDirection", label: "Wind Direction" },
  ];

  const tableData = [
    { serial: 1, dateTime: "24-Aug-2025 , 00:05", windSpeed: 10, windDirection: "S : 160°" },
    { serial: 2, dateTime: "24-Aug-2025 , 00:05", windSpeed: 10, windDirection: "S : 160°" },
    { serial: 3, dateTime: "24-Aug-2025 , 00:05", windSpeed: 10, windDirection: "S : 160°" },
    { serial: 4, dateTime: "24-Aug-2025 , 00:05", windSpeed: 10, windDirection: "S : 160°" },
    { serial: 5, dateTime: "24-Aug-2025 , 00:05", windSpeed: 10, windDirection: "S : 160°" },
    { serial: 6, dateTime: "24-Aug-2025 , 00:05", windSpeed: 10, windDirection: "S : 160°" },
  ];

  const sample = [
    { direction: "N",  values: { "0-1": 40, "1-2": 60, "2-3": 45, "3-4": 30, "4-5": 25, "5-6": 15, "6-7": 10, "7+": 5 } },
    { direction: "NE", values: { "0-1": 35, "1-2": 50, "2-3": 40, "3-4": 28, "4-5": 22, "5-6": 12, "6-7": 8,  "7+": 4 } },
    { direction: "E",  values: { "0-1": 30, "1-2": 45, "2-3": 35, "3-4": 24, "4-5": 20, "5-6": 10, "6-7": 6,  "7+": 3 } },
    { direction: "SE", values: { "0-1": 45, "1-2": 55, "2-3": 42, "3-4": 30, "4-5": 26, "5-6": 14, "6-7": 9,  "7+": 4 } },
    { direction: "S",  values: { "0-1": 50, "1-2": 60, "2-3": 50, "3-4": 35, "4-5": 28, "5-6": 16, "6-7": 12, "7+": 6 } },
    { direction: "SW", values: { "0-1": 80, "1-2": 120,"2-3": 160,"3-4": 140,"4-5": 130,"5-6": 100,"6-7": 80, "7+": 60 } },
    { direction: "W",  values: { "0-1": 45, "1-2": 70, "2-3": 90, "3-4": 75, "4-5": 60, "5-6": 30, "6-7": 15, "7+": 8 } },
    { direction: "NW", values: { "0-1": 25, "1-2": 35, "2-3": 28, "3-4": 20, "4-5": 18, "5-6": 10, "6-7": 6,  "7+": 3 } },
  ];

  return (
    <div>
      <TopBar title="WMS" />

      {/* Tabs + Live Time & Date Picker */}
      <div className="py-6 flex justify-between items-center">
        <NavTabs
          tabs={["Live", "Logs", "Mis", "Wind Rose"]}
          defaultTab="Live"
          onChange={setActiveTab}
        />

        <div className="flex items-center gap-4">
          {/* ✅ Current Time */}
          <p className="text-[#006A02] font-medium text-lg">{currentTime}</p>

          <div className="w-px h-6 bg-gray-300"></div>

          {/* ✅ Reusable DateRangePicker */}
          <DateRangePicker
            // defaultFrom={fromDate}
            // defaultTo={toDate}
            onChange={({ from, to }) => {
              setFromDate(from);
              setToDate(to);
            }}
          />
        </div>
      </div>

      {activeTab === "Live" && (
        <div className="space-y-6">
          {/* Weather Info */}
          <div>
            <h3 className="text-xl font-normal mb-4 px-2 text-[#333333]">Weather Information</h3>
            <div className="grid grid-cols-3 gap-4">
              {weatherData.map((card, idx) => (
                <InfoCard key={idx} {...card} />
              ))}
            </div>
          </div>

          {/* Transformer Info */}
          <div>
            <h3 className="text-xl font-normal mb-4 px-2 text-[#333333]">Transformer Information</h3>
            <div className="grid grid-cols-3 gap-4">
              {transformerData.map((card, idx) => (
                <InfoCard key={idx} {...card} />
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "Logs" && <p>Logs</p>}

      {activeTab === "Mis" && <p>Mis</p>}

      {activeTab === "Wind Rose" && (
        <div className="">
          <WindRose data={sample} unit="k" />

          <div className="py-6">
            <h3 className="text-xl font-normal mb-4 px-2 text-[#333333]">Wind Log</h3>
            <div className="w-[100%] mt-3">
              <DataTable
                columns={windColumns}
                data={tableData}
                headerBg="#2E7D32"
                borderColor="#2E7D32"
                shadow={true}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
