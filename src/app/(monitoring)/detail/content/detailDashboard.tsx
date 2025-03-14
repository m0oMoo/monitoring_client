"use client";

import React, { useState, useEffect } from "react";
import { Chart, useChartStore } from "@/app/store/useChartStore";
import { useDashboardStore } from "@/app/store/useDashboardStore";
import { useRouter, useSearchParams } from "next/navigation";
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import AddChartBar from "@/app/components/bar/addChartBar";
import TimeRangeBar from "@/app/components/bar/timeRangeBar";
import ChartWidget from "@/app/components/dashboard/chartWidget";
import CommonWidget from "@/app/components/dashboard/commonWidget";
import CustomTable from "@/app/components/table/customTable";
import TabMenu from "@/app/components/menu/tabMenu";
import { MoreVertical } from "lucide-react";
import { useWidgetStore, Widget } from "@/app/store/useWidgetStore";
import { Dataset } from "@/app/context/chartOptionContext";
import { v4 as uuidv4 } from "uuid";
import Alert from "@/app/components/alert/alert";

const ResponsiveGridLayout = WidthProvider(Responsive);

const DetailDashboard = () => {
  const router = useRouter();
  const id = useSearchParams();
  const dashboardId = id.get("id") || "1";

  const { charts, addChart, removeChart } = useChartStore();
  const { widgets, addWidget, removeWidget } = useWidgetStore();
  const { dashboardChartMap, addChartToDashboard, dashboardList } =
    useDashboardStore();

  const chartIds = dashboardChartMap[dashboardId] || [];
  const [from, setFrom] = useState<string | null>(null);
  const [to, setTo] = useState<string | null>(null);
  const [refreshTime, setRefreshTime] = useState<number | "autoType">(10);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [menuOpenIndex, setMenuOpenIndex] = useState<string | null>(null);
  const [isCloneModalOpen, setIsCloneModalOpen] = useState(false);
  const [selectedDashboard, setSelectedDashboard] = useState<string | null>(
    null
  );
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [alertMessage, setAlertMessage] = useState<string>("");

  const chartDataList = chartIds
    .map((chartId) =>
      charts[dashboardId]?.find((chart) => chart?.chartId === chartId)
    )
    .filter((chart): chart is Chart => !!chart); // ✅ 명확하게 타입 보장

  const widgetDataList = chartIds
    .map((widgetId) =>
      widgets[dashboardId]?.find((widget) => widget?.widgetId === widgetId)
    )
    .filter((widget): widget is Widget => !!widget); // ✅ 명확하게 타입 보장

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

      addWidget(targetDashboardId, clonedWidgetOptions);
      newItemId = newWidgetId;
    }

    if (newItemId) {
      setAlertMessage("선택한 차트/위젯이 복제되었습니다!");
    } else {
      setAlertMessage("복제할 항목이 없습니다.");
    }

    setIsCloneModalOpen(false);
  };

  const convertToTableData = (datasets: Dataset[]) => {
    if (!datasets || datasets.length === 0) return { headers: [], rows: [] };

    const headers = ["항목", ...datasets.map((dataset) => dataset.label)];

    const rows = datasets[0].data.map((_, index) => ({
      name: `Point ${index + 1}`,
      ...datasets.reduce((acc, dataset) => {
        acc[dataset.label] = dataset.data[index];
        return acc;
      }, {} as Record<string, any>),
    }));

    return { headers, rows };
  };

  const closeCloneModal = () => {
    setIsCloneModalOpen(false);
    setSelectedDashboard(null);
  };

  return (
    <div className="bg-ivory-bg_sub min-h-[calc(100vh-90px)]">
      <AddChartBar
        isEdit={false}
        onCreateClick={() => router.push(`/d?id=${dashboardId}`)}
        gridCols={2}
        onGridChange={() => {}}
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

      <ResponsiveGridLayout
        className="layout"
        layouts={{ lg: [] }}
        breakpoints={{ lg: 1200, md: 996, sm: 768 }}
        cols={{ lg: 4, md: 2, sm: 1 }}
        rowHeight={150}
        draggableHandle=".drag-handle"
        resizeHandles={["se"]}
      >
        {chartDataList.map((chart) => (
          <div key={chart.chartId}>
            <div className="border rounded-lg bg-white p-4 shadow-md h-full flex flex-col relative">
              {/* 메뉴 아이콘 및 TabMenu */}
              <div className="absolute top-2 right-2 z-10">
                <MoreVertical
                  className="cursor-pointer hover:text-gray-500"
                  onClick={(e) => {
                    e.stopPropagation();
                    setMenuOpenIndex(
                      menuOpenIndex === chart.chartId ? null : chart.chartId
                    );
                  }}
                />
                {menuOpenIndex === chart.chartId && (
                  <TabMenu
                    index={chart.chartId}
                    setEditingTabIndex={() =>
                      router.push(
                        `/d?id=${dashboardId}&chartId=${chart.chartId}`
                      )
                    }
                    setMenuOpenIndex={setMenuOpenIndex}
                    handleTabDelete={() =>
                      removeChart(dashboardId, chart.chartId)
                    }
                    handleTabClone={handleTabClone}
                    setIsModalOpen={() => {}}
                  />
                )}
              </div>

              {/* 제목 */}
              <h2 className="text-lg font-semibold mb-2">
                {chart.chartOptions.titleText}
              </h2>

              {/* 차트 또는 테이블 렌더링 */}
              <div className="flex-1 overflow-hidden">
                {chart.chartOptions.displayMode === "chart" ? (
                  <ChartWidget
                    type={chart.chartOptions.chartType}
                    datasets={chart.datasets || []}
                    options={chart.chartOptions}
                  />
                ) : (
                  <CustomTable
                    columns={[
                      { key: "name", label: "ID" },
                      ...chart.datasets.map((dataset) => ({
                        key: dataset.label,
                        label: dataset.label,
                      })),
                    ]}
                    data={convertToTableData(chart.datasets).rows}
                    title={chart.chartOptions.titleText}
                  />
                )}
              </div>
            </div>
          </div>
        ))}

        {widgetDataList.map((widget) => (
          <div key={widget.widgetId}>
            <div className="border rounded-lg bg-white p-4 shadow-md h-full flex flex-col relative">
              <div className="absolute top-2 right-2 z-10">
                <MoreVertical
                  className="cursor-pointer hover:text-gray-500"
                  onClick={(e) => {
                    e.stopPropagation();
                    setMenuOpenIndex(
                      menuOpenIndex === widget.widgetId ? null : widget.widgetId
                    );
                  }}
                />
                {menuOpenIndex === widget.widgetId && (
                  <TabMenu
                    index={widget.widgetId}
                    setEditingTabIndex={() =>
                      router.push(
                        `/d?id=${dashboardId}&chartId=${widget.widgetId}`
                      )
                    }
                    setMenuOpenIndex={setMenuOpenIndex}
                    handleTabDelete={() =>
                      removeWidget(dashboardId, widget.widgetId)
                    }
                    handleTabClone={handleTabClone}
                    setIsModalOpen={() => {}}
                  />
                )}
              </div>
              <h2 className="text-lg font-semibold mb-2">
                {widget.widgetOptions.label}
              </h2>
              <CommonWidget
                backgroundColor={widget.widgetOptions.widgetBackgroundColor}
                {...widget.widgetOptions}
                className="scale-[1] max-w-[300px]"
              />
            </div>
          </div>
        ))}
      </ResponsiveGridLayout>

      {isCloneModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[100]">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">대시보드 선택</h2>
            <ul>
              {dashboardList.map((dashboard) => (
                <li
                  key={dashboard.id}
                  onClick={() => setSelectedDashboard(dashboard.id)}
                  className={`cursor-pointer p-2 rounded ${
                    selectedDashboard === dashboard.id
                      ? "bg-navy-btn text-white"
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
                className="mr-2 px-4 py-2 bg-gray-200 rounded text-md2"
              >
                취소
              </button>
              <button
                onClick={confirmClone}
                disabled={!selectedDashboard}
                className={`px-4 py-2 rounded text-md2 text-white ${
                  selectedDashboard ? "bg-navy-btn" : "bg-navy-btn opacity-80"
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
