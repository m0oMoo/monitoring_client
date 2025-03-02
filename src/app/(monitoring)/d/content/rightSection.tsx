import React, { useState } from "react";
import DataBinding from "./dataBinding";
import OptionPanel from "./optionPannel";

const RightSection = () => {
  const [activeTab, setActiveTab] = useState<"optionPanel" | "dataBinding">(
    "optionPanel"
  );

  return (
    <div className="fixed top-0 right-0">
      {/* Tabs for switching */}
      <div className="flex border-l border-0.5 border-navy-border pt-[44px]">
        <button
          onClick={() => setActiveTab("optionPanel")}
          className={`px-4 py-2 ${
            activeTab === "optionPanel"
              ? "bg-navy-btn text-white"
              : "bg-gray-200"
          }`}
        >
          Option Panel
        </button>
        <button
          onClick={() => setActiveTab("dataBinding")}
          className={`px-4 py-2 ${
            activeTab === "dataBinding"
              ? "bg-navy-btn text-white"
              : "bg-gray-200 text"
          }`}
        >
          Data Binding
        </button>
      </div>

      {/* Content Rendering based on activeTab */}
      {activeTab === "optionPanel" && <OptionPanel />}
      {activeTab === "dataBinding" && <DataBinding />}
    </div>
  );
};

export default RightSection;
