import { Link, useLocation } from "react-router-dom";
import { GoHomeFill } from "react-icons/go";
import { MdWork, MdSettings, MdPower, MdBolt, MdDeviceHub } from "react-icons/md";
import { FaSolarPanel, FaChartBar } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { TbWindowMinimize } from "react-icons/tb";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Sidebar() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const iconSize = collapsed ? 24 : 20; 

  const navItems = [
    { path: "/dashboard", label: "Dashboard", icon: <GoHomeFill size={iconSize} /> },
    { path: "/dashboard/projects", label: "Projects", icon: <MdWork size={iconSize} /> },
    { path: "/dashboard/Inverters", label: "Inverters", icon: <MdSettings size={iconSize} /> },
    { path: "/dashboard/ACDB", label: "ACDB", icon: <MdPower size={iconSize} /> },
     { path: "/dashboard/Pv", label: "PV Monitoring", icon: <FaChartBar size={iconSize} /> },
    { path: "/dashboard/Transformers", label: "Transformers", icon: <MdBolt size={iconSize} /> },
    { path: "/dashboard/HTPanel", label: "HT Panels", icon: <MdDeviceHub size={iconSize} /> },
    { path: "/dashboard/WMS", label: "WMS", icon: <FaSolarPanel size={iconSize} /> },
    { path: "/dashboard/PR", label: "PR", icon: <FaChartBar size={iconSize} /> },
       

  ];

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 80 : 260 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="bg-white text-[#777777] flex flex-col rounded-r-4xl shadow-2xl overflow-hidden"
    >
      <div
        className={`text-xl font-bold px-4 py-6 flex items-center ${
          collapsed ? "justify-center" : "justify-between"
        }`}
      >
        <AnimatePresence initial={false}>
          {!collapsed && (
            <motion.img
              src="/logo.svg"
              alt="Logo"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            />
          )}
        </AnimatePresence>
        <button onClick={() => setCollapsed(!collapsed)}>
          <TbWindowMinimize size={iconSize} />
        </button>
      </div>

      <AnimatePresence>
        {!collapsed && (
          <motion.hr
            className="border-t border-gray-300 mx-4"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            exit={{ width: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </AnimatePresence>

      <nav className="flex-1 p-4 space-y-5 mt-4">
        {navItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <motion.div
              key={item.path}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to={item.path}
                className={`px-4 py-2 rounded-full transition flex items-center gap-3 font-normal ${
                  active ? "bg-[#237C24] text-white" : "hover:bg-[#237c249a]"
                }`}
              >
                {item.icon}
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            </motion.div>
          );
        })}
      </nav>

      <AnimatePresence>
        {!collapsed && (
          <motion.hr
            className="border-t border-gray-300 mx-4"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            exit={{ width: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </AnimatePresence>

      <div className="p-4">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            to="/"
            className="px-3 py-2 text-center flex gap-3 items-center"
            onClick={() => localStorage.removeItem("auth")}
          >
            <CiLogout size={iconSize} />
            <AnimatePresence>
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  Sign out
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
        </motion.div>
      </div>
    </motion.aside>
  );
}
