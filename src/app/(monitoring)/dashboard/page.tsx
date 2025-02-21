"use client";

import React, { useState } from "react";
import AddTabModal from "@/app/components/modal/addTabModal";
import TabsGroup from "@/app/components/tab/tabsGroup";
import { Tabs } from "@/app/components/tab/tabs";
import { DEFAULT_DASHBOARD_DATA } from "@/app/data/dashboardData";
import SearchInput from "@/app/components/search/searchInput";

const Dashboard = () => {
  const [tabs, setTabs] = useState<any[]>(DEFAULT_DASHBOARD_DATA);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [editingTabIndex, setEditingTabIndex] = useState<number | null>(null);

  // 검색 처리 함수
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  // 필터링된 탭 목록
  const filteredTabs = tabs.filter((tab) =>
    tab.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // 탭 추가
  const handleTabAdd = (newTabName: string, newTabDescription: string) => {
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

  // 탭 수정
  const handleTabEdit = (index: number, newName: string) => {
    const updatedTabs = [...tabs];
    updatedTabs[index].label = newName;
    setTabs(updatedTabs);
  };

  // 탭 선택
  const handleTabSelect = (index: number) => {
    setSelectedTabIndex(index);
  };

  // 선택된 탭
  const selectedTab = tabs[selectedTabIndex];

  return (
    <div className="bg-ivory-bg_sub text-navy-text min-h-screen p-4 pt-[44px]">
      <header className="flex justify-between items-center my-3">
        <h1 className="text-xl font-bold tracking-wide">
          📊 모니터링 대시보드
        </h1>
        <SearchInput
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
        />
      </header>

      <button
        onClick={() => setIsModalOpen(true)}
        className="flex bg-navy-btn py-1.5 px-2 rounded-lg text-white text-sm hover:bg-navy-btn_hover mb-4 justify-self-end"
      >
        + 항목 추가
      </button>

      {/* Tabs 컴포넌트 */}
      <Tabs
        defaultValue="dashboard1"
        className="w-full flex justify-between pb-2"
      >
        <TabsGroup
          tabs={filteredTabs}
          onTabEdit={handleTabEdit}
          onTabSelect={handleTabSelect}
        />
      </Tabs>

      <div className="w-full mb-2 border-b border-0.5 border-navy-border" />

      {/* 대시보드 내용 */}
      <div className="mt-6 p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-navy-text">설명</h2>
        <p className="text-navy-text mt-2">{selectedTab.description}</p>

        <h3 className="text-xl font-semibold text-navy-text mt-6">
          대시보드 내용
        </h3>
        <p className="text-navy-text mt-2">{selectedTab.content}</p>
      </div>

      <AddTabModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddTab={handleTabAdd}
        initialTabName={
          editingTabIndex !== null ? tabs[editingTabIndex].label : ""
        }
        initialTabDescription={
          editingTabIndex !== null ? tabs[editingTabIndex].description : ""
        }
        onEditTab={handleTabEdit}
        editingIndex={editingTabIndex}
      />
    </div>
  );
};

export default Dashboard;
