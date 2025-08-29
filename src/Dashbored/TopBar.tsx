import { useState } from "react";
import { FaBell } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import AlertsModal from "./AlertsModal";

interface TopBarProps {
  title: string;
  userId?: string | number;
}

export default function TopBar({ title, userId = "2423244" }: TopBarProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const alerts = [
    {
      title: "Device Offline – Site A",
      time: "22:01",
      message:
        "Communication lost with Battery Bank Controller at Site A. Verify device connectivity or contact support.",
    },
    {
      title: "Battery Discharge Level Critical",
      time: "20:08",
      message:
        "Battery State of Charge has dropped below 15%. Immediate charging recommended to maintain system reliability.",
    },
    {
      title: "Grid Import Spike Detected",
      time: "20:08",
      message:
        "Unusually high grid power usage recorded in the last hour. Review consumption patterns or check for non-essential loads.",
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-[32px] font-bold mb-4">{title}</h1>

        <div className="flex items-center space-x-6">
          <span className="flex items-center text-lg">
            <span className="w-8 h-8 rounded-full bg-[#71DCA6] mr-2"></span>
            <span className="text-[#333333] font-normal">User ID:</span>
            <span className="ml-2 font-medium">{userId}</span>
          </span>

          <div className="relative">
            <FaBell
              className="text-2xl cursor-pointer"
              onClick={() => setIsModalOpen(true)}
            />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {alerts.length}
            </span>
          </div>

          <CiLogout className="text-3xl cursor-pointer" />
        </div>
      </div>

      <hr className="border-t border-gray-300 " />

      <AlertsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        alerts={alerts}
      />
    </div>
  );
}
