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
import {
  WidgetOptions,
  ChartOptions,
  DisplayMode,
  ChartType,
  WidgetType,
} from "@/app/types/options";

interface Chart {
  chartId: string;
  chartOptions: ChartOptions;
  datasets: Dataset[];
}

interface Widget {
  widgetId: string;
  widgetOptions: WidgetOptions;
}

const DetailDashboard = () => {
  const router = useRouter();
  const id = useSearchParams();
  const dashboardId = id.get("id") || "1";

  const { charts, removeChart } = useChartStore();
  const { widgets, removeWidget } = useWidgetStore();
  const { dashboardChartMap } = useDashboardStore();

  const chartIds = dashboardChartMap[dashboardId] || [];

  const chartDataList: Chart[] = chartIds
    .map((chartId) =>
      charts[dashboardId]?.find((chart) => chart?.chartId === chartId)
    )
    .filter((chart): chart is Chart => !!chart);

  const widgetDataList: Widget[] = chartIds
    .map((widgetId) =>
      widgets[dashboardId]?.find((widget) => widget?.widgetId === widgetId)
    )
    .filter((widget): widget is Widget => !!widget);

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

      {/* 🔹 위젯만 상단에 가로 정렬 */}
      {widgetDataList.length > 0 && (
        <div className="flex gap-4 px-4 mb-6 overflow-x-auto">
          {widgetDataList.map((widget) => (
            <div
              key={widget.widgetId}
              className="relative flex-shrink-0 h-[210px]"
            >
              <CommonWidget
                widgetType={widget.widgetOptions.widgetType as WidgetType}
                widgetData={widget.widgetOptions.widgetData}
                label={widget.widgetOptions.label}
                maxValue={widget.widgetOptions.maxValue}
                thresholds={widget.widgetOptions.thresholds}
                colors={widget.widgetOptions.colors}
                subText={widget.widgetOptions.subText}
                changePercent={widget.widgetOptions.changePercent}
                backgroundColor={widget.widgetOptions.widgetBackgroundColor}
                textColor={widget.widgetOptions.textColor}
                unit={widget.widgetOptions.unit}
                arrowVisible={widget.widgetOptions.arrowVisible}
              />
            </div>
          ))}
        </div>
      )}

      {/* 🔹 차트 & 테이블을 그리드로 배치 */}
      <div className={`grid grid-cols-${gridCols} gap-6 p-4`}>
        {chartDataList.map((chart) => (
          <div key={chart.chartId} className="relative flex justify-center">
            <div className="relative flex flex-col items-center h-[450px] w-full">
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
                    handleTabClone={() => {}}
                  />
                )}
              </div>

              {chart.chartOptions.displayMode === "chart" ? (
                <ChartWidget
                  type={chart.chartOptions.chartType as ChartType}
                  datasets={chart.datasets || []}
                  options={chart.chartOptions}
                />
              ) : (
                <CustomTable
                  columns={[
                    { key: "name", label: "ID" },
                    ...chart.datasets.map((d) => ({
                      key: d.label,
                      label: d.label,
                    })),
                  ]}
                  data={convertToTableData(chart.datasets).rows}
                  title={chart.chartOptions.titleText}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetailDashboard;
