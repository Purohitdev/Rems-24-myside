import React, { useState } from "react";
import { motion } from "framer-motion";

interface NavTabsProps {
  tabs: string[];
  defaultTab?: string;
  onChange?: (tab: string) => void;
}

const NavTabs: React.FC<NavTabsProps> = ({ tabs, defaultTab, onChange }) => {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]);

  return (
    <div className="relative inline-flex items-center rounded-full bg-gray-200/40 p-1">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => {
            setActiveTab(tab);
            onChange?.(tab);
          }}
          className={`relative z-10 px-6 py-2 text-sm font-medium transition-colors ${
            activeTab === tab ? "font-semibold text-white" : "text-black"
          }`}
        >
          {tab}
          {activeTab === tab && (
            <motion.div
              layoutId="active-pill"
              className="absolute inset-0 z-[-1] rounded-full bg-[#006A02]  shadow-sm"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
        </button>
      ))}
    </div>
  );
};

export default NavTabs;

