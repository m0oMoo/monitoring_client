"use client";

import React, { useState } from "react";
import ReactGridLayout, { Layout } from "react-grid-layout";
import CustomPlotlyChart from "@/app/components/chart/customPlotlyChart";
import Tabs from "@/app/components/dashboard/tabs";
import { v4 as uuidv4 } from "uuid";

const MAX_WIDGETS = 6;

const Dashboard2 = () => {
  const [tabs, setTabs] = useState(["Dashboard 1", "Dashboard 2"]);
  const [currentTab, setCurrentTab] = useState("Dashboard 1");

  const initialLayouts: { [key: string]: Layout[] } = {
    "Dashboard 1": [],
    "Dashboard 2": [],
  };

  const [layouts, setLayouts] = useState<{ [key: string]: Layout[] }>(
    initialLayouts
  );
  const [widgets, setWidgets] = useState<{ [key: string]: any[] }>(
    initialLayouts
  );
  const [selectedType, setSelectedType] = useState<
    "line" | "bar" | "pie" | "doughnut"
  >("line");

  // 샘플 데이터
  const getChartData = (type: string) => {
    if (type === "pie" || type === "doughnut") {
      return [
        {
          labels: ["January", "February", "March", "April"],
          values: [65, 59, 80, 81],
          type: "pie",
          hole: type === "doughnut" ? 0.4 : 0, // 도넛 차트 설정
        },
      ];
    }
    return [
      {
        x: ["January", "February", "March", "April"],
        y: [65, 59, 80, 81],
        type: type,
        mode: type === "line" ? "lines" : undefined, // 선 차트 모드
        marker: { size: 10 },
      },
    ];
  };

  const chartLayout = {
    title: "Custom Chart",
    xaxis: { title: "X Axis" },
    yaxis: { title: "Y Axis" },
    showlegend: true,
  };

  const chartConfig = { responsive: true };

  // 위젯 추가
  const addWidget = () => {
    if ((widgets[currentTab] || []).length >= MAX_WIDGETS) {
      alert(`You can only add up to ${MAX_WIDGETS} widgets.`);
      return;
    }

    const id = uuidv4();
    const newWidget = {
      id,
      type: selectedType,
      data: getChartData(selectedType),
      layout: chartLayout,
      config: chartConfig,
    };

    setWidgets((prev) => ({
      ...prev,
      [currentTab]: [...(prev[currentTab] || []), newWidget],
    }));

    setLayouts((prev) => ({
      ...prev,
      [currentTab]: [
        ...(prev[currentTab] || []),
        { i: id, x: 0, y: Infinity, w: 4, h: 2 },
      ],
    }));
  };

  // 위젯 삭제
  const removeWidget = (id: string) => {
    setWidgets((prev) => ({
      ...prev,
      [currentTab]: (prev[currentTab] || []).filter(
        (widget) => widget.id !== id
      ),
    }));

    setLayouts((prev) => ({
      ...prev,
      [currentTab]: (prev[currentTab] || []).filter((item) => item.i !== id),
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Custom Dashboard</h1>
      </header>

      <div className="mb-6">
        <Tabs tabs={tabs} onSelect={setCurrentTab} />
      </div>

      <div className="flex items-center justify-center gap-4 mb-6">
        <select
          value={selectedType}
          onChange={(e) =>
            setSelectedType(
              e.target.value as "line" | "bar" | "pie" | "doughnut"
            )
          }
          className="px-4 py-2 border border-gray-300 rounded"
        >
          <option value="line">Line Chart</option>
          <option value="bar">Bar Chart</option>
          <option value="pie">Pie Chart</option>
          <option value="doughnut">Doughnut Chart</option>
        </select>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={addWidget}
        >
          Add Widget
        </button>
      </div>

      <div className="border border-gray-200">
        <ReactGridLayout
          className="layout"
          layout={layouts[currentTab]}
          cols={12}
          rowHeight={150}
          width={1500}
          onLayoutChange={(newLayout) =>
            setLayouts((prev) => ({ ...prev, [currentTab]: newLayout }))
          }
          draggableHandle=".drag-handle"
          draggableCancel=".remove-button"
          isDraggable={true}
          isResizable={true}
        >
          {widgets[currentTab]?.map((widget) => (
            <div
              key={widget.id}
              className="flex flex-col justify-between bg-white p-5 border border-gray-200 rounded-lg shadow"
            >
              <div className="flex justify-between">
                <div className="drag-handle cursor-move text-gray-500">
                  <h2 className="text-lg font-semibold">{widget.type} Chart</h2>
                </div>
                <button
                  className="remove-button text-red-500"
                  onClick={() => removeWidget(widget.id)}
                >
                  Remove
                </button>
              </div>
              <CustomPlotlyChart
                data={widget.data}
                layout={widget.layout}
                config={widget.config}
              />
            </div>
          ))}
        </ReactGridLayout>
      </div>
    </div>
  );
};

export default Dashboard2;
