import { useEffect, useState, } from "react";

import TopBar from "./TopBar";
import { FiTrendingUp } from "react-icons/fi";
import { GiCoalWagon } from "react-icons/gi";
import { FaLeaf, FaTree } from "react-icons/fa";
import GenerationChart from "./Charts/GenerationChart";
import { Sun, Wind, CloudRain, Thermometer, Compass } from "lucide-react";
import GenerationAreaChartComponent from "./Charts/GenerationBarChart";


export default function Home() {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const metrics = [
    {
      label: "Revenue gains",
      value: "46.2 Lacs",
      icon: <FiTrendingUp size={18} color="#006A02" />,
    },
    {
      label: "Coal Saved",
      value: "391.1 kTons",
      icon: <GiCoalWagon size={18} color="#006A02" />,
    },
    {
      label: "CO₂ Reductions",
      value: "1.1 mn Tons",
      icon: <FaLeaf size={18} color="#006A02" />,
    },
    {
      label: "Equivalent Trees Planted",
      value: "52964.8",
      icon: <FaTree size={18} color="#006A02" />,
    },
  ];

  const systemStats = [
    { label: "Total Inverters", value: 14 },
    { label: "Total Solar Meter/s", value: 2 },
    { label: "Total LT mains", value: 2 },
  ];

  const formattedDate = dateTime.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });
  const formattedTime = dateTime.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });


  const data = [
    { time: "17:00", value: 500 },
    { time: "18:00", value: 2000 },
    { time: "19:00", value: 1800 },
    { time: "20:00", value: 2500 },
    { time: "21:00", value: 2850 },
    { time: "22:00", value: 2000 },
    { time: "23:00", value: 1500 },
    { time: "24:00", value: 2700 },
  ];
  



const inverterData = {
  "Inv-01": [
    { day: "Mon", generation: 5000, expected: 8000 },
    { day: "Tue", generation: 7000, expected: 9000 },
    { day: "Wed", generation: 6500, expected: 8500 },
        { day: "Thus", generation: 2500, expected: 9500 },
                { day: "Fri", generation: 7500, expected: 5500 },




  ],
  "Inv-02": [
    { day: "Mon", generation: 4000, expected: 7500 },
    { day: "Tue", generation: 6000, expected: 8800 },
    { day: "Wed", generation: 6800, expected: 9100 },
    
  ],
  "Inv-03": [
    { day: "17", generation: 1000 },
    { day: "18", generation: 2100 },
    { day: "19", generation: 2850 },
  ],
};
  const infoItems = [
    { label: "Solar Irradiance:", value: "103.2 W/m²", icon: Sun },
    { label: "Solar Isolation:", value: "5.541 kWh/m²/day", icon: Sun },
    { label: "Wind Speed:", value: "15 Km/h", icon: Wind },
    { label: "Rain:", value: "0 mm", icon: CloudRain },
    { label: "Module Temperature:", value: "33.1 °C", icon: Thermometer },
    { label: "Ambient Temperature:", value: "33.6 °C", icon: Thermometer },
    { label: "Wind Direction:", value: "197°", icon: Compass },
  ];

  // const data2 = useMemo(
  //   () => [
  //     { day: "Mon", achieved: 100, target: 200 },
  //     { day: "Tue", achieved: 220, target: 180 },
  //     { day: "Wed", achieved: 180, target: 220 },
  //     { day: "Thu", achieved: 320, target: 250 },
  //     { day: "Fri", achieved: 160, target: 190 },
  //     { day: "Sat", achieved: 190, target: 190 },
  //     { day: "Sun", achieved: 320, target: 300 },


  //   ],
  //   []
  // );



   const foot = [
    {
      label: "Location",
      value: "Palana Bikaner, Rajasthan",
    },
    {
      label: "Plant Capacity",
      value: "5400 kWp",
    },
    {
      label: "Plant Commissioned By",
      value: "RERTC Infra pvt. ltd.",
    },
    {
      label: "Plant Commisdioned Date",
      value: "05-29-2025",
    },
      {
      label: "Subscription Expiry Date",
      value: "05-29-2025",
    },
  ];

  return (
    <div className="min-h-screen">
      <TopBar title="Dashboard" />

      <div className="py-4 flex flex-wrap items-center justify-between text-sm md:text-base gap-4">
        {metrics.map((metric, index) => (
          <p
            key={index}
            className="text-[#777777] font-light flex items-center gap-2"
          >
            {metric.label}:{" "}
            <span className="font-normal text-black">{metric.value}</span>
            {metric.icon}
          </p>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-between text-sm md:text-base gap-4">
        <p className="font-normal text-[#777777] flex items-center ">
          {formattedDate}
          <span className="w-px h-5 bg-gray-300 inline-block mx-2" />
          {formattedTime}
        </p>

        <div className="flex items-center gap-3">
          {systemStats.map((stat, index) => (
            <div key={index} className="flex items-center gap-3">
              {index > 0 && <span className="w-px h-5 bg-gray-300" />}
              <p className="text-[#777777] font-normal flex items-center gap-2">
                {stat.label}:{" "}
                <span className="font-semibold text-[#237C24]">
                  {stat.value}
                </span>
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="py-8 flex justify-between  ">
        <div className="w-[70%]">
          <GenerationChart
            totalGenerated="4,600 kW"
            generatedTill="22:06, 17 August"
            pr="56%"
            ghi="456"
            data={data}
          />
        </div>

        <div className="flex-1 bg-white shadow rounded-2xl p-6 max-w-[29%]">
          <h2 className="text-xl font-semibold mb-4">Main Information</h2>
          <div className="text-sm">
            {infoItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index}>
                  <div className="flex justify-between items-center py-2">
                    <div className="flex items-center gap-2">
                      <Icon size={18} className="text-green-600" />
                      <span className="text-[#777777] text-sm">{item.label}</span>
                    </div>
                    <span className="font-semibold text-black">{item.value}</span>
                  </div>
                  {index < infoItems.length - 1 && <hr className="my-2  border-gray-300" />}
                </div>
              ); 
            })}
          </div>
        </div>
      </div>
      <div >
        

        <GenerationAreaChartComponent
        title="Inverters Power Generation"
        inverterTabs={["Inv-01", "Inv-02", "Inv-03"]}
        defaultInverter="Inv-01"
        inverterData={inverterData}
        
      />


      </div>


      
      <div className="py-8 flex flex-wrap items-center justify-between text-sm md:text-base gap-4">
        {foot.map((foot, index) => (
          <p
            key={index}
            className="text-[#777777] font-light flex items-center gap-2 text-sm"
          >
            {foot.label}:{" "}
            <span className="font-normal text-black  text-sm">{foot.value}</span>
          </p>
        ))}
      </div>

    </div>
  );
}
