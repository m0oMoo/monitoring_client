"use client";

import React, { useState, useEffect, useMemo } from "react";
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

    // 🚀 강제로 상태 업데이트
    forceUpdate((prev) => prev + 1);
  }, []);

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
  const [gridLayout, setGridLayout] = useState<
    { i: string; x: number; y: number; w: number; h: number }[]
  >([]);
  const [maxWidth, setMaxWidth] = useState(window.innerWidth + 500);
  const [maxHeight, setMaxHeight] = useState(window.innerHeight - 100);

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
      const savedLayout = localStorage.getItem("dashboard-layout");
      if (savedLayout) {
        setGridLayout(JSON.parse(savedLayout)); // 저장된 위치 적용
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("dashboard-layout", JSON.stringify(gridLayout));
    }
  }, [gridLayout]);

  const chartDataList = chartIds
    .map((chartId) =>
      charts[dashboardId]?.find((chart) => chart?.chartId === chartId)
    )
    .filter((chart): chart is Chart => !!chart);

  const widgetDataList = chartIds
    .map((widgetId) =>
      widgets[dashboardId]?.find((widget) => widget?.widgetId === widgetId)
    )
    .filter((widget): widget is Widget => !!widget); // 명확하게 타입 보장

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
      addChartToDashboard(targetDashboardId, newChartId);
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

  const initialLayout = useMemo(() => {
    return [
      ...chartDataList.map((chart, index) => ({
        i: chart.chartId,
        x: index % 2 === 0 ? 0 : 1,
        y: Math.floor(index / 2),
        w: 2,
        h: chart.chartOptions.displayMode === "chart" ? 4 : 5,
      })),
      ...widgetDataList.map((widget, index) => ({
        i: widget.widgetId,
        x: index % 2 === 0 ? 0 : 1,
        y: Math.floor(index / 2) + chartDataList.length,
        w: 1,
        h: 3,
      })),
    ];
  }, [chartDataList, widgetDataList]);

  useEffect(() => {
    if (gridLayout.length === 0 && initialLayout.length > 0) {
      setGridLayout(initialLayout);
    }
  }, [initialLayout]);

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

  return (
    <div className="bg-ivory-bg_sub min-h-[calc(100vh-80px)]">
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
      <div className="relative w-full" style={{ maxHeight }}>
        <ResponsiveGridLayout
          className="layout"
          layouts={{ lg: gridLayout }}
          breakpoints={{ lg: 1200, md: 996, sm: 768 }}
          rowHeight={50} // 세밀한 배치를 위해 행 높이 조정
          isDraggable={true} // 드래그 활성화
          isResizable={true} // 크기 조절 가능
          compactType={null} // 위젯 자동 정렬 해제 (자유롭게 배치 가능)
          preventCollision={false} // 겹침 방지
          onLayoutChange={(layout) => setGridLayout(layout)} // 변경된 배치를 상태에 저장
          draggableHandle=".drag-handle" // 특정 영역만 드래그 가능하도록 설정
          resizeHandles={["se"]} // 크기 조절 핸들 추가
        >
          {chartDataList.map((chart) => {
            const chartLayout = gridLayout.find(
              (item) => item.i === chart.chartId
            ) || {
              i: chart.chartId,
              x: 0,
              y: Infinity,
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
                  <div className="absolute top-2 right-2 z-10">
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
              y: Infinity,
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
                  <div className="absolute top-2 right-2 z-10">
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
