"use client"

import { useState } from "react"
import TopBar from "./TopBar"
import NavTabs from "../Navtabs"
import DataTable from "./Table/DataTable"

export default function Projects() {
  const [activeTab, setActiveTab] = useState("Plant Data")

  const plantColumns = [
    { key: "component", label: "Component" },
    { key: "units", label: "Units" },
    { key: "model", label: "Model" },
    { key: "mfr", label: "MFR" },
    { key: "rating", label: "Rating" },
    { key: "ratingUnit", label: "Rating Unit" },
    { key: "technology", label: "Technology" },
  ]

  const plantData = [
    {
      component: "Inverter A",
      units: 13,
      model: "SG-320X",
      mfr: "Sungrow",
      rating: 300,
      ratingUnit: "KW",
      technology: "String",
    },
    {
      component: "Inverter B",
      units: 2,
      model: "SG-110X",
      mfr: "Sungrow",
      rating: 100,
      ratingUnit: "KW",
      technology: "String",
    },
    { component: "ACDB", units: 2, model: "800v", mfr: "Eaton", rating: 800, ratingUnit: "v", technology: "String" },
    {
      component: "Transformer",
      units: 2,
      model: "800v/33kv",
      mfr: "ShriKrsna",
      rating: 2500,
      ratingUnit: "kW",
      technology: "String",
    },
    { component: "VCB", units: 2, model: "33kv", mfr: "Stelemac", rating: 33, ratingUnit: "kv", technology: "String" },
    {
      component: "Aux Transformer",
      units: 1,
      model: "800v/415v",
      mfr: "ShriKrsna",
      rating: 100,
      ratingUnit: "kW",
      technology: "String",
    },
    { component: "LT Panel", units: 1, model: "3Ph 415v", mfr: "", rating: 415, ratingUnit: "v", technology: "String" },
  ]

  return (
    <div className="min-h-fit">
      <TopBar title="Projects" />

      <div className="py-6 space-y-4">
        <NavTabs tabs={["Plant Data", "SLD", "Approved Design"]} defaultTab="Plant Data" onChange={setActiveTab} />

        <div>
          {activeTab === "Plant Data" && (
            <DataTable columns={plantColumns} data={plantData} headerBg="#333333" borderColor="#FFFf" shadow={true} />
          )}

          {activeTab === "SLD" && (
            <div className="overflow-auto max-h-[80vh] flex justify-center">
              <img src="/image.png" alt="SLD Diagram" className="max-w-full h-auto" />
            </div>
          )}
          {activeTab === "Approved Design" && (
            <div className="w-full h-[85vh] border rounded-lg overflow-hidden">
              <iframe src="/pdf.pdf" className="w-full h-full" title="Approved Design PDF" />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
