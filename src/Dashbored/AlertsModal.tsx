import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Alert {
  title: string;
  time: string;
  message: string;
}

interface AlertsModalProps {
  isOpen: boolean;
  onClose: () => void;
  alerts: Alert[];
}

export default function AlertsModal({ isOpen, onClose, alerts }: AlertsModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/30 flex justify-end z-50"
        >
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="bg-white w-full max-w-md h-full shadow-lg flex flex-col rounded-l-2xl"
          >
            <div className="flex justify-between items-center p-4 pt-10">
              <h2 className="text-3xl font-bold">Alerts</h2>
              <X className="cursor-pointer" onClick={onClose} />
            </div>

            <div className="overflow-y-auto flex-1 p-4 space-y-4">

         {alerts.map((alert, index) => (
  <div key={index}>
    <div className="flex gap-3">
      <div className="w-1 bg-green-600 rounded-full" />

      <div className="flex-1">
        <div className="flex justify-between items-start">
          <h3 className="font-medium">{alert.title}</h3>
          <span className="text-sm text-gray-500">{alert.time}</span>
        </div>
        <p className="text-[#777777] text-sm font-normal mt-1">
          {alert.message}
        </p>
      </div>
    </div>

    <hr className="border-t border-gray-300 pb-4 my-4" />
  </div>
))}


            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
