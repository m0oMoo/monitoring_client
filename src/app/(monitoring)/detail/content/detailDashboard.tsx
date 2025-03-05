"use client";

import React, { useState, useEffect } from "react";
import { useChartStore } from "@/app/store/useChartStore";
import { useDashboardStore } from "@/app/store/useDashboardStore";
import { useRouter, useSearchParams } from "next/navigation";
import AddChartBar from "@/app/components/bar/addChartBar";
import TimeRangeBar from "@/app/components/bar/timeRangeBar";
import ChartWidget from "@/app/components/dashboard/chartWidget";
import CommonWidget from "@/app/components/dashboard/commonWidget"; // ✅ 위젯 컴포넌트 추가
import TabMenu from "@/app/components/menu/tabMenu";
import { MoreVertical } from "lucide-react";
import { useWidgetStore } from "@/app/store/useWidgetStore";

const DetailDashboard = () => {
  const router = useRouter();
  const id = useSearchParams();
  const dashboardId = id.get("id") || "1";

  const { charts, removeChart } = useChartStore();
  const { widgets, removeWidget } = useWidgetStore(); // ✅ 위젯 가져오기
  const { dashboardChartMap } = useDashboardStore();

  const chartIds = dashboardChartMap[dashboardId] || [];

  // ✅ 차트 목록 가져오기
  const chartDataList = chartIds
    .map((chartId) =>
      charts[dashboardId]?.find((chart) => chart.chartId === chartId)
    )
    .filter(Boolean);

  // ✅ 위젯 목록 가져오기
  const widgetDataList = chartIds
    .map((widgetId) =>
      widgets[dashboardId]?.find((widget) => widget.widgetId === widgetId)
    )
    .filter(Boolean);

  // ✅ 차트와 위젯을 합쳐서 하나의 리스트로 관리
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
                  key={"chartId" in item ? item.chartId : item.widgetId} // ✅ 안전한 키 사용
                  className="relative flex justify-center"
                >
                  <div
                    className="w-full h-[400px] relative"
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
                        />
                      )}
                    </div>

                    {/* ✅ 차트와 위젯을 구분하여 렌더링 */}
                    {"chartOptions" in item ? (
                      <ChartWidget
                        type={item.chartOptions.chartType}
                        datasets={item.datasets || []}
                        options={item.chartOptions}
                      />
                    ) : (
                      <CommonWidget
                        widgetType={item.widgetType}
                        widgetData={item.widgetData}
                        label={item.label}
                        maxValue={item.maxValue}
                        thresholds={item.thresholds}
                        colors={item.colors}
                        subText={item.subText}
                        changePercent={item.changePercent}
                        backgroundColor={item.widgetBackgroundColor}
                        textColor={item.textColor}
                        unit={item.unit}
                        arrowVisible={item.arrowVisible}
                      />
                    )}
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
