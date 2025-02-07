"use client";

import { useEffect, useState } from "react";
import { BarChart, LineChart, PieChart } from "lucide-react";
import { TabsList } from "./components/tabs/tabsList";
import { TabsTrigger } from "./components/tabs/tabsTrigger";
import { Tabs } from "./components/tabs/tabs";
import ChartWidget from "@/app/components/dashboard/chartWidget";
import { CHART_DATA_7 } from "@/app/data/chartData";
import ReactGridLayout from "react-grid-layout";

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
    { id: "chart1", type: "bar", x: 0, y: 0, w: 3, h: 2 },
    { id: "chart2", type: "line", x: 3, y: 0, w: 3, h: 2 },
    { id: "chart3", type: "pie", x: 6, y: 0, w: 3, h: 2 },
    { id: "chart4", type: "doughnut", x: 9, y: 0, w: 3, h: 2 },
    { id: "chart5", type: "bar", x: 0, y: 2, w: 3, h: 2 },
    { id: "chart6", type: "line", x: 3, y: 2, w: 3, h: 2 },
    { id: "chart7", type: "pie", x: 6, y: 2, w: 3, h: 2 },
  ]);
  const [isClient, setIsClient] = useState(false);
  const [selectedChart, setSelectedChart] = useState("bar");

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
      <header className="mb-6">
        <h1 className="text-4xl font-bold">모니터링 대시보드</h1>
      </header>
      <div className="flex justify-between items-center mb-4">
        <Tabs
          defaultValue="dashboard1"
          className="w-full border-b border-gray-600 pb-2 flex items-center justify-between"
        >
          <TabsList className="flex space-x-2 border-b border-gray-700">
            <TabsTrigger
              value="dashboard1"
              className="pb-2 border-b-2 border-transparent text-gray-400 hover:text-white hover:border-white"
            >
              대시보드 1
            </TabsTrigger>
            <TabsTrigger
              value="dashboard2"
              className="pb-2 border-b-2 border-transparent text-gray-400 hover:text-white hover:border-white"
            >
              대시보드 2
            </TabsTrigger>
          </TabsList>
          <div className="flex space-x-2 bg-gray-800 p-2 rounded-lg shadow-lg">
            {chartTypes.map(({ type, icon }) => (
              <button
                key={type}
                className={`p-2 rounded transition-colors ${
                  selectedChart === type
                    ? "bg-gray-600 text-white"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
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
          width={window.innerWidth}
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
              className="bg-transparent p-4 flex items-center justify-center drag-handle border border-gray-700 rounded-lg h-full"
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
    </div>
  );
};

export default DesignPage;
