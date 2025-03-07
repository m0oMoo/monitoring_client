"use client";

import React, { useState, useEffect } from "react";
import { useChartStore } from "@/app/store/useChartStore";
import { useDashboardStore } from "@/app/store/useDashboardStore";
import { useRouter, useSearchParams } from "next/navigation";
import AddChartBar from "@/app/components/bar/addChartBar";
import TimeRangeBar from "@/app/components/bar/timeRangeBar";
import ChartWidget from "@/app/components/dashboard/chartWidget";
import CommonWidget from "@/app/components/dashboard/commonWidget";
import CustomTable from "@/app/components/table/customTable"; // 🔹 테이블 추가
import TabMenu from "@/app/components/menu/tabMenu";
import { MoreVertical } from "lucide-react";
import { useWidgetStore } from "@/app/store/useWidgetStore";
import { Dataset } from "@/app/context/chartOptionContext";

const DetailDashboard = () => {
  const router = useRouter();
  const id = useSearchParams();
  const dashboardId = id.get("id") || "1";

  const { charts, removeChart } = useChartStore();
  const { widgets, removeWidget } = useWidgetStore();
  const { dashboardChartMap } = useDashboardStore();

  const chartIds = dashboardChartMap[dashboardId] || [];

  const chartDataList = chartIds
    .map((chartId) =>
      charts[dashboardId]?.find((chart) => chart.chartId === chartId)
    )
    .filter(Boolean);

  const widgetDataList = chartIds
    .map((widgetId) =>
      widgets[dashboardId]?.find((widget) => widget.widgetId === widgetId)
    )
    .filter(Boolean);

  const combinedDataList = [...chartDataList, ...widgetDataList];

  const [from, setFrom] = useState<string | null>(null);
  const [to, setTo] = useState<string | null>(null);
  const [refreshTime, setRefreshTime] = useState<number | "autoType">(10);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [menuOpenIndex, setMenuOpenIndex] = useState<string | null>(null);
  const [gridCols, setGridCols] = useState<number>(2);

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
                    className="w-full h-[450px] relative"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="absolute top-2 right-0">
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
                          handleTabClone={() => {}}
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
                      />
                    ) : null}
                  </div>
                </div>
              ) : null
            )
          : null}
      </div>
    </div>
  );
};

export default DetailDashboard;
