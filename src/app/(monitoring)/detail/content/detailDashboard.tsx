"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Chart, useChartStore } from "@/app/store/useChartStore";
import { PanelLayout, useDashboardStore } from "@/app/store/useDashboardStore";
import { useRouter, useSearchParams } from "next/navigation";
import { Layout, Responsive, WidthProvider } from "react-grid-layout";
import AddChartBar from "@/app/components/bar/addChartBar";
import TimeRangeBar from "@/app/components/bar/timeRangeBar";
import ChartWidget from "@/app/components/dashboard/chartWidget";
import CommonWidget from "@/app/components/dashboard/commonWidget";
import CustomTable from "@/app/components/table/customTable";
import TabMenu from "@/app/components/menu/tabMenu";
import { MoreVertical } from "lucide-react";
import { useWidgetStore, Widget } from "@/app/store/useWidgetStore";
import { v4 as uuidv4 } from "uuid";
import Alert from "@/app/components/alert/alert";
import { convertToTable } from "@/app/utils/convertToTable";
import {
  MIN_CHART_WIDTH,
  MIN_CHART_HEIGHT,
  MIN_WIDGET_WIDTH,
  MIN_WIDGET_HEIGHT,
  MAX_WIDGET_WIDTH,
  MAX_WIDGET_HEIGHT,
  MAX_CHART_HEIGHT,
  MAX_CHART_WIDTH,
} from "@/app/data/chart/chartDetail";

const ResponsiveGridLayout = WidthProvider(Responsive);

const DetailDashboard = () => {
  const router = useRouter();
  const id = useSearchParams();
  const dashboardId = id.get("id") || "1";

  const { charts, addChart, removeChart } = useChartStore();
  const { widgets, addWidget, removeWidget } = useWidgetStore();
  const { dashboardPanels, addPanelToDashboard, dashboardList, saveDashboard } =
    useDashboardStore();

  const [from, setFrom] = useState<string | null>(null);
  const [to, setTo] = useState<string | null>(null);
  const [refreshTime, setRefreshTime] = useState<number | "autoType">(10);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [menuOpenIndex, setMenuOpenIndex] = useState<string | null>(null);
  const [isCloneModalOpen, setIsCloneModalOpen] = useState<boolean>(false);
  const [selectedDashboard, setSelectedDashboard] = useState<string | null>(
    null
  );
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [gridLayout, setGridLayout] = useState<
    { i: string; x: number; y: number; w: number; h: number }[]
  >([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [prevLayout, setPrevLayout] = useState<Layout[]>([]);

  const layouts = useMemo(() => ({ lg: gridLayout }), [gridLayout]);

  const handleEditClick = () => {
    if (isEditing) {
      // "Save" 버튼을 눌렀을 때 위치 및 크기 저장
      const updatedLayouts: PanelLayout[] = gridLayout.map((layout) => ({
        panelId: layout.i,
        type:
          dashboardPanels[dashboardId]?.find(
            (panel) => panel.panelId === layout.i
          )?.type || "chart",
        x: layout.x,
        y: layout.y,
        w: layout.w,
        h: layout.h,
      }));

      saveDashboard(dashboardId, updatedLayouts);
    }
    setIsEditing((prev) => !prev);
  };

  const chartDataList = (dashboardPanels[dashboardId] || [])
    .filter((panel) => panel.type === "chart")
    .map((panel) =>
      charts[dashboardId]?.find((chart) => chart?.chartId === panel.panelId)
    )
    .filter((chart): chart is Chart => !!chart);

  const widgetDataList = (dashboardPanels[dashboardId] || [])
    .filter((panel) => panel.type === "widget")
    .map((panel) =>
      widgets[dashboardId]?.find((widget) => widget?.widgetId === panel.panelId)
    )
    .filter((widget): widget is Widget => !!widget);

  const handleTabClone = (itemId: string) => {
    setSelectedItem(itemId);
    setIsCloneModalOpen(true);
  };

  const confirmClone = () => {
    if (!selectedDashboard || !selectedItem) return;

    const targetDashboardId = selectedDashboard;
    let newItemId: string | null = null;

    // 차트 복제
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
      addPanelToDashboard(targetDashboardId, newChartId, "chart");

      newItemId = newChartId;
    }

    // 위젯 복제
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
      addPanelToDashboard(targetDashboardId, newWidgetId, "widget");
      newItemId = newWidgetId;
    }

    if (newItemId) {
      setAlertMessage("선택한 차트/위젯이 복제되었습니다!");
    } else {
      setAlertMessage("복제할 항목이 없습니다.");
    }

    setIsCloneModalOpen(false);
  };

  const closeCloneModal = () => {
    setIsCloneModalOpen(false);
    setSelectedDashboard(null);
  };

  const handleLayoutChange = (layout: Layout[]) => {
    // 상태가 변경되지 않았다면 업데이트하지 않음
    if (JSON.stringify(prevLayout) === JSON.stringify(layout)) {
      return;
    }

    // 레이아웃이 변경된 경우에만 처리
    const updatedLayouts: PanelLayout[] = layout.map((l) => ({
      panelId: l.i, // `i`를 `panelId`로 매핑
      type:
        dashboardPanels[dashboardId]?.find((p) => p.panelId === l.i)?.type ||
        "chart",
      x: l.x,
      y: l.y,
      w: l.w,
      h: l.h,
    }));

    // 레이아웃 변경이 실제로 있을 때만 상태 업데이트
    setGridLayout(layout);
    setPrevLayout(layout); // 이전 레이아웃 갱신
    saveDashboard(dashboardId, updatedLayouts); // Zustand에 레이아웃 저장
  };

  useEffect(() => {
    // 초기화 시 Zustand 상태에서 가져와 적용
    if (
      dashboardPanels[dashboardId] &&
      dashboardPanels[dashboardId].length > 0 &&
      gridLayout.length === 0
    ) {
      const savedLayout = dashboardPanels[dashboardId].map((panel) => ({
        i: panel.panelId,
        x: panel.x,
        y: panel.y,
        w: panel.w,
        h: panel.h,
      }));

      console.log("📌 Zustand에서 불러온 gridLayout 설정: ", savedLayout);
      setGridLayout(savedLayout);
      setPrevLayout(savedLayout); // 초기값 설정
    }
  }, [dashboardPanels, dashboardId]);

  return (
    <div className="bg-ivory-bg_sub min-h-[calc(100vh-80px)]">
      <AddChartBar
        isEdit={isEditing}
        onCreateClick={() => router.push(`/d?id=${dashboardId}`)}
        gridCols={2}
        onGridChange={() => {}}
        gridVisible={true}
        modifiable={true}
        onEditClick={handleEditClick}
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
      <div className="relative w-full">
        <ResponsiveGridLayout
          className="layout"
          layouts={layouts}
          rowHeight={70}
          isDraggable={isEditing}
          isResizable={isEditing}
          compactType={null}
          preventCollision={true}
          onLayoutChange={handleLayoutChange}
          maxRows={20} // 최대 줄 수 제한
          draggableHandle=".drag-handle"
          resizeHandles={["se"]}
        >
          {chartDataList.map((chart) => {
            const chartLayout = gridLayout.find(
              (item) => item.i === chart.chartId
            ) || {
              i: chart.chartId,
              x: 0,
              y: 0,
              w: 4,
              h: Math.max(MIN_WIDGET_HEIGHT, 4),
              minW: MIN_CHART_WIDTH,
              minH: MIN_CHART_HEIGHT,
            };

            return (
              <div
                key={chart.chartId}
                data-grid={{
                  ...chartLayout,
                  minW: MIN_CHART_WIDTH,
                  minH: MIN_CHART_HEIGHT,
                }}
                className={`drag-handle cursor-grab`}
              >
                <div className="border rounded-lg bg-white p-4 shadow-md h-full flex flex-col relative">
                  {/* 메뉴 버튼 (기존 유지) */}
                  <div className="absolute top-2 right-2 z-10 pointer-events-auto">
                    <MoreVertical
                      className="text-text3 cursor-pointer hover:text-text2"
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
                        setIsModalOpen={() => {}}
                        setMenuOpenIndex={setMenuOpenIndex}
                        handleTabDelete={() =>
                          removeChart(dashboardId, chart.chartId)
                        }
                        handleTabClone={handleTabClone}
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
                        data={convertToTable(chart.datasets).rows}
                        title={chart.chartOptions.titleText}
                      />
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {widgetDataList.map((widget) => {
            const widgetLayout = gridLayout.find(
              (item) => item.i === widget.widgetId
            ) || {
              i: widget.widgetId,
              x: 0,
              y: 0,
              w: 4, // 기본 가로 크기
              h: Math.max(MIN_WIDGET_HEIGHT, 4), // 기본 세로 크기
              minW: MIN_WIDGET_WIDTH, // 최소 가로 크기 설정
              minH: MIN_WIDGET_HEIGHT, // 최소 세로 크기 설정
            };

            return (
              <div
                key={widget.widgetId}
                data-grid={{
                  ...widgetLayout, // widgetLayout에서 x, y, w, h 값을 그대로 사용
                  minW: 2,
                  maxW: 4,
                  minH: MIN_WIDGET_HEIGHT, // 최소 세로 크기 설정
                }}
                className="drag-handle cursor-grab"
              >
                {/* max-h-[230px] max-w-[530px] */}
                <div className="relative flex flex-col h-full min-w-72 min-h-32">
                  <div className="absolute top-2 right-2 z-10 pointer-events-auto">
                    <MoreVertical
                      className="text-text3 cursor-pointer hover:text-text2"
                      onClick={(e) => {
                        e.stopPropagation();
                        setMenuOpenIndex(
                          menuOpenIndex === widget.widgetId
                            ? null
                            : widget.widgetId
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
                        setIsModalOpen={() => {}}
                        setMenuOpenIndex={setMenuOpenIndex}
                        handleTabDelete={() =>
                          removeWidget(dashboardId, widget.widgetId)
                        }
                        handleTabClone={handleTabClone}
                      />
                    )}
                  </div>
                  {/* 위젯 렌더링 */}
                  <CommonWidget
                    backgroundColor={widget.widgetOptions.widgetBackgroundColor}
                    {...widget.widgetOptions}
                    className="scale-[1] w-full h-full"
                  />
                </div>
              </div>
            );
          })}
        </ResponsiveGridLayout>
      </div>
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
