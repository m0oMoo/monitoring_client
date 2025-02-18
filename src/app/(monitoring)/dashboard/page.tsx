"use client";

import React, { useState } from "react";
import AddTabModal from "@/app/components/modal/addTabModal";
import TabsGroup from "@/app/components/tab/tabsGroup";
import { Tabs } from "@/app/components/tab/tabs";

const Dashboard = () => {
  const [tabs, setTabs] = useState([
    { value: "dashboard1", label: "📊 대시보드 1" },
    { value: "dashboard2", label: "📈 대시보드 2" },
    { value: "dashboard3", label: "🔍 대시보드 3" },
    { value: "dashboard4", label: "📉 대시보드 4" },
    { value: "dashboard5", label: "📑 대시보드 5" },
  ]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleAddTab = (newTabName: string) => {
    const newTabValue = `dashboard${tabs.length + 1}`;
    setTabs([...tabs, { value: newTabValue, label: newTabName }]);
    setIsModalOpen(false);
  };

  const handleTabEdit = (index: number, newName: string) => {
    const updatedTabs = [...tabs];
    updatedTabs[index].label = newName;
    setTabs(updatedTabs);
  };

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
        <TabsGroup tabs={tabs} onTabEdit={handleTabEdit} />
      </Tabs>

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
