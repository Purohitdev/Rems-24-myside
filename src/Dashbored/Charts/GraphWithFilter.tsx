import React, { useState } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";

interface DataPoint {
    time: string; // "17:01" or "2025-08-22 17:01"
    value: number;
    max?: number;
    min?: number;
    avg?: number;
}

interface GraphProps {
    data: DataPoint[];
    mainLabel?: string;
}

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        const d: DataPoint = payload[0].payload;

        return (
            <div className="bg-black text-white rounded-2xl p-6 shadow-lg text-sm space-y-1 ">
                <p className="opacity-80">{label}</p>
                <div className="flex justify-between">
                    <span>WTI-HT-1:</span>
                    <span className="font-semibold">{d.value} kW</span>
                </div>
                {d.avg !== undefined && (
                    <div className="flex justify-between">
                        <span>Average:</span>
                        <span className="font-semibold">{d.avg} kW</span>
                    </div>
                )}
                {d.max !== undefined && (
                    <div className="flex justify-between">
                        <span>Maximum:</span>
                        <span className="font-semibold">{d.max} kW</span>
                    </div>
                )}
                {d.min !== undefined && (
                    <div className="flex justify-between">
                        <span>Minimum:</span>
                        <span className="font-semibold">{d.min} kW</span>
                    </div>
                )}
            </div>
        );
    }
    return null;
};

const GraphWithFilter: React.FC<GraphProps> = ({
    data,
    mainLabel = "WTI-HT-1",
}) => {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    const formatDate = (date: Date) => date.toISOString().split("T")[0];

    const [fromDate, setFromDate] = useState(formatDate(yesterday));
    const [toDate, setToDate] = useState(formatDate(today));

    const hasFullDate = data[0]?.time.includes("-");

    const filteredData = hasFullDate
        ? data.filter((d) => {
            const t = new Date(d.time);
            return t >= new Date(fromDate) && t <= new Date(toDate);
        })
        : data;

    return (
        <div className="p-4 bg-white rounded-xl shadow">
            <div className="flex items-center gap-4 mb-4 justify-between">
                <div className="flex items-center">
                    <div className="flex gap-1.5">
                        <span>From:</span>
                        <input
                            type="date"
                            value={fromDate}
                            onChange={(e) => setFromDate(e.target.value)}
                            className="w-30"
                        />
                    </div>
                    <div className="flex gap-1.5 ml-4">
                        <span>To:</span>
                        <input
                            type="date"
                            value={toDate}
                            onChange={(e) => setToDate(e.target.value)}
                                                        className="w-30"

                        />
                    </div>
                </div>

                <div className="flex justify-end items-center gap-4 mb-2 text-sm text-[#777777]">
                    <div className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-[#D60000]" />
                        Maximum
                    </div>
                    <div className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-[#00A91F]" />
                        Minimum
                    </div>
                    <div className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-[#788FFF]" />
                        Average
                    </div>
                    <div className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-[#D7BA00]" />
                        {mainLabel}
                    </div>
                </div>
            </div>

            <ResponsiveContainer width="100%" height={400}>
                <LineChart
                    data={filteredData}
                    margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                >
                    <CartesianGrid stroke="#e0e0e0" strokeDasharray="0" />

                    <XAxis
                        dataKey="time"
                        interval={0}
                        tick={{ fontSize: 10 }}
                        tickLine={false}
                        axisLine={false}
                    />

                    <YAxis
                        domain={[0, "auto"]}
                        tick={{ fontSize: 10 }}
                        tickLine={false}
                        axisLine={false}
                        tickCount={Math.floor(400 / 10)}
                    />

                    <Tooltip content={<CustomTooltip />} />

                    <Line type="monotone" dataKey="max" stroke="#D60000" dot={false} />
                    <Line type="monotone" dataKey="min" stroke="#00A91F" dot={false} />
                    <Line type="monotone" dataKey="avg" stroke="#788FFF" dot={false} />
                    <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#D7BA00"
                        dot={{ r: 3 }}
                        name={mainLabel}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default GraphWithFilter;

