"use client";

import React, { useState } from "react";
import AddTabModal from "@/app/components/modal/addTabModal";
import TabsGroup from "@/app/components/tab/tabsGroup";
import { Tabs } from "@/app/components/tab/tabs";

const Dashboard = () => {
  const [tabs, setTabs] = useState([
    {
      id: "1",
      label: "📊 대시보드 1",
      description: "This is dashboard 1",
      content: "Content for Dashboard 1",
    },
    {
      id: "2",
      label: "📈 대시보드 2",
      description: "This is dashboard 2",
      content: "Content for Dashboard 2",
    },
    {
      id: "3",
      label: "🔍 대시보드 3",
      description: "This is dashboard 3",
      content: "Content for Dashboard 3",
    },
    {
      id: "4",
      label: "📉 대시보드 4",
      description: "This is dashboard 4",
      content: "Content for Dashboard 4",
    },
    {
      id: "5",
      label: "📑 대시보드 5",
      description: "This is dashboard 5",
      content: "Content for Dashboard 5",
    },
  ]);

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
    <div className="bg-[#f8f1dc] text-[#19324b] min-h-screen p-6">
      <header className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-wide mb-6">
          📊 모니터링 대시보드
        </h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#19324b] p-3 rounded-lg text-white hover:bg-[#002244]"
        >
          탭 추가
        </button>
      </header>

      {/* 탭 선택 */}
      <Tabs
        defaultValue="dashboard1"
        className="w-full flex justify-between border-b border-[#19324b] pb-2"
      >
        <TabsGroup
          tabs={tabs}
          onTabEdit={handleTabEdit}
          onTabSelect={handleTabSelect}
        />
      </Tabs>

      {/* Display Content and Description of Selected Tab */}
      <div className="mt-6 p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-[#19324b]">설명</h2>
        <p className="text-[#102841] mt-2">{selectedTab.description}</p>

        <h3 className="text-xl font-semibold text-[#19324b] mt-6">
          대시보드 내용
        </h3>
        <p className="text-[#102841] mt-2">{selectedTab.content}</p>
      </div>

      {/* 모달 */}
      <AddTabModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddTab={handleAddTab}
      />
    </div>
  );
};

export default Dashboard;
