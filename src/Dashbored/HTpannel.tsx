import { useState } from "react";
import NavTabs from "../Navtabs";
import TopBar from "./TopBar";
import GaugeCard from "./card/GaugeCard";

interface LiveData {
  id: string;
  min: number;
  max: number;
  avg: number;
  current: number;
  change: number;
}

export default function HTpannel() {
  const [activeLogTab, setActiveLogTab] = useState<string>("Profile");
  const [activeTab, setActiveTab] = useState<string>("HT Meter Trans 1");

  const logTabs = ["Profile", "Log", "Transformer Meter"];

  const liveDataTrans1: LiveData[] = [
    { id: "WTI-HV1-TRANS", min: 28.0, max: 46.4, avg: 34.729, current: 35.3, change: +0.4 },
    { id: "WTI-HV2-TRANS", min: 27.0, max: 36.4, avg: 35, current: 38.2, change: -0.2 },
    { id: "WTI-HV3-TRANS", min: 28.0, max: 46.4, avg: 34.729, current: 36.3, change: +1.2 },
  ];

  const liveDataTrans2: LiveData[] = [
    { id: "WTI-HV4-TRANS", min: 26.0, max: 40.0, avg: 32.5, current: 30.3, change: -0.5 },
    { id: "WTI-HV5-TRANS", min: 29.0, max: 42.1, avg: 35.2, current: 39.8, change: +0.6 },
    { id: "WTI-HV6-TRANS", min: 25.0, max: 37.5, avg: 33.0, current: 34.1, change: -0.3 },
  ];

  const currentLiveData = activeTab === "HT Meter Trans 1" ? liveDataTrans1 : liveDataTrans2;

  return (
    <div className="w-full">
      <TopBar title="HT Panel" />

      <div className="py-4">
        <NavTabs
          tabs={["HT Meter Trans 1", "HT Meter Trans 2"]}
          defaultTab="HT Meter Trans 1"
          onChange={setActiveTab}
        />
      </div>

      <div className="flex gap-12 border-b border-gray-200 px-4">
        {logTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveLogTab(tab)}
            className={`relative pb-3 font-medium transition-colors duration-200
              ${activeLogTab === tab
                ? "text-[#006A02]"
                : "text-gray-500 hover:text-gray-700"
              }`}
          >
            {tab}
            {activeLogTab === tab && (
              <span className="absolute left-0 bottom-0 h-[2px] w-full bg-[#006A02] rounded-full" />
            )}
          </button>
        ))}
      </div>

      <div className="py-6 px-4">
        {activeLogTab === "Profile" && (
          <div className="text-gray-700">
            Profile content for <span className="font-semibold">{activeTab}</span>
          </div>
        )}

        {activeLogTab === "Log" && (
          <div className="text-gray-700">
            Log details for <span className="font-semibold">{activeTab}</span>
          </div>
        )}

        {activeLogTab === "Transformer Meter" && (
          <div className="space-y-6">
            <div className="rounded-xl bg-white px-4 py-3 flex justify-between items-center shadow">
              <span className="font-semibold text-black text-lg">
                {activeTab} : <span className="ml-2 font-normal">2500 Kva</span>
              </span>

              <div className="flex items-center gap-3 text-sm">
                <span className="text-[#FF5F57]">-2 KW</span>
                <span className="text-gray-300">|</span>
                <span className="text-[#FF5F57]">5 kva</span>
                <span className="text-gray-300">|</span>
                <span className="text-[#FF5F57]">-4 kvar</span>
                <span className="text-gray-300">|</span>
                <span className="text-[#FF5F57]">50.002 Hz</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {currentLiveData.map((item) => (
                <GaugeCard key={item.id} {...item} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
