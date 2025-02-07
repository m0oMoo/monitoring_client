"use client";

import { useState } from "react";
import { Moon, Sun } from "lucide-react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import SortableItem from "../components/item/sortableItem";
import Button from "../components/button/button";
import Card from "../components/card/card";

const DesignPage: React.FC = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [charts, setCharts] = useState(["차트 1", "차트 2", "차트 3"]);
  const [selectedChart, setSelectedChart] = useState("바 차트");
  const chartTypes = ["바 차트", "라인 차트", "파이 차트"];

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setCharts((charts) => {
        const oldIndex = charts.indexOf(active.id);
        const newIndex = charts.indexOf(over.id);
        return arrayMove(charts, oldIndex, newIndex);
      });
    }
  };

  return (
    <div
      className={
        darkMode
          ? "bg-gray-950 text-white min-h-screen p-6 flex"
          : "bg-white text-black min-h-screen p-6 flex"
      }
    >
      <div className="flex-1">
        <div className="flex justify-end mb-4">
          <Button onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </Button>
        </div>

        <header className="mb-6">
          <h1 className="text-2xl font-bold">모니터링 대시보드</h1>
          <p className="text-gray-400">
            차트를 선택하고 드래그하여 이동할 수 있습니다.
          </p>
        </header>

        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={charts}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-4">
              {charts.map((chart) => (
                <SortableItem key={chart} id={chart}>
                  <Card>{chart}</Card>
                </SortableItem>
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>

      <aside className="w-64 p-4 bg-gray-700 rounded-lg ml-6">
        <h2 className="text-lg font-bold mb-4">차트 유형 선택</h2>
        <ul>
          {chartTypes.map((type) => (
            <li
              key={type}
              className={`p-2 cursor-pointer rounded ${
                selectedChart === type ? "bg-gray-7" : "hover:bg-gray-7"
              }`}
              onClick={() => setSelectedChart(type)}
            >
              {type}
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
};

export default DesignPage;
