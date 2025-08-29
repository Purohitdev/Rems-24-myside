"use client"

import { useState } from "react"
import NavTabs from "../Navtabs"
import TopBar from "./TopBar"
import LineChartComponent from "./Charts/LineChartComponent"

function PVParameterLayout({ data }: { data: any }) {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-3 bg-white shadow rounded-xl p-4 text-sm space-y-2 h-full">
                    {[
                        { label: "Internal Temperature", value: `${data.internalTemp}°C` },
                        { label: "Inverter State", value: data.inverterState },
                        { label: "DC Power", value: `${data.dcPower} kW` },
                        { label: "Reactive Power", value: `${data.reactivePower} kVAR` },
                        { label: "Power Factor", value: data.powerFactor },
                        { label: "AC Frequency", value: `${data.acFreq} Hz` },
                    ].map((item, idx, arr) => (
                        <div key={idx} className="flex flex-col justify-between">
                            <div className="flex justify-between items-center">
                                <p className="text-base text-[#333333] font-normal">{item.label}:</p>
                                <span className="text-[#237C24] font-medium">{item.value}</span>
                            </div>
                            {idx < arr.length - 1 && <hr className="border-t border-gray-200 pb-2 my-2" />}
                        </div>
                    ))}
                </div>

                <div className="col-span-9 bg-white shadow rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-green-700 text-white">
                                <th className="px-4 py-3 text-center border-r border-[#237C24]" colSpan={2}>
                                    Voltage
                                </th>
                                <th className="px-4 py-3 text-center" colSpan={2}>
                                    Current
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.voltages.map((v: any, i: number) => (
                                <tr key={i} className="border-b border-gray-200 text-[#333333]">
                                    <td className="px-4 py-3 border-r border-gray-200 text-center text-sm font-normal rounded-l-2xl">
                                        {v.label}
                                    </td>
                                    <td className="px-4 py-3 border-r border-gray-200 text-center text-sm font-normal">
                                        {v.value} V
                                    </td>
                                    <td className="px-4 py-3 border-r border-gray-200 text-center text-sm font-normal">
                                        {data.currents[i]?.label}
                                    </td>
                                    <td className="px-4 py-3 text-center rounded-r-2xl">
                                        {data.currents[i]?.value} A
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="bg-white shadow rounded-xl overflow-hidden">
                <div className="bg-green-700 text-white px-4 py-3 text-center font-medium">
                    Current String Values
                </div>
                <table className="w-full text-sm">
                    <tbody>
                        {data.stringValues.map((row: any, i: number) => (
                            <tr key={i} className="border-b border-gray-200 text-[#333333] text-sm">
                                <td className="px-4 py-3 text-center w-1/4 font-medium">{row.leftLabel}</td>
                                <td className="px-4 py-3 text-center w-1/4 border-r border-gray-200">{row.leftValue} A</td>
                                <td className="px-4 py-3 text-center w-1/4 font-medium">{row.rightLabel}</td>
                                <td className="px-4 py-3 text-center w-1/4">{row.rightValue} A</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default function Pv() {
    const [activeTab, setActiveTab] = useState<string>("PV Parameter")
    const logTabs = ["INV-01", "INV-02"]
    const [activeLogTab, setActiveLogTab] = useState<string>("INV-01")

    const inverterData: Record<string, any> = {
        "INV-01": {
            internalTemp: 45.2,
            inverterState: "Running",
            dcPower: 12.5,
            reactivePower: 2.1,
            powerFactor: 0.98,
            acFreq: 50.1,
            voltages: [
                { label: "DC_Voltage 1", value: 385.2 },
                { label: "DC_Voltage 2", value: 387.1 },
                 { label: "DC_Voltage 3", value: 3827.1 },
                                  { label: "DC_Voltage 4", value: 327.1 },

            ],
            currents: [
                { label: "DC_Current 1", value: 8.2 },
                { label: "DC_Current 2", value: 8.5 },
                  { label: "DC_Voltage 3", value: 7.1 },
                                  { label: "DC_Voltage 4", value: 2.1 },
            ],
            stringValues: [
                { leftLabel: "Current String 1", leftValue: 8.2, rightLabel: "Current String 2", rightValue: 8.5 },
            ],

            voltageData: [
                {
                    time: "10:00",
                    "DC Current 1": 2,
                    "DC Current 2": 18,
                    "DC Current 3": 23,
                    "DC Current 4": 5,
                    "DC Current 5": 32,
                    "DC Current 6": 14,
                },
                {
                    time: "10:10",
                    "DC Current 1": 14,
                    "DC Current 2": 20,
                    "DC Current 3": 22,
                    "DC Current 4": 18,
                    "DC Current 5": 12,
                    "DC Current 6": 16,
                },
                {
                    time: "10:20",
                    "DC Current 1": 13,
                    "DC Current 2": 19,
                    "DC Current 3": 21,
                    "DC Current 4": 17,
                    "DC Current 5": 11,
                    "DC Current 6": 15,
                },
            ],
            voltageLines: [
                { key: "DC Current 1", name: "DC Current 1", color: "#D60000" },
                { key: "DC Current 2", name: "DC Current 2", color: "#00A91F" },
                { key: "DC Current 3", name: "DC Current 3", color: "#D7BA00" },
                { key: "DC Current 4", name: "DC Current 4", color: "#D700A1" },
                { key: "DC Current 5", name: "DC Current 5", color: "#0700D7" },
                { key: "DC Current 6", name: "DC Current 6", color: "#D76100" },
            ],
        },
        "INV-02": {
            internalTemp: 43.8,
            inverterState: "Running",
            dcPower: 11.8,
            reactivePower: 1.9,
            powerFactor: 0.97,
            acFreq: 49.9,
            voltages: [
                { label: "DC_Voltage 1", value: 385.2 },
                { label: "DC_Voltage 2", value: 387.1 },
            ],
            currents: [
                { label: "DC_Current 1", value: 7.9 },
                { label: "DC_Current 2", value: 8.2 },
            ],
            stringValues: [
                { leftLabel: "Current String 1", leftValue: 7.8, rightLabel: "Current String 2", rightValue: 8.1 },
            ],

            voltageData: [
                { time: "10:00", "DC Current 1": 7.9, "DC Current 2": 8.0 },
                { time: "10:05", "DC Current 1": 8.0, "DC Current 2": 8.2 },
                { time: "10:10", "DC Current 1": 8.1, "DC Current 2": 8.3 },
                { time: "10:15", "DC Current 1": 8.0, "DC Current 2": 8.1 },
            ],
            voltageLines: [
                { key: "DC Current 1", name: "DC Current 1", color: "#D60000" },
                { key: "DC Current 2", name: "DC Current 2", color: "#00A91F" },
            ],
        },
    }

    const currentData = inverterData[activeLogTab]

    return (
        <div>
            <TopBar title="PV Monitoring" />
            <div className="py-6 space-y-4">
                <div className="flex justify-between items-center">
                    <NavTabs
                        tabs={["PV Parameter", "MPPT Monitoring", "String Monitoring"]}
                        defaultTab="PV Parameter"
                        onChange={setActiveTab}
                    />
                </div>

                <div className="flex gap-6 border-b border-gray-200 px-3 overflow-x-auto">
                    {logTabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveLogTab(tab)}
                            className={`pb-2 font-medium whitespace-nowrap ${activeLogTab === tab
                                ? "text-[#006A02] border-b-2 border-[#006A02]"
                                : "text-gray-500 hover:text-gray-700"
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                <div className="p-4">
                    {activeTab === "PV Parameter" && <PVParameterLayout data={currentData} />}

                    {activeTab === "MPPT Monitoring" && (
                        <LineChartComponent
                            title="DC Current Curve"
                            yLabel="Amps"
                            data={currentData.voltageData}   
                            lines={currentData.voltageLines} 
                        />
                    )}

                    {activeTab === "String Monitoring" && (
                        <p>
                            Showing <b>{activeTab}</b> data for <b>{activeLogTab}</b>
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}
