"use client";

import React, { useState, useEffect } from "react";
import { useChartStore } from "@/app/store/useChartStore";
import { useDashboardStore } from "@/app/store/useDashboardStore";
import { useRouter, useSearchParams } from "next/navigation";
import AddChartBar from "@/app/components/bar/addChartBar";
import TimeRangeBar from "@/app/components/bar/timeRangeBar";
import ChartWidget from "@/app/components/dashboard/chartWidget";
import CommonWidget from "@/app/components/dashboard/commonWidget";
import CustomTable from "@/app/components/table/customTable";
import TabMenu from "@/app/components/menu/tabMenu";
import { MoreVertical } from "lucide-react";
import { useWidgetStore } from "@/app/store/useWidgetStore";
import { Dataset } from "@/app/context/chartOptionContext";
import { v4 as uuidv4 } from "uuid";
import Alert from "@/app/components/alert/alert";

const DetailDashboard = () => {
  const router = useRouter();
  const id = useSearchParams();
  const dashboardId = id.get("id") || "1";

  const { charts, addChart, removeChart } = useChartStore();
  const { widgets, removeWidget } = useWidgetStore();
  const { dashboardChartMap, addChartToDashboard, dashboardList } =
    useDashboardStore();

  const chartIds = dashboardChartMap[dashboardId] || [];
  console.log("📌 현재 대시보드의 차트 ID 리스트:", chartIds);

  const chartDataList = chartIds
    .map((chartId) =>
      charts[dashboardId]?.find((chart) => chart.chartId === chartId)
    )
    .filter(Boolean);
  console.log("📌 차트 데이터 리스트:", chartDataList);

  const widgetDataList = chartIds
    .map((widgetId) =>
      widgets[dashboardId]?.find((widget) => widget.widgetId === widgetId)
    )
    .filter(Boolean);
  console.log("📌 위젯 데이터 리스트:", widgetDataList);

  const combinedDataList = [...chartDataList, ...widgetDataList];
  console.log("📌 최종 렌더링할 데이터 리스트:", combinedDataList);

  const [from, setFrom] = useState<string | null>(null);
  const [to, setTo] = useState<string | null>(null);
  const [refreshTime, setRefreshTime] = useState<number | "autoType">(10);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [menuOpenIndex, setMenuOpenIndex] = useState<string | null>(null);
  const [gridCols, setGridCols] = useState<number>(2);
  const [isCloneModalOpen, setIsCloneModalOpen] = useState(false);
  const [selectedDashboard, setSelectedDashboard] = useState<string | null>(
    null
  );
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const openCloneModal = () => {
    setIsCloneModalOpen(true);
  };

  const closeCloneModal = () => {
    setIsCloneModalOpen(false);
    setSelectedDashboard(null);
  };

  const handleTabClone = (itemId: string) => {
    setSelectedItem(itemId);
    setIsCloneModalOpen(true);
  };

  const confirmClone = () => {
    if (!selectedDashboard || !selectedItem) return;

    const targetDashboardId = selectedDashboard;
    let newItemId: string | null = null;

    // ✅ 차트 복제
    const existingChart = Object.values(charts)
      .flat()
      .find((chart) => chart.chartId === selectedItem);

    if (existingChart) {
      const newChartId = uuidv4();
      const clonedChartOptions = { ...existingChart.chartOptions };
      const clonedDatasets = existingChart.datasets.map((dataset) => ({
        ...dataset,
      }));

      addChart(targetDashboardId, clonedChartOptions, clonedDatasets);
      addChartToDashboard(targetDashboardId, newChartId);
      newItemId = newChartId;
    }

    // ✅ 위젯 복제
    const existingWidget = Object.values(widgets)
      .flat()
      .find((widget) => widget.widgetId === selectedItem);

    if (existingWidget) {
      const newWidgetId = uuidv4();
      const clonedWidgetOptions = {
        ...existingWidget.widgetOptions,
        widgetId: newWidgetId, // 새로운 ID 적용
      };

      useWidgetStore
        .getState()
        .addWidget(targetDashboardId, clonedWidgetOptions);
      newItemId = newWidgetId;
    }

    if (newItemId) {
      setAlertMessage("선택한 차트/위젯이 복제되었습니다!");
    } else {
      setAlertMessage("복제할 항목이 없습니다.");
    }

    closeCloneModal();
  };

  useEffect(() => {
    const now = new Date();
    setFrom(now.toISOString().slice(0, 16));
    setTo(now.toISOString().slice(0, 16));
    setLastUpdated(now.toLocaleTimeString());
  }, []);

  useEffect(() => {
    if (refreshTime !== "autoType") {
      const interval = setInterval(() => {
        setLastUpdated(new Date().toLocaleTimeString());
      }, refreshTime * 1000);
      return () => clearInterval(interval);
    }
  }, [refreshTime]);

  const handleGridChange = (change: number) => {
    setGridCols((prev) => Math.max(1, Math.min(4, prev + change)));
  };

  // 🔹 차트 데이터를 테이블 형식으로 변환하는 함수
  const convertToTableData = (datasets: Dataset[]) => {
    if (!datasets || datasets.length === 0) return { headers: [], rows: [] };

    // 🔹 데이터셋의 라벨을 컬럼명으로 사용
    const headers = ["항목", ...datasets.map((dataset) => dataset.label)];

    // 🔹 각 데이터 포인트를 행으로 변환
    const rows = datasets[0].data.map((_, index) => ({
      name: `Point ${index + 1}`,
      ...datasets.reduce((acc, dataset) => {
        acc[dataset.label] = dataset.data[index]; // label을 key로 사용
        return acc;
      }, {} as Record<string, any>),
    }));

    return { headers, rows };
  };

  return (
    <div
      className="bg-ivory-bg_sub min-h-[calc(100vh-90px)]"
      onClick={() => setMenuOpenIndex(null)}
    >
      <AddChartBar
        isEdit={false}
        onCreateClick={() => router.push(`/d?id=${dashboardId}`)}
        gridCols={gridCols}
        onGridChange={handleGridChange}
        gridVisible={true}
      />
      <TimeRangeBar
        from={from}
        to={to}
        lastUpdated={lastUpdated}
        refreshTime={refreshTime}
        onChange={(type, value) =>
          type === "from" ? setFrom(value) : setTo(value)
        }
        onRefreshChange={setRefreshTime}
      />

      <div
        className={`grid 
                  ${gridCols === 1 ? "grid-cols-1" : ""} 
                  ${gridCols === 2 ? "grid-cols-2" : ""} 
                  ${gridCols === 3 ? "grid-cols-3" : ""} 
                  ${gridCols === 4 ? "grid-cols-4" : ""} 
                  gap-6 p-4`}
      >
        {combinedDataList.length > 0
          ? combinedDataList.map((item, index) =>
              item ? (
                <div
                  key={"chartId" in item ? item.chartId : item.widgetId}
                  className="relative flex justify-center"
                >
                  <div
                    className={`relative flex flex-col items-center ${
                      "chartOptions" in item
                        ? item.chartOptions.displayMode === "chart"
                          ? "h-[450px]"
                          : "h-[450px]"
                        : "h-[230px] max-w-[350px]"
                    } w-full`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* 🔹 탭 메뉴 위치 조정 */}
                    <div className="absolute top-2 right-2 z-10">
                      <MoreVertical
                        className="text-text3 cursor-pointer hover:text-text2"
                        onClick={(e) => {
                          e.stopPropagation();
                          setMenuOpenIndex(
                            menuOpenIndex ===
                              ("chartId" in item ? item.chartId : item.widgetId)
                              ? null
                              : "chartId" in item
                              ? item.chartId
                              : item.widgetId
                          );
                        }}
                      />
                      {menuOpenIndex ===
                        ("chartId" in item ? item.chartId : item.widgetId) && (
                        <TabMenu
                          index={
                            "chartId" in item ? item.chartId : item.widgetId
                          }
                          setEditingTabIndex={() =>
                            router.push(
                              `/d?id=${dashboardId}&chartId=${
                                "chartId" in item ? item.chartId : item.widgetId
                              }`
                            )
                          }
                          setIsModalOpen={() => {}}
                          setMenuOpenIndex={setMenuOpenIndex}
                          handleTabDelete={() =>
                            "chartId" in item
                              ? removeChart(dashboardId, item.chartId)
                              : removeWidget(dashboardId, item.widgetId)
                          }
                          handleTabClone={handleTabClone}
                        />
                      )}
                    </div>

                    {/* 🔹 displayMode에 따라 차트 또는 테이블 렌더링 */}
                    {"chartOptions" in item ? (
                      item.chartOptions.displayMode === "chart" ? (
                        <ChartWidget
                          type={item.chartOptions.chartType}
                          datasets={item.datasets || []}
                          options={item.chartOptions}
                        />
                      ) : (
                        <CustomTable
                          columns={[
                            { key: "name", label: "ID" },
                            ...item.datasets.map((dataset) => ({
                              key: dataset.label,
                              label: dataset.label,
                            })),
                          ]}
                          data={convertToTableData(item.datasets).rows}
                          title={item.chartOptions.titleText}
                        />
                      )
                    ) : "widgetOptions" in item ? (
                      <div className="w-full flex justify-center">
                        <CommonWidget
                          widgetType={item.widgetOptions.widgetType}
                          widgetData={item.widgetOptions.widgetData}
                          label={item.widgetOptions.label}
                          maxValue={item.widgetOptions.maxValue}
                          thresholds={item.widgetOptions.thresholds}
                          colors={item.widgetOptions.colors}
                          subText={item.widgetOptions.subText}
                          changePercent={item.widgetOptions.changePercent}
                          backgroundColor={
                            item.widgetOptions.widgetBackgroundColor
                          }
                          textColor={item.widgetOptions.textColor}
                          unit={item.widgetOptions.unit}
                          arrowVisible={item.widgetOptions.arrowVisible}
                          className="scale-[1] max-w-[300px]"
                        />
                      </div>
                    ) : null}
                  </div>
                </div>
              ) : null
            )
          : null}
      </div>
      {isCloneModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">대시보드 선택</h2>
            <ul>
              {dashboardList.map((dashboard) => (
                <li
                  key={dashboard.id}
                  onClick={() => setSelectedDashboard(dashboard.id)}
                  className={`cursor-pointer p-2 rounded ${
                    selectedDashboard === dashboard.id
                      ? "bg-blue-500 text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {dashboard.label}
                </li>
              ))}
            </ul>
            <div className="flex justify-end mt-4">
              <button
                onClick={closeCloneModal}
                className="mr-2 px-4 py-2 bg-gray-200 rounded"
              >
                취소
              </button>
              <button
                onClick={confirmClone}
                disabled={!selectedDashboard}
                className={`px-4 py-2 rounded ${
                  selectedDashboard
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}
      {alertMessage && <Alert message={alertMessage} />}
    </div>
  );
};

export default DetailDashboard;
