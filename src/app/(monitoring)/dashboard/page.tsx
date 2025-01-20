"use client";

import React, { useState } from "react";
import ReactGridLayout, { Layout } from "react-grid-layout";
import ChartWidget from "@/app/components/dashboard/chartWidget";
import { v4 as uuidv4 } from "uuid";
import Tabs from "@/app/components/dashboard/tabs";

const MAX_WIDGETS = 6;

const Dashboard = () => {
  const [currentTab, setCurrentTab] = useState<string>("Dashboard 1");
  const [tabs, setTabs] = useState(["Dashboard 1", "Dashboard 2", "+"]);
  const [layouts, setLayouts] = useState<{ [key: string]: Layout[] }>({
    "Dashboard 1": [],
  });
  const [widgets, setWidgets] = useState<{ [key: string]: any[] }>({
    "Dashboard 1": [],
  });
  const [selectedType, setSelectedType] = useState<
    "line" | "bar" | "pie" | "doughnut"
  >("bar");

  const chartData = {
    labels: ["January", "February", "March", "April"],
    datasets: [
      {
        label: "Sales",
        data: [65, 59, 80, 81],
        backgroundColor: [
          "rgba(75,192,192,0.4)",
          "rgba(255,99,132,0.4)",
          "rgba(54,162,235,0.4)",
          "rgba(255,206,86,0.4)",
        ],
      },
    ],
  };

  const handleSelectTab = (tab: string) => {
    setCurrentTab(tab);
  };

  const handleAddTab = (newTabName: string) => {
    setTabs((prevTabs) => [...prevTabs.slice(0, -1), newTabName, "+"]);
    setLayouts((prev) => ({ ...prev, [newTabName]: [] }));
    setWidgets((prev) => ({ ...prev, [newTabName]: [] }));
    setCurrentTab(newTabName);
  };

  const handleRemoveTab = (tabName: string) => {
    if (tabName === "+") return;

    setTabs((prevTabs) => prevTabs.filter((tab) => tab !== tabName));
    setLayouts((prev) => {
      const { [tabName]: _, ...rest } = prev;
      return rest;
    });
    setWidgets((prev) => {
      const { [tabName]: _, ...rest } = prev;
      return rest;
    });

    if (currentTab === tabName) {
      const remainingTabs = tabs.filter(
        (tab) => tab !== tabName && tab !== "+"
      );
      setCurrentTab(remainingTabs[0] || "");
    }
  };

  const addWidget = () => {
    if ((widgets[currentTab] || []).length >= MAX_WIDGETS) {
      alert(`You can only add up to ${MAX_WIDGETS} widgets.`);
      return;
    }

    const id = uuidv4();
    const newWidget = {
      id,
      type: selectedType,
      data: chartData,
    };

    setWidgets((prev) => ({
      ...prev,
      [currentTab]: [...(prev[currentTab] || []), newWidget],
    }));

    setLayouts((prev) => ({
      ...prev,
      [currentTab]: [
        ...(prev[currentTab] || []),
        { i: id, x: 0, y: Infinity, w: 4, h: 2 }, // 초기 크기 설정
      ],
    }));
  };

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

  const handleResizeStop = (layout: Layout[]) => {
    setLayouts((prev) => ({
      ...prev,
      [currentTab]: layout,
    }));
    console.log("Updated layout after resizing:", layout);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Custom Dashboard</h1>
      </header>
      <div className="mb-6">
        <Tabs
          tabs={tabs}
          onSelect={handleSelectTab}
          onAddTab={handleAddTab}
          onRemoveTab={handleRemoveTab}
        />
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

      <ReactGridLayout
        className="layout"
        layout={layouts[currentTab]}
        cols={12}
        rowHeight={150}
        width={1500}
        onLayoutChange={(newLayout) =>
          setLayouts((prev) => ({ ...prev, [currentTab]: newLayout }))
        }
        onResizeStop={handleResizeStop} // 크기 조절 이벤트
        draggableHandle=".drag-handle"
        draggableCancel=".remove-button"
        isResizable={true} // 크기 조절 활성화
        isDraggable={true}
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
            <ChartWidget type={widget.type} data={widget.data} />
          </div>
        ))}
      </ReactGridLayout>
    </div>
  );
};

export default Dashboard;
