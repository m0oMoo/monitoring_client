"use client";

import React, { useState, useEffect } from "react";
import { MoreVertical, Trash2, Edit2 } from "lucide-react";
import AddTabModal from "@/app/components/modal/addTabModal";
import { DEFAULT_DASHBOARD_DATA } from "@/app/data/dashboardData";
import SearchInput from "@/app/components/search/searchInput";
import Alert from "@/app/components/alert/alert";
import { useRouter } from "next/navigation";

const Dashboard2Page = () => {
  const router = useRouter();
  const [tabs, setTabs] = useState<any[]>(DEFAULT_DASHBOARD_DATA);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingTabIndex, setEditingTabIndex] = useState<number | null>(null);
  const [menuOpenIndex, setMenuOpenIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedTabIndex, setSelectedTabIndex] = useState<number | null>(1);
  const [alertMessage, setAlertMessage] = useState<string>("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredTabs = tabs.filter((tab) =>
    tab.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleTabEdit = (
    index: number,
    newName: string,
    newDescription: string
  ) => {
    const updatedTabs = [...tabs];
    updatedTabs[index].label = newName;
    updatedTabs[index].description = newDescription;
    setTabs(updatedTabs);
    setEditingTabIndex(null);
    setAlertMessage("탭이 수정되었습니다!");
  };

  const handleTabDelete = (index: number) => {
    const updatedTabs = tabs.filter((_, i) => i !== index);
    setTabs(updatedTabs);
    setAlertMessage("탭이 삭제되었습니다!");
  };

  const handleTabAdd = (newTabName: string, newTabDescription: string) => {
    setTabs([
      ...tabs,
      {
        id: `${tabs.length + 1}`,
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
                  <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md z-50">
                    <button
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingTabIndex(index);
                        setIsModalOpen(true);
                        setMenuOpenIndex(null);
                      }}
                    >
                      <Edit2 className="w-4 h-4 mr-2" /> 수정
                    </button>
                    <button
                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (window.confirm("이 탭을 삭제하시겠습니까?")) {
                          handleTabDelete(index);
                        }
                        setMenuOpenIndex(null);
                      }}
                    >
                      <Trash2 className="w-4 h-4 mr-2" /> 삭제
                    </button>
                  </div>
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

export default Dashboard2Page;
