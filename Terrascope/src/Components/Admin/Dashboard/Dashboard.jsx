import React, { useState } from "react";
import Navbar from "../../../Components/NavBar/Navbar";
import Anomalies from "../../../Components/Admin/Anomalies/Anomalies";
import Trends from "../../../Components/Admin/Trends/Trends";
import DataInsight from "../../../Components/Admin/DataInsight/DataInsight";
import Emission from "../../../Components/Admin/Sustainabilty/Emission";

const Dashboards = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      id: 0,
      label: "Anomaly",
      content: (
        <div className="bg-white shadow-lg rounded-2xl p-4 flex items-center justify-center">
          <Anomalies className="w-full h-80" />
        </div>
      ),
    },
    {
      id: 1,
      label: "Data Insight",
      content: (
        <div className="rounded-2xl">
          <DataInsight className="w-full" />
        </div>
      ),
    },
    {
      id: 2,
      label: "Trends",
      content: (
        <div className="col-span-2 bg-white shadow-lg rounded-2xl">
          <Trends className="w-full" />
        </div>
      ),
    },
    {
      id: 3,
      label: "Sustainability",
      content: (
        <div className="col-span-2 bg-white shadow-lg rounded-2xl">
          <Emission className="w-full" />
        </div>
      ),
    },
  ];

  return (
    <div className="flex h-screen">
      <div className="bg-white-800 text-white w-1/7">
        <Navbar />
      </div>

      <div className="flex-1 mt-2 p-2 overflow-auto flex flex-col">
        {/* <h1
          className="text-3xl font-semibold text-gray-600 bg-gradient-to-r from-gray-100 via-purple-100 to-gray-100 
          py-2 px-2 rounded-xl text-center shadow-md"
        >
          Anomaly Overview
        </h1> */}

        {/* Tab Buttons */}
        <div className="flex mt-1 border-b">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 ${
                activeTab === tab.id
                  ? "border-blue-500 text-blue-500 border-b-2"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="mt-3">
          {tabs.map(
            (tab) =>
              activeTab === tab.id && (
                <div key={tab.id} className="w-full">
                  {tab.content}
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboards;
