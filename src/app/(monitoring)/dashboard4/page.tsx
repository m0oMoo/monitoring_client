"use client";

import React, { useState } from "react";
import ChartComponent from "@/app/components/chart/chartComponent";
import { CHART_DATA_UNIFIED } from "@/app/data/commonChartData";
import {
  Save,
  File,
  BarChart,
  LifeBuoy,
  LineChart,
  PieChart,
} from "lucide-react";
import { Tabs } from "@/app/(design)/design6/components/tabs/tabs";
import TabsGroup from "@/app/(design)/design6/components/tabs/tabsGroup";
import DataBindingModal from "@/app/components/modal/dataBindingModal";

const chartTypes = [
  { type: "bar", icon: <BarChart size={20} /> },
  { type: "line", icon: <LineChart size={20} /> },
  { type: "pie", icon: <PieChart size={20} /> },
  { type: "doughnut", icon: <LifeBuoy size={20} /> },
];

const Dashboard4Page = () => {
  const [isHeaderVisible, setIsHeaderVisible] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedLibrary, setSelectedLibrary] = useState<
    "chartjs" | "plotly" | "d3"
  >("chartjs");
  const [chartData, setChartData] = useState({ ...CHART_DATA_UNIFIED });

  /** ✅ 차트 타입 변경 핸들러 */
  const handleChartTypeChange = (type: string) => {
    setChartData((prevData) => ({
      ...prevData,
      options: {
        ...prevData.options,
        chartType: type,
      },
    }));
  };

  return (
    <div className="bg-[#1E1E2E] text-white min-h-screen p-6">
      {/* 헤더 */}
      <header
        className={`flex justify-between items-center transition-all duration-300 ${
          isHeaderVisible ? "opacity-100" : "opacity-0 h-0 overflow-hidden"
        }`}
      >
        <h1 className="text-3xl font-bold tracking-wide">
          📊 모니터링 대시보드
        </h1>
        <div className="flex space-x-3 p-1 rounded-lg shadow-md">
          <button className="flex gap-2 border border-gray-600 bg-gray-800 p-3 rounded-lg text-white hover:bg-gray-700 transition">
            <Save size={18} />
            <p className="text-lg">저장</p>
          </button>
          <button
            className="flex gap-2 border border-gray-600 bg-gray-800 p-3 rounded-lg text-white hover:bg-gray-700 transition"
            onClick={() => setIsModalOpen(true)}
          >
            <File size={18} />
            <p className="text-lg">데이터 불러오기</p>
          </button>
        </div>
      </header>

      {/* 차트 선택 탭 */}
      <div
        className={`flex justify-between items-center transition-all duration-300 ${
          isHeaderVisible ? "opacity-100" : "opacity-0 h-0 overflow-hidden"
        }`}
      >
        <Tabs
          defaultValue="dashboard1"
          className="w-full items-end border-b border-gray-700 pb-2 flex justify-between"
        >
          <TabsGroup />
          <div className="flex space-x-3 bg-gray-900 p-3 rounded-lg shadow-md border border-gray-700">
            {chartTypes.map(({ type, icon }) => (
              <button
                key={type}
                className={`p-3 rounded-lg transition-all duration-200 border-2 text-lg flex items-center justify-center ${
                  chartData.options.chartType === type
                    ? "bg-blue-600 border-white text-white shadow-md scale-105"
                    : "bg-gray-800 border-gray-600 text-gray-400 hover:bg-gray-700 hover:border-white"
                }`}
                onClick={() => handleChartTypeChange(type)}
              >
                {icon}
              </button>
            ))}
          </div>
        </Tabs>
      </div>

      {/* 라이브러리 선택 버튼 */}
      <div className="flex justify-center mt-6">
        {["chartjs", "plotly", "d3"].map((lib) => (
          <button
            key={lib}
            onClick={() =>
              setSelectedLibrary(lib as "chartjs" | "plotly" | "d3")
            }
            className={`mx-2 px-4 py-2 rounded-lg transition ${
              selectedLibrary === lib
                ? "bg-blue-500 text-white shadow-lg"
                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
            }`}
          >
            {lib.toUpperCase()}
          </button>
        ))}
      </div>

      {/* 차트 영역 */}
      <div className="grid grid-cols-3 gap-6 p-6">
        {["chart1", "chart2", "chart3"].map((chartId) => (
          <div
            key={chartId}
            className="bg-gray-900 p-5 rounded-lg shadow-md border border-gray-700"
          >
            <ChartComponent library={selectedLibrary} data={chartData} />
          </div>
        ))}
      </div>

      <DataBindingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Dashboard4Page;
