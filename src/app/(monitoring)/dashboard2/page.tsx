"use client";

import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { MoreVertical, Trash2, Edit2 } from "lucide-react";
import AddTabModal from "@/app/components/modal/addTabModal";
import { DEFAULT_DASHBOARD_DATA } from "@/app/data/dashboardData";
import SearchInput from "@/app/components/search/searchInput";
import Alert from "@/app/components/alert/alert";
import { useRouter } from "next/navigation";
import TabMenu from "@/app/components/menu/tabMenu";
import { useChartStore } from "@/app/store/useChartStore";

const Dashboard2Page = () => {
  const router = useRouter();
  const [tabs, setTabs] = useState<any[]>(DEFAULT_DASHBOARD_DATA);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingTabIndex, setEditingTabIndex] = useState<string | null>(null);
  const [menuOpenIndex, setMenuOpenIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedTabIndex, setSelectedTabIndex] = useState<number | null>(null);
  const [alertMessage, setAlertMessage] = useState<string>("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredTabs = tabs.filter((tab) =>
    tab.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleTabEdit = (
    id: string,
    newName: string,
    newDescription: string
  ) => {
    const updatedTabs = tabs.map((tab) =>
      tab.id === id
        ? { ...tab, label: newName, description: newDescription }
        : tab
    );
    setTabs(updatedTabs);
    setEditingTabIndex(null);
    setAlertMessage("탭이 수정되었습니다!");
  };

  const handleTabDelete = (dashboardId: string) => {
    // ✅ 해당 대시보드의 모든 차트 삭제
    useChartStore.getState().removeDashboard(dashboardId);

    // ✅ 대시보드 목록에서 삭제
    const updatedTabs = tabs.filter((tab) => tab.id !== dashboardId);
    setTabs(updatedTabs);

    // ✅ 상태 초기화
    setMenuOpenIndex(null);
    setIsModalOpen(false);
    setSelectedTabIndex(null);
    setAlertMessage("대시보드가 삭제되었습니다!");
  };

  const handleTabAdd = (newTabName: string, newTabDescription: string) => {
    setTabs([
      ...tabs,
      {
        id: uuidv4(),
        label: newTabName,
        description: newTabDescription,
        content: "",
      },
    ]);
    setIsModalOpen(false);
    setAlertMessage("새로운 탭이 추가되었습니다!");
  };

  const handleTabClick = (tab: any) => {
    console.log(tab);
    // router.push(`/d?id=${tab.id}`);
    router.push(`/detail?id=${tab.id}`);
  };

  useEffect(() => {
    if (alertMessage) {
      const timer = setTimeout(() => {
        setAlertMessage("");
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [alertMessage]);

  return (
    <div
      className="bg-ivory-bg_sub text-navy-text min-h-screen p-4 pt-[44px]"
      onClick={() => setMenuOpenIndex(null)}
    >
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

      {/* 알림 메시지 표시 */}
      {alertMessage && <Alert message={alertMessage} />}

      <div className="w-full mb-2 border-b border-0.5 border-navy-border" />
      <ul className="space-y-2">
        {filteredTabs.map((tab, index) => (
          <li
            key={tab.id}
            onClick={() => handleTabClick(tab)}
            className={`relative p-4 cursor-pointer rounded-md hover:bg-navy-hover active:bg-navy-pressed 
              ${
                selectedTabIndex === index
                  ? "bg-navy-selected_bg hover:bg-navy-selected_bg"
                  : ""
              }`}
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{tab.label}</h3>
                <p className="text-sm text-gray-500">{tab.description}</p>
              </div>
              <div className="relative">
                <MoreVertical
                  className="text-text3 cursor-pointer hover:text-text2"
                  onClick={(e) => {
                    e.stopPropagation();
                    setMenuOpenIndex(menuOpenIndex === index ? null : index);
                  }}
                />
                {menuOpenIndex === index && (
                  <TabMenu
                    index={tab.id}
                    setEditingTabIndex={() => {
                      setEditingTabIndex(tab.id);
                    }}
                    setIsModalOpen={() => {
                      setIsModalOpen(true);
                    }}
                    setMenuOpenIndex={() => {
                      setMenuOpenIndex(null);
                    }}
                    handleTabDelete={() => {
                      handleTabDelete(tab.id);
                    }}
                  />
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>

      <AddTabModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddTab={handleTabAdd}
        initialTabName={
          editingTabIndex !== null
            ? tabs.find((tab) => tab.id === editingTabIndex)?.label || ""
            : ""
        }
        initialTabDescription={
          editingTabIndex !== null
            ? tabs.find((tab) => tab.id === editingTabIndex)?.description || ""
            : ""
        }
        onEditTab={handleTabEdit}
        editingIndex={editingTabIndex}
      />
    </div>
  );
};

export default Dashboard2Page;
