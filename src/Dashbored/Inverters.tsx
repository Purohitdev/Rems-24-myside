import { useState } from "react";
import DataTable from "./Table/DataTable";
import TopBar from "./TopBar";
import { FaArrowRight, FaSearch, FaRedoAlt, FaExpand } from "react-icons/fa";
import InverterDetailsPage from "./InverterDetailsPage";

export default function Inverters() {
  const [showDetails, setShowDetails] = useState(true);

  const plantColumns = [
    { key: "id", label: "ID" },
    { key: "s_id", label: "S_ID" },
    { key: "mac_id", label: "Mac_ID" },
    { key: "name", label: "Name" },
    { key: "make", label: "Make" },
    { key: "modelNo", label: "Model No." },
    { key: "capacity", label: "Capacity(kWp)" },
    { key: "dailyKwh", label: "Daily kWh" },
    { key: "totalKwh", label: "Total kWh" },
    { key: "dateTime", label: "Date/Time" },
    { key: "kw", label: "KW" },
  ];

  const tableData = [
    {
      id: "481BW001",
      s_id: "011",
      mac_id: "4824864",
      name: "INV-01",
      make: "Sungrow",
      modelNo: "",
      capacity: 300,
      dailyKwh: 1774,
      totalKwh: 149660,
      dateTime: "22-Aug-2025 18:15:00",
      kw: 13.67,
    },

  ];

  return (
    <div>
      <TopBar title="Inverters" />

      {showDetails ? (
        <div className="">
          <div className="py-6 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <h2 className="font-bold text-[20px]">Inverter Details</h2>
              <button
                onClick={() => setShowDetails(false)}
                className="flex items-center gap-2 px-4 py-1 border border-[#237C24] text-[#237C24] rounded-full text-sm hover:bg-green-50 transition"
              >
                View More <FaArrowRight className="text-sm font-normal" />
              </button>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-4 text-base">
                <span className="text-[#E40000] font-medium">Online: 12</span>
                <span className="text-[#237C24] font-medium">Offline: 2</span>
              </div>

              <div className="flex items-center rounded-full px-3 py-1 bg-white shadow-sm">
                <input
                  type="text"
                  placeholder="Search"
                  className="outline-none text-sm text-gray-600 w-40"
                />
                <FaSearch className="text-gray-400 ml-2" />
              </div>

              <div className="flex items-center gap-4 text-gray-500">
                <FaRedoAlt className="cursor-pointer hover:text-gray-700" />
                <FaExpand className="cursor-pointer hover:text-gray-700" />
              </div>
            </div>
          </div>

          <div>
            <DataTable
              columns={plantColumns}
              data={tableData}
              headerBg="#2E7D32"
              borderColor="#2E7D32"
              shadow={true}
              rowsPerPage={7}
            />
          </div>
        </div>
      ) : (
        <InverterDetailsPage />
      )}
    </div>
  );
}
