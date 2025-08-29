import { useState } from "react";
import NavTabs from "../Navtabs";
import TopBar from "./TopBar";
import DateRangePicker from "./Button/DateRangePicker";

export default function PR() {
  const [activeTab, setActiveTab] = useState("Performance");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");





  return (
    <div>
      <TopBar title="PR Analysis" />
      <div className="py-6 flex justify-between items-center">
        <NavTabs
          tabs={["Performance", "Mis_1", "Mis_2", "Solar Irradiance"]}
          defaultTab="Performance"
          onChange={setActiveTab}
        />
        <DateRangePicker
          // defaultFrom={fromDate}
          // defaultTo={toDate}
          onChange={({ from, to }) => {
            setFromDate(from);
            setToDate(to);
          }}
        />
      </div>

      {activeTab === "Performance" && (



  <p>Performance</p>

      )}

    </div>
  );
}