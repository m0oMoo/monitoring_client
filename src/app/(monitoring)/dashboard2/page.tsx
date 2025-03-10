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
    dashboardChartMap,
    addChartToDashboard,
    updateDashboard,
  } = useDashboardStore();
  const { charts, addChart } = useChartStore();
  const { widgets, cloneWidget } = useWidgetStore();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingTabIndex, setEditingTabIndex] = useState<string | null>(null);
  const [menuOpenIndex, setMenuOpenIndex] = useState<number | null>(null);
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

  // ✅ 대시보드 추가
  const handleTabAdd = (newTabName: string, newTabDescription: string) => {
    addDashboard({
      id: uuidv4(),
      label: newTabName,
      description: newTabDescription,
    });
    setIsModalOpen(false);
    setAlertMessage("새로운 탭이 추가되었습니다!");
  };

  // ✅ 대시보드 수정
  const handleTabEdit = (
    id: string,
    newName: string,
    newDescription: string
  ) => {
    updateDashboard(id, newName, newDescription);
    setEditingTabIndex(null);
    setAlertMessage("탭이 수정되었습니다!");
  };

  // ✅ 대시보드 삭제
  const handleTabDelete = (dashboardId: string) => {
    removeDashboard(dashboardId);
    setMenuOpenIndex(null);
    setIsModalOpen(false);
    setAlertMessage("대시보드가 삭제되었습니다!");
  };

  // ✅ 대시보드 복제 (차트 포함)
  const handleTabClone = (
    dashboardId: string,
    label: string,
    description: string
  ) => {
    const newDashboardId = uuidv4();
    const newLabel = `${label}_copy`;

    addDashboard({ id: newDashboardId, label: newLabel, description });

    // ✅ 기존 차트 복제
    const chartsToClone = dashboardChartMap[dashboardId] || [];
    const newChartIds: string[] = [];

    chartsToClone.forEach((chartId) => {
      const existingChart = Object.values(charts)
        .flat()
        .find((chart) => chart.chartId === chartId);

      if (existingChart) {
        const newChartId = uuidv4();
        const clonedChartOptions = { ...existingChart.chartOptions };
        const clonedDatasets = existingChart.datasets.map((dataset) => ({
          ...dataset,
        }));

        addChart(newDashboardId, clonedChartOptions, clonedDatasets);
        addChartToDashboard(newDashboardId, newChartId);
        newChartIds.push(newChartId);
      }
    });

    // ✅ 기존 대시보드의 위젯 복제
    const widgetsToClone = widgets[dashboardId] || [];
    const newWidgetIds: string[] = [];

    widgetsToClone.forEach((widget) => {
      const newWidgetId = uuidv4();
      const clonedWidgetOptions = {
        ...widget.widgetOptions,
        widgetId: newWidgetId,
      };

      useWidgetStore.getState().addWidget(newDashboardId, clonedWidgetOptions);
      newWidgetIds.push(newWidgetId);
    });

    console.log("📌 새로운 대시보드 ID:", newDashboardId);
    console.log("📌 복제된 차트 ID 리스트:", newChartIds);
    console.log("📌 복제된 위젯 ID 리스트:", newWidgetIds);

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
                    e.stopPropagation();
                    setMenuOpenIndex(menuOpenIndex === index ? null : index);
                  }}
                />
                {menuOpenIndex === index && (
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
