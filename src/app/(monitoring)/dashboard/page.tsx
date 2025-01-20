"use client";

import React, { useState } from "react";
import ReactGridLayout, { Layout } from "react-grid-layout";
import ChartWidget from "@/app/components/dashboard/chartWidget";
import Tabs from "@/app/components/dashboard/tabs";
import { v4 as uuidv4 } from "uuid";

const Dashboard = () => {
  const [tabs, setTabs] = useState(["Dashboard 1", "Dashboard 2"]);
  const [currentTab, setCurrentTab] = useState("Dashboard 1");

  const initialLayouts: { [key: string]: Layout[] } = {
    "Dashboard 1": [],
    "Dashboard 2": [],
  };

  const [layouts, setLayouts] = useState<{ [key: string]: Layout[] }>(
    initialLayouts
  );
  const [widgets, setWidgets] = useState<{ [key: string]: any[] }>({
    "Dashboard 1": [],
    "Dashboard 2": [],
  });

  const [selectedType, setSelectedType] = useState<
    "bar" | "line" | "pie" | "doughnut"
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

  // 위젯 추가
  const addWidget = () => {
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

  // 스냅샷 저장
  const saveSnapshot = () => {
    const snapshot = layouts[currentTab] || [];
    const savedSnapshots = JSON.parse(
      localStorage.getItem("snapshots") || "{}"
    );
    savedSnapshots[currentTab] = snapshot;

    localStorage.setItem("snapshots", JSON.stringify(savedSnapshots));
    alert(`Snapshot saved for ${currentTab}`);
  };

  // 스냅샷 복원
  const restoreSnapshot = () => {
    const savedSnapshots = JSON.parse(
      localStorage.getItem("snapshots") || "{}"
    );
    const snapshot = savedSnapshots[currentTab];

    if (snapshot) {
      setLayouts((prev) => ({
        ...prev,
        [currentTab]: snapshot,
      }));
      alert(`Snapshot restored for ${currentTab}`);
    } else {
      alert(`No snapshot found for ${currentTab}`);
    }
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
              e.target.value as "bar" | "line" | "pie" | "doughnut"
            )
          }
          className="px-4 py-2 border border-gray-300 rounded"
        >
          <option value="bar">Bar Chart</option>
          <option value="line">Line Chart</option>
          <option value="pie">Pie Chart</option>
          <option value="doughnut">Doughnut Chart</option>
        </select>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={addWidget}
        >
          Add Widget
        </button>
        <button
          className="px-4 py-2 bg-green-500 text-white rounded"
          onClick={saveSnapshot}
        >
          Save Snapshot
        </button>
        <button
          className="px-4 py-2 bg-yellow-500 text-white rounded"
          onClick={restoreSnapshot}
        >
          Restore Snapshot
        </button>
      </div>

      <ReactGridLayout
        className="layout"
        layout={layouts[currentTab]}
        cols={12}
        rowHeight={100}
        width={1200}
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
            className="bg-white p-4 border border-gray-200 rounded-lg shadow"
          >
            <div className="flex justify-between items-center mb-2">
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
