"use client";

import React, { useState } from "react";
import AddTabModal from "@/app/components/modal/addTabModal";
import TabsGroup from "@/app/components/tab/tabsGroup";
import { Tabs } from "@/app/components/tab/tabs";
import { DEFAULT_DASHBOARD_DATA } from "@/app/data/dashboardData";
import {
  ArrowBigDown,
  ArrowDown,
  ArrowDownUp,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

const Dashboard = () => {
  const [tabs, setTabs] = useState<any[]>(DEFAULT_DASHBOARD_DATA);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0);

  const handleAddTab = (newTabName: string, newTabDescription: string) => {
    const newTabValue = `${tabs.length + 1}`;
    setTabs([
      ...tabs,
      {
        id: newTabValue,
        label: newTabName,
        description: newTabDescription,
        content: "",
      },
    ]);
    setIsModalOpen(false);
  };

  const handleTabEdit = (index: number, newName: string) => {
    const updatedTabs = [...tabs];
    updatedTabs[index].label = newName;
    setTabs(updatedTabs);
  };

  const handleTabSelect = (index: number) => {
    setSelectedTabIndex(index);
  };

  const selectedTab = tabs[selectedTabIndex];

  return (
    <div className="bg-ivory-bg text-navy-text min-h-screen p-4 pt-[44px]">
      <header className="flex justify-between items-center my-3">
        <h1 className="text-xl font-bold tracking-wide">
          📊 모니터링 대시보드
        </h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-navy-btn py-1.5 px-2 rounded-lg text-white text-sm hover:bg-navy-btn_hover"
        >
          + 탭 추가
        </button>
      </header>

      <Tabs
        defaultValue="dashboard1"
        className="w-full flex justify-between pb-2"
      >
        <TabsGroup
          tabs={tabs}
          onTabEdit={handleTabEdit}
          onTabSelect={handleTabSelect}
        />
      </Tabs>
      <div className="w-full border-b border-0.5 border-navy-border" />
      {/* <ChevronDown /> */}

      {/* 대시보드 내용 */}
      <div className="mt-6 p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-navy-text">설명</h2>
        <p className="text-navy-text mt-2">{selectedTab.description}</p>

        <h3 className="text-xl font-semibold text-navy-text mt-6">
          대시보드 내용
        </h3>
        <p className="text-navy-text mt-2">{selectedTab.content}</p>
      </div>
      <>여기에 컨텐츠가 들어가야함.</>

      <AddTabModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddTab={handleAddTab}
      />
    </div>
  );
};

export default Dashboard;
