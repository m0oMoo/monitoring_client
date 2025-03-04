"use client";

import { useState } from "react";
import DataBinding from "./dataBinding";
import OptionPanel from "./optionPannel";
import WidgetOption from "./widgetOption";
import { useSelectedSection } from "@/app/context/selectedSectionContext";

const RightSection = () => {
  const { selectedSection, setSelectedSection } = useSelectedSection();

  // 🔹 activeTab은 Data Binding을 포함한 탭 상태를 관리
  const [activeTab, setActiveTab] = useState<
    "chartOption" | "dataBinding" | "widgetOption"
  >("chartOption");

  const handleSectionClick = (
    type: "chartOption" | "dataBinding" | "widgetOption"
  ) => {
    setActiveTab(type); // 🔹 클릭한 탭을 activeTab으로 설정
    if (type !== "dataBinding") {
      setSelectedSection(type); // 🔹 Data Binding이 아닌 경우만 selectedSection 변경
    }
  };

  return (
    <div className="fixed top-0 right-0">
      <div className="flex flex-col text-md2 border-l border-0.5 border-navy-border pt-[44px]">
        {/* 🔹 Data Binding 버튼 - selectedSection을 변경하지 않고, activeTab만 변경 */}
        <button
          onClick={() => handleSectionClick("dataBinding")}
          className={`px-[7.5px] py-2 ${
            activeTab === "dataBinding"
              ? "bg-navy-btn text-white"
              : "bg-gray-200"
          }`}
        >
          Data Binding
        </button>

        {/* 🔹 Chart Option & Widget Option을 flex-row + w-full */}
        <div className="flex flex-row w-full">
          <button
            onClick={() => handleSectionClick("chartOption")}
            className={`w-full py-2 ${
              selectedSection === "chartOption"
                ? "bg-navy-btn text-white"
                : "bg-gray-200"
            }`}
          >
            Chart Option
          </button>
          <button
            onClick={() => handleSectionClick("widgetOption")}
            className={`w-full py-2 ${
              selectedSection === "widgetOption"
                ? "bg-navy-btn text-white"
                : "bg-gray-200"
            }`}
          >
            Widget Option
          </button>
        </div>
      </div>

      {/* 🔹 선택한 탭에 따라 컨텐츠 렌더링 */}
      {activeTab === "dataBinding" && <DataBinding />}
      {selectedSection === "chartOption" && <OptionPanel />}
      {selectedSection === "widgetOption" && <WidgetOption />}
    </div>
  );
};

export default RightSection;
