import { useState, useEffect } from "react";

// interface DateRangePickerProps {
//   onChange?: (range: { from: string; to: string }) => void;
// }

interface DateRangePickerProps {
  defaultFrom?: string;
  defaultTo?: string;
  onChange: ({ from, to }: { from: string; to: string }) => void;
}

export default function DateRangePicker({ onChange }: DateRangePickerProps) {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const getDefaultDates = () => {
    const now = new Date();

    const today = now.toISOString().split("T")[0]; // YYYY-MM-DD
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    const yDate = yesterday.toISOString().split("T")[0];

    return { from: yDate, to: today };
  };

  useEffect(() => {
    const { from, to } = getDefaultDates();
    setFromDate(from);
    setToDate(to);

    if (onChange) onChange({ from, to });

    const interval = setInterval(() => {
      const { from, to } = getDefaultDates();
      setFromDate(from);
      setToDate(to);
      if (onChange) onChange({ from, to });
    }, 60 * 1000);

    return () => clearInterval(interval);
  }, [onChange]);

  return (
    <div className="flex items-center gap-2 text-sm">
      <label className="font-medium">From:</label>
      <input
        type="date"
        value={fromDate}
        max={toDate || undefined}
        onChange={(e) => setFromDate(e.target.value)}
        className="px-3 py-1 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
      />

      <label className="font-medium">To:</label>
      <input
        type="date"
        value={toDate}
        min={fromDate || undefined}
        max={getDefaultDates().to} 
        onChange={(e) => setToDate(e.target.value)}
        className="px-3 py-1 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
      />
    </div>
  );
}
