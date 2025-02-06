"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  LifeBuoy,
  LineChart,
  PieChart,
  File,
  Save,
} from "lucide-react";
import ChartWidget from "@/app/components/dashboard/chartWidget";
import { CHART_DATA_7 } from "@/app/data/chartData";
import ReactGridLayout from "react-grid-layout";
import TabsGroup from "./components/tabs/tabsGroup";
import { Tabs } from "./components/tabs/tabs";
import DataBindingPanel from "@/app/components/drawer/dataBindingPanel";

const defaultChartData = {
  labels: ["January", "February", "March", "April"],
  datasets: [
    {
      label: "Data",
      data: [50, 40, 70, 90],
      backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
    },
  ],
};

const chartTypes = [
  { type: "bar", icon: <BarChart size={24} /> },
  { type: "line", icon: <LineChart size={24} /> },
  { type: "pie", icon: <PieChart size={24} /> },
  { type: "doughnut", icon: <LifeBuoy size={24} /> },
];

const DesignPage: React.FC = () => {
  const [charts, setCharts] = useState<
    {
      id: string;
      type: "bar" | "line" | "pie" | "doughnut";
      x: number;
      y: number;
      w: number;
      h: number;
    }[]
  >([
    { id: "chart1", type: "bar", x: 0, y: 0, w: 3, h: 4 },
    { id: "chart2", type: "line", x: 3, y: 0, w: 3, h: 2 },
    { id: "chart3", type: "pie", x: 6, y: 0, w: 3, h: 2 },
    { id: "chart4", type: "doughnut", x: 9, y: 0, w: 2, h: 2 },
    { id: "chart6", type: "line", x: 3, y: 2, w: 3, h: 3 },
  ]);
  const [isClient, setIsClient] = useState(false);
  const [selectedChart, setSelectedChart] = useState("bar");
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  const onLayoutChange = (layout: any) => {
    setCharts(
      layout.map((item: any) => ({
        id: item.i,
        type: charts.find((c) => c.id === item.i)?.type || "bar",
        x: item.x,
        y: item.y,
        w: item.w,
        h: item.h,
      }))
    );
  };

  return (
    <div className="bg-[#292929] text-white min-h-screen p-6 overflow-hidden">
      <header
        className={`flex justify-between items-center transition-all duration-300 ${
          isHeaderVisible ? "opacity-100" : "opacity-0 h-0 overflow-hidden"
        }`}
      >
        <h1 className="text-4xl font-bold">모니터링 대시보드</h1>
        <div className="flex space-x-3 p-1 rounded-lg shadow-md">
          <button className="flex gap-2 border border-gray-4 bg-gray-7 p-3 rounded-lg text-white hover:bg-gray-6">
            <Save size={20} />
            <p className="text-lg1">저장</p>
          </button>
          <button
            className="flex gap-2 bg-gray-7 p-3 rounded-lg text-white hover:bg-gray-6"
            onClick={() => setIsPanelOpen(true)}
          >
            <File size={20} />
            <p>데이터 바인딩</p>
          </button>
        </div>
      </header>
      <div
        className={`flex justify-between items-center transition-all duration-300 ${
          isHeaderVisible ? "opacity-100" : "opacity-0 h-0 overflow-hidden"
        }`}
      >
        <Tabs
          defaultValue="dashboard1"
          className="w-full items-end border-b border-gray-6 pb-2 flex justify-between"
        >
          <TabsGroup />
          <div className="flex space-x-3 bg-gray-9 p-3 rounded-lg shadow-md border border-gray-4">
            {chartTypes.map(({ type, icon }) => (
              <button
                key={type}
                className={`p-3 rounded-lg transition-all duration-200 border-2 text-lg flex items-center justify-center ${
                  selectedChart === type
                    ? "bg-gray-6 border-white text-white shadow-md scale-105"
                    : "bg-gray-7 border-gray-500 text-gray-300 hover:bg-gray-600 hover:border-white"
                }`}
                onClick={() => setSelectedChart(type)}
              >
                {icon}
              </button>
            ))}
          </div>
        </Tabs>
      </div>
      <div className="w-full h-screen">
        <ReactGridLayout
          className="layout"
          layout={charts.map((chart) => ({
            i: chart.id,
            x: chart.x,
            y: chart.y,
            w: chart.w,
            h: chart.h,
          }))}
          cols={12}
          width={window.innerWidth - 70}
          onLayoutChange={onLayoutChange}
          draggableHandle=".drag-handle"
          isResizable={true}
          isDraggable={true}
          preventCollision={false}
          resizeHandles={["se", "e", "w", "n", "s", "sw", "nw", "ne"]}
        >
          {charts.map((chart) => (
            <div
              key={chart.id}
              className="relative bg-transparent p-4 flex items-center justify-center drag-handle border border-gray-700 rounded-lg h-full"
            >
              <ChartWidget
                type={chart.type}
                data={CHART_DATA_7[chart.id] || defaultChartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { labels: { color: "#ffffff" } },
                  },
                  scales:
                    chart.type === "bar" || chart.type === "line"
                      ? {
                          x: { ticks: { color: "#ffffff" } },
                          y: { ticks: { color: "#ffffff" } },
                        }
                      : {},
                }}
              />
            </div>
          ))}
        </ReactGridLayout>
      </div>

      <DataBindingPanel
        isOpen={isPanelOpen}
        onClose={() => setIsPanelOpen(false)}
      />
    </div>
  );
};

export default DesignPage;
