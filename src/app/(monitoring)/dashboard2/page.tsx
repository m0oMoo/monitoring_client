"use client";

import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { MoreVertical } from "lucide-react";
import AddTabModal from "@/app/components/modal/addTabModal";
import SearchInput from "@/app/components/search/searchInput";
import Alert from "@/app/components/alert/alert";
import { useRouter } from "next/navigation";
import TabMenu from "@/app/components/menu/tabMenu";
import { useDashboardStore } from "@/app/store/useDashboardStore";
import { useChartStore } from "@/app/store/useChartStore";
import { useWidgetStore } from "@/app/store/useWidgetStore";

const Dashboard2Page = () => {
  const router = useRouter();
  const {
    dashboardList,
    addDashboard,
    removeDashboard,
    dashboardPanels,
    addPanelToDashboard,
    updateDashboard,
  } = useDashboardStore();
  const { charts, addChart } = useChartStore();
  const { widgets, addWidget } = useWidgetStore();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingTabIndex, setEditingTabIndex] = useState<string | null>(null);
  const [menuOpenIndex, setMenuOpenIndex] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [alertMessage, setAlertMessage] = useState<string>("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredTabs = dashboardList.filter(
    (tab) =>
      typeof tab.label === "string" &&
      tab.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // 대시보드 추가
  const handleTabAdd = (newTabName: string, newTabDescription: string) => {
    addDashboard({
      id: uuidv4(),
      label: newTabName,
      description: newTabDescription,
    });
    setIsModalOpen(false);
    setAlertMessage("새로운 탭이 추가되었습니다!");
  };

  // 대시보드 수정
  const handleTabEdit = (
    id: string,
    newName: string,
    newDescription: string
  ) => {
    updateDashboard(id, newName, newDescription);
    setEditingTabIndex(null);
    setAlertMessage("탭이 수정되었습니다!");
  };

  // 대시보드 삭제
  const handleTabDelete = (dashboardId: string) => {
    removeDashboard(dashboardId);
    setMenuOpenIndex(null);
    setIsModalOpen(false);
    setAlertMessage("대시보드가 삭제되었습니다!");
  };

  // 대시보드 복제 (차트 & 위젯 포함)
  const handleTabClone = (
    dashboardId: string,
    label: string,
    description: string
  ) => {
    const newDashboardId = uuidv4();
    const newLabel = `${label}_copy`;

    // 새 대시보드 추가
    addDashboard({ id: newDashboardId, label: newLabel, description });

    // 기존 대시보드의 패널 리스트 가져오기
    const panelsToClone = dashboardPanels[dashboardId] || [];

    panelsToClone.forEach((panel) => {
      const { panelId, type } = panel;

      if (type === "chart") {
        // 기존 차트 복제
        const existingChart = Object.values(charts)
          .flat()
          .find((chart) => chart.chartId === panelId);

        if (existingChart) {
          const newChartId = uuidv4();
          const clonedChartOptions = { ...existingChart.chartOptions };
          const clonedDatasets = existingChart.datasets.map((dataset) => ({
            ...dataset,
          }));

          addChart(newDashboardId, clonedChartOptions, clonedDatasets); // 차트 추가
          addPanelToDashboard(newDashboardId, newChartId, "chart"); // 패널에도 등록
        }
      }

      if (type === "widget") {
        // 기존 위젯 복제
        const existingWidget = Object.values(widgets)
          .flat()
          .find((widget) => widget.widgetId === panelId);

        if (existingWidget) {
          const newWidgetId = uuidv4();
          const clonedWidgetOptions = {
            ...existingWidget.widgetOptions,
            widgetId: newWidgetId,
          };

          addWidget(newDashboardId, clonedWidgetOptions); // 위젯 추가
          addPanelToDashboard(newDashboardId, newWidgetId, "widget"); // 패널에도 등록
        }
      }
    });

    setAlertMessage("대시보드가 복제되었습니다!");
  };

  const handleTabClick = (tab: any) => {
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
      {alertMessage && <Alert message={alertMessage} />}
      <div className="w-full mb-2 border-b border-0.5 border-navy-border" />
      <ul className="space-y-2">
        {filteredTabs.map((tab, index) => (
          <li
            key={tab.id}
            onClick={() => handleTabClick(tab)}
            className="relative p-4 cursor-pointer rounded-md hover:bg-navy-hover active:bg-navy-pressed"
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
                    e.stopPropagation(); // 메뉴 클릭 유지
                    setMenuOpenIndex(menuOpenIndex === tab.id ? null : tab.id);
                  }}
                />
                {menuOpenIndex === tab.id && (
                  <TabMenu
                    index={tab.id}
                    setEditingTabIndex={() => setEditingTabIndex(tab.id)}
                    setIsModalOpen={() => setIsModalOpen(true)}
                    setMenuOpenIndex={() => setMenuOpenIndex(null)}
                    handleTabDelete={() => handleTabDelete(tab.id)}
                    handleTabClone={() =>
                      handleTabClone(tab.id, tab.label, tab.description)
                    }
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
        initialTabName=""
        initialTabDescription=""
        onEditTab={handleTabEdit}
        editingIndex={editingTabIndex}
      />
    </div>
  );
};

export default Dashboard2Page;
