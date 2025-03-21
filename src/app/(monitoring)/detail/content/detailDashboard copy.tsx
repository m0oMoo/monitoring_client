"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Chart, useChartStore } from "@/app/store/useChartStore";
import { PanelLayout, useDashboardStore } from "@/app/store/useDashboardStore";
import { useRouter, useSearchParams } from "next/navigation";
import { Layout, Responsive, WidthProvider } from "react-grid-layout";
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
  const { dashboardPanels, addPanelToDashboard, dashboardList, saveDashboard } =
    useDashboardStore();

  const [, forceUpdate] = useState(0);

  useEffect(() => {
    console.log(
      "🚀 Zustand 상태 확인 (차트):",
      useChartStore.getState().charts
    );
    console.log(
      "🚀 Zustand 상태 확인 (위젯):",
      useWidgetStore.getState().widgets
    );

    console.log(
      "🚀 Zustand 상태 확인 (대시보드):",
      useDashboardStore.getState().dashboardPanels
    );

    // 🚀 강제로 상태 업데이트
    forceUpdate((prev) => prev + 1);
  }, []);

  const chartIds =
    dashboardPanels[dashboardId]?.map((panel) => panel.panelId) || [];
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
  const [maxWidth, setMaxWidth] = useState<number>(500);
  const [maxHeight, setMaxHeight] = useState<number>(500);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [prevLayout, setPrevLayout] = useState<Layout[]>([]);

  const layouts = useMemo(() => ({ lg: gridLayout }), [gridLayout]);

  const handleEditClick = () => {
    // if (isEditing) {
    //   // "Save" 버튼을 눌렀을 때 위치 및 크기 저장
    //   const updatedLayouts: PanelLayout[] = gridLayout.map((layout) => ({
    //     panelId: layout.i,
    //     type:
    //       dashboardPanels[dashboardId]?.find(
    //         (panel) => panel.panelId === layout.i
    //       )?.type || "chart",
    //     x: layout.x,
    //     y: layout.y,
    //     w: layout.w,
    //     h: layout.h,
    //   }));

    //   saveDashboard(dashboardId, updatedLayouts);
    // }
    setIsEditing((prev) => !prev);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      // 브라우저에서만 실행
      setMaxWidth(window.innerWidth);
      setMaxHeight(window.innerHeight - 100);

      const handleResize = () => {
        setMaxWidth(window.innerWidth);
        setMaxHeight(window.innerHeight - 100);
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("dashboard-layout", JSON.stringify(gridLayout));
    }
  }, [gridLayout]);

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

  const MIN_CHART_WIDTH = 6; // 차트 최소 가로 크기
  const MIN_CHART_HEIGHT = 5; // 차트 최소 세로 크기
  const MAX_CHART_HEIGHT = 10; // 차트 최소 세로 크기
  const MIN_WIDGET_WIDTH = 3; // 위젯 최소 가로 크기
  const MIN_WIDGET_HEIGHT = 4; // 위젯 최소 세로 크기
  const MAX_WIDGET_HEIGHT = 6; // 위젯 최소 세로 크기

  const initialLayout = useMemo(() => {
    return [
      ...chartDataList.map((chart, index) => ({
        i: chart.chartId,
        x: (index * 6) % 12, // 한 줄에 2개 배치
        y: Math.floor(index / 2) * 5, // 차트 배치 간격 조정
        w: Math.max(MIN_CHART_WIDTH, maxWidth / 200), // 최소 크기 보장
        h: Math.max(
          MIN_CHART_HEIGHT,
          chart.chartOptions.displayMode === "chart" ? 5 : 6
        ),
      })),
      ...widgetDataList.map((widget, index) => ({
        i: widget.widgetId,
        x: (index * 3) % 12, // 한 줄에 최대 4개 배치
        y: Math.floor(index / 4) * 4 + chartDataList.length * 5,
        w: Math.max(MIN_WIDGET_WIDTH, maxWidth / 250), // 최소 크기 보장
        h: MIN_WIDGET_HEIGHT,
      })),
    ];
  }, [chartDataList, widgetDataList, maxWidth]);

  useEffect(() => {
    const savedLayout = localStorage.getItem("dashboard-layout");
    if (savedLayout) {
      // ✅ 기존에 저장된 레이아웃이 있으면 그걸 적용
      console.log(
        "📌 LocalStorage에서 불러온 레이아웃:",
        JSON.parse(savedLayout)
      );
      setGridLayout(JSON.parse(savedLayout));
    } else if (gridLayout.length === 0 && initialLayout.length > 0) {
      // ✅ 기존에 저장된 값이 없고, 초기 레이아웃이 있을 때만 설정
      console.log(
        "📌 저장된 레이아웃 없음, 초기 레이아웃 적용:",
        initialLayout
      );
      setGridLayout(initialLayout);
    }
  }, []);

  const closeCloneModal = () => {
    setIsCloneModalOpen(false);
    setSelectedDashboard(null);
  };

  useEffect(() => {
    const savedLayout = localStorage.getItem("dashboard-layout");
    if (savedLayout) {
      setGridLayout(JSON.parse(savedLayout)); // 저장된 위치 적용
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("dashboard-layout", JSON.stringify(gridLayout));
  }, [gridLayout]);
  const handleLayoutChange = (layout: Layout[]) => {
    // 변경 사항이 없으면 상태 업데이트 하지 않음
    if (JSON.stringify(prevLayout) === JSON.stringify(layout)) {
      return;
    }

    console.log("📌 변경된 레이아웃:", layout);
    setGridLayout(layout);
    setPrevLayout(layout); // 이전 상태 업데이트
    // ✅ `i`를 `panelId`로 변환하여 저장
    // const updatedLayouts: PanelLayout[] = layout.map((l) => ({
    //   panelId: l.i, // ✅ `i`를 `panelId`로 매핑
    //   type:
    //     dashboardPanels[dashboardId]?.find((p) => p.panelId === l.i)?.type ||
    //     "chart",
    //   x: l.x,
    //   y: l.y,
    //   w: l.w,
    //   h: l.h,
    // }));

    // console.log("📌 변경된 레이아웃:", updatedLayouts);

    // if (JSON.stringify(prevLayout) !== JSON.stringify(updatedLayouts)) {
    //   setGridLayout(layout); // ✅ gridLayout에는 `i`를 유지
    //   setPrevLayout(layout);
    //   saveDashboard(dashboardId, updatedLayouts); // ✅ Zustand에는 `panelId`로 저장
    // }
  };

  useEffect(() => {
    if (
      dashboardPanels[dashboardId] &&
      dashboardPanels[dashboardId].length > 0 &&
      gridLayout.length === 0
    ) {
      const savedLayout = dashboardPanels[dashboardId].map((panel) => ({
        i: panel.panelId,
        x: panel.gridPos?.x ?? 0,
        y: panel.gridPos?.y ?? 0,
        w: panel.gridPos?.w ?? 4,
        h: panel.gridPos?.h ?? 4,
      }));

      console.log("📌 Zustand에서 불러온 gridLayout 설정: ", savedLayout);
      setGridLayout(savedLayout);
      setPrevLayout(savedLayout);
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
      <div className="relative w-full" style={{ maxHeight }}>
        <ResponsiveGridLayout
          className="layout"
          layouts={layouts} // `layouts` 객체로 전달
          rowHeight={70}
          isDraggable={isEditing}
          isResizable={isEditing}
          compactType={null}
          // compactType="vertical" // 자동으로 세로 정렬 유지
          preventCollision={true} // 패널 간 충돌 방지 여부
          // preventCollision={false}
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
              y: MAX_CHART_HEIGHT,
              w: Math.min(4, maxWidth / 250),
              h: 4,
            };

            return (
              <div
                key={chart.chartId}
                data-grid={chartLayout}
                className={`drag-handle cursor-grab ${
                  chart.chartOptions.displayMode === "table"
                    ? "max-h-[500px]"
                    : ""
                }`}
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
                        data={convertToTableData(chart.datasets).rows}
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
              y: MAX_WIDGET_HEIGHT,
              w: Math.min(2, maxWidth / 250),
              h: 3,
            };

            return (
              <div
                key={widget.widgetId}
                data-grid={widgetLayout}
                // style={{ maxWidth }}
                className="drag-handle cursor-grab max-h-[230px] max-w-[530px]"
              >
                <div className="relative flex flex-col h-full">
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
