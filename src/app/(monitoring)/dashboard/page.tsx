"use client";

import React, { useState } from "react";
import ReactGridLayout, { Layout } from "react-grid-layout";
import ChartWidget from "@/app/components/dashboard/chartWidget";
import { v4 as uuidv4 } from "uuid";
import Tabs from "@/app/components/dashboard/tabs";
import Btn from "@/app/components/button/basic/btn";
import { MdDelete } from "react-icons/md";
import SnapshotManager from "@/app/components/dashboard/snapshotManager";

const MAX_WIDGETS = 6;

const Dashboard = () => {
  const [currentTab, setCurrentTab] = useState<string>("Dashboard 1");
  const [tabs, setTabs] = useState<string[]>([
    "Dashboard 1",
    "Dashboard 2",
    "+",
  ]);
  const [layouts, setLayouts] = useState<{ [key: string]: Layout[] }>({
    "Dashboard 1": [],
  });
  const [widgets, setWidgets] = useState<{ [key: string]: any[] }>({
    "Dashboard 1": [],
  });
  const [snapshots, setSnapshots] = useState<
    { layout: Layout[]; tab: string; timestamp: string }[]
  >([]);
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
        { i: id, x: 0, y: Infinity, w: 4, h: 2 },
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

  const handleSaveSnapshot = () => {
    const timestamp = new Date().toLocaleString();
    const currentSnapshot = {
      layout: layouts[currentTab],
      tab: currentTab,
      timestamp,
    };
    setSnapshots((prev) => [...prev, currentSnapshot]);
  };

  const handleDeleteSnapshot = (index: number) => {
    setSnapshots((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRestoreSnapshot = (snapshot: Layout[]) => {
    setLayouts((prev) => ({
      ...prev,
      [currentTab]: snapshot,
    }));
  };

  const handleResizeStop = (layout: Layout[]) => {
    setLayouts((prev) => ({
      ...prev,
      [currentTab]: layout,
    }));
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
        <Btn title={"Add Widget"} onClick={addWidget} color={"gray"} />
        {/* <SnapshotManager
          layout={layouts[currentTab]}
          snapshots={snapshots}
          onSave={handleSaveSnapshot}
          onRestore={handleRestoreSnapshot}
          onDelete={handleDeleteSnapshot}
        /> */}
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
        onResizeStop={handleResizeStop}
        draggableHandle=".drag-handle"
        draggableCancel=".remove-button"
        isResizable={true}
        isDraggable={true}
      >
        {widgets[currentTab]?.map((widget) => (
          <div
            key={widget.id}
            className="flex flex-col justify-between bg-white p-5 border border-gray-200 rounded-lg shadow"
          >
            <div className="flex justify-between items-center">
              <div className="drag-handle cursor-move text-gray-500">
                <h2 className="text-lg font-semibold">{widget.type} Chart</h2>
              </div>
              <button
                className="remove-button text-gray-4 hover:text-red-5"
                onClick={() => removeWidget(widget.id)}
              >
                <MdDelete size={20} />
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
