import { useEffect, useState } from "react";
import NavTabs from "../Navtabs";
import DateRangePicker from "./Button/DateRangePicker";
import LineChartComponent from "./Charts/LineChartComponent";
import DataTable from "./Table/DataTable";

export default function InverterDetailsPage() {
  const [activeTab, setActiveTab] = useState("Inv-01");
  const [activeLogTab, setActiveLogTab] = useState<string>("Profile");

  const logTabs = [
    "Profile",
    "Log",
    "Voltage Profile",
    "Dc vs Ac Power",
    "Inverter Performance",
  ];

  const inverters = ["Inv-01", "Inv-02"];

  // ✅ Sample datasets for each inverter
  const datasets: any = {
    "Inv-01": {
      voltage: [
        { time: "17:01", voltageR: 0, voltageY: 0, voltageB: 0 },
        { time: "17:02", voltageR: 3000, voltageY: 2800, voltageB: 2900 },
        { time: "17:03", voltageR: 0, voltageY: 2700, voltageB: 2750 },
        { time: "17:04", voltageR: 3200, voltageY: 3100, voltageB: 3000 },
        { time: "17:05", voltageR: 0, voltageY: 0, voltageB: 0 },
        { time: "17:06", voltageR: 3150, voltageY: 3050, voltageB: 2980 },
        { time: "17:07", voltageR: 3180, voltageY: 3090, voltageB: 3010 },
        { time: "17:08", voltageR: 0, voltageY: 0, voltageB: 0 },
        { time: "17:09", voltageR: 3250, voltageY: 3120, voltageB: 3050 },
        { time: "17:10", voltageR: 3220, voltageY: 3100, voltageB: 2995 },
        { time: "17:11", voltageR: 0, voltageY: 2700, voltageB: 2800 },
        { time: "17:12", voltageR: 3300, voltageY: 3150, voltageB: 3050 },
        { time: "17:13", voltageR: 3290, voltageY: 3140, voltageB: 3045 },
        { time: "17:14", voltageR: 0, voltageY: 0, voltageB: 0 },
        { time: "17:15", voltageR: 3200, voltageY: 3100, voltageB: 3000 },
      ],
      current: [
        { time: "17:01", I_R: 10, I_Y: 12, I_B: 11 },
        { time: "17:02", I_R: 13, I_Y: 15, I_B: 14 },
        { time: "17:03", I_R: 9, I_Y: 10, I_B: 8 },
        { time: "17:04", I_R: 16, I_Y: 14, I_B: 15 },
        { time: "17:05", I_R: 0, I_Y: 0, I_B: 0 },
        { time: "17:06", I_R: 15, I_Y: 13, I_B: 14 },
        { time: "17:07", I_R: 16, I_Y: 15, I_B: 15 },
        { time: "17:08", I_R: 0, I_Y: 0, I_B: 0 },
        { time: "17:09", I_R: 17, I_Y: 14, I_B: 16 },
        { time: "17:10", I_R: 18, I_Y: 16, I_B: 17 },
        { time: "17:11", I_R: 5, I_Y: 7, I_B: 6 },
        { time: "17:12", I_R: 19, I_Y: 18, I_B: 17 },
        { time: "17:13", I_R: 18, I_Y: 17, I_B: 16 },
        { time: "17:14", I_R: 0, I_Y: 0, I_B: 0 },
        { time: "17:15", I_R: 15, I_Y: 13, I_B: 14 },
      ],
      power: [
        { time: "17:01", activePower: 200 },
        { time: "17:02", activePower: 400 },
        { time: "17:03", activePower: 350 },
        { time: "17:04", activePower: 500 },
        { time: "17:05", activePower: 0 },
        { time: "17:06", activePower: 480 },
        { time: "17:07", activePower: 510 },
        { time: "17:08", activePower: 0 },
        { time: "17:09", activePower: 530 },
        { time: "17:10", activePower: 550 },
        { time: "17:11", activePower: 120 },
        { time: "17:12", activePower: 600 },
        { time: "17:13", activePower: 590 },
        { time: "17:14", activePower: 0 },
        { time: "17:15", activePower: 520 },
      ],
      frequency: [
        { time: "17:00", frequency: 0 },
        { time: "17:01", frequency: 49.8 },
        { time: "17:02", frequency: 50.1 },
        { time: "17:03", frequency: 19.9 },
        { time: "17:04", frequency: 50.2 },
        { time: "17:05", frequency: 49.7 },
        { time: "17:06", frequency: 29.7 },
        { time: "17:07", frequency: 59.7 },
        { time: "17:08", frequency: 57.0 },
        { time: "17:09", frequency: 50.0 },
        { time: "17:10", frequency: 49.9 },
        { time: "17:11", frequency: 45.0 },
        { time: "17:12", frequency: 50.3 },
        { time: "17:13", frequency: 50.1 },
        { time: "17:14", frequency: 0 },
        { time: "17:15", frequency: 49.8 },
      ],
      // ✅ DC vs AC dataset
      dcAcPower: [
        { serial: 1, dcPower: 45, acPower: 56, date: "18-02-2025" },
        { serial: 2, dcPower: 56, acPower: 89, date: "19-02-2025" },
        { serial: 3, dcPower: 33, acPower: 23, date: "20-02-2025" },
        { serial: 4, dcPower: 67, acPower: 47, date: "21-02-2025" },
      ],

      tableData: [
        { serial: 1, "DC Power KW": "45", "AC power KW": 56, Date: "4-Aug-2025" },
        { serial: 2, "DC Power KW": "25", "AC power KW": 25, Date: "24-Aug-2025" },
            { serial: 3, "DC Power KW": "45", "AC power KW": 56, Date: "4-Aug-2025" },
        { serial: 4, "DC Power KW": "25", "AC power KW": 25, Date: "24-Aug-2025" },
        { serial: 5, "DC Power KW": "25", "AC power KW": 25, Date: "24-Aug-2025" },



      ]
    },
    "Inv-02": {
      voltage: [
        { time: "17:01", voltageR: 1000, voltageY: 1200, voltageB: 1100 },
        { time: "17:02", voltageR: 1800, voltageY: 1600, voltageB: 1700 },
        { time: "17:03", voltageR: 2000, voltageY: 1900, voltageB: 2100 },
        { time: "17:04", voltageR: 2200, voltageY: 2300, voltageB: 2000 },
        { time: "17:05", voltageR: 0, voltageY: 0, voltageB: 0 },
      ],
      current: [
        { time: "17:01", I_R: 8, I_Y: 9, I_B: 7 },
        { time: "17:02", I_R: 12, I_Y: 10, I_B: 11 },
        { time: "17:03", I_R: 14, I_Y: 13, I_B: 12 },
        { time: "17:04", I_R: 15, I_Y: 16, I_B: 14 },
        { time: "17:05", I_R: 0, I_Y: 0, I_B: 0 },
      ],
      power: [
        { time: "17:01", activePower: 300 },
        { time: "17:02", activePower: 450 },
        { time: "17:03", activePower: 420 },
        { time: "17:04", activePower: 600 },
        { time: "17:05", activePower: 0 },
      ],
      frequency: [
        { time: "17:01", frequency: 50.0 },
        { time: "17:02", frequency: 50.2 },
        { time: "17:03", frequency: 49.8 },
        { time: "17:04", frequency: 50.3 },
        { time: "17:05", frequency: 49.9 },
      ],
      // ✅ DC vs AC dataset
      dcAcPower: [
        { serial: 1, dcPower: 50, acPower: 70, date: "18-02-2025" },
        { serial: 2, dcPower: 60, acPower: 85, date: "19-02-2025" },
        { serial: 3, dcPower: 40, acPower: 30, date: "20-02-2025" },
        { serial: 4, dcPower: 72, acPower: 55, date: "21-02-2025" },
      ],

      tableData: [
        { serial: 1, "DC Power KW": "45", "AC power KW": 156, Date: "4-Aug-2025" },
        { serial: 2, "DC Power KW": "65", "AC power KW": 256, Date: "14-Aug-2025" },
            { serial: 3, "DC Power KW": "65", "AC power KW": 256, Date: "14-Aug-2025" },



      ]
    },
  };

  // ✅ Line configs
  const voltageLines = [
    { key: "voltageR", name: "Voltage_R", color: "#D60000" },
    { key: "voltageY", name: "Voltage_Y", color: "#00A91F" },
    { key: "voltageB", name: "Voltage_B", color: "#D7BA00" },
  ];


  const header: Column[] = [
    { key: "serial", label: "Serial No." },
    { key: "DC Power KW", label: "DC Power KW" },
    { key: "AC power KW", label: "AC power KW" },
    { key: "Date", label: " Date" },
  ];





  const currentLines = [
    { key: "I_R", name: "I_R", color: "#D60000" },
    { key: "I_Y", name: "I_Y", color: "#00A91F" },
    { key: "I_B", name: "I_B", color: "#D7BA00" },
  ];

  const powerLines = [{ key: "activePower", name: "Active Power", color: "#FF8400" }];

  const frequencyLines = [
    { key: "frequency", name: "Hz", color: "#788FFF", type: "monotone" },
  ];


  // ✅ Date state
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  useEffect(() => {
    const now = new Date();
    const today = now.toISOString().split("T")[0];
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    const yDate = yesterday.toISOString().split("T")[0];
    setFromDate(yDate);
    setToDate(today);
  }, []);

  const currentData = datasets[activeTab];

  return (
    <div className="py-6">
      <NavTabs tabs={inverters} defaultTab="Inv-01" onChange={setActiveTab} />

      <div className="mt-4 px-3">
        <div className="flex justify-between items-center ">
          {/* Log Tabs */}
          <div className="flex gap-6">
            {logTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveLogTab(tab)}
                className={`pb-2 font-medium ${activeLogTab === tab
                  ? "text-[#006A02] border-b-2 border-[#006A02] font-normal"
                  : "text-[#777777] hover:text-gray-700 font-normal"
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Date Picker */}
          <DateRangePicker
            defaultFrom={fromDate}
            defaultTo={toDate}
            onChange={({ from, to }) => {
              setFromDate(from);
              setToDate(to);
            }}
          />
        </div>

        <div className="py-6">
          {/* ✅ Only show charts when "Profile" is active */}
          {activeLogTab === "Profile" && (
            <div className="grid grid-cols-1 gap-6 mt-4">
              <LineChartComponent
                title="Voltage Curve"
                yLabel="kWh"
                data={currentData.voltage}
                lines={voltageLines}
              />

              <LineChartComponent
                title="Current Curve"
                yLabel="Amps"
                data={currentData.current}
                lines={currentLines}
              />

              <LineChartComponent
                title="Power Curve"
                yLabel="kW"
                data={currentData.power}
                lines={powerLines}
              />

              <LineChartComponent
                title="Frequency Curve"
                yLabel="Hz"
                data={currentData.frequency}
                lines={frequencyLines}
              />
            </div>
          )}

          {/* ✅ DC vs AC Power Tab */}
          {activeLogTab === "Dc vs Ac Power" && (
            <div>
              <p className="text-gray-600 text-sm">
                {activeTab} / Dc vs Ac Power
              </p>
              <div className="mt-4">
                <DataTable
                  columns={header}
                  data={currentData.tableData}
                  headerBg="#2E7D32"
                  borderColor="#2E7D32"
                  shadow={true}
                            rowsPerPage={4}

                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
