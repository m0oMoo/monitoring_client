"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useChartStore } from "@/app/store/useChartStore";
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
import { Dataset } from "@/app/context/chartOptionContext";
import { useWidgetStore } from "@/app/store/useWidgetStore";

const ResponsiveGridLayout = WidthProvider(Responsive);

const DetailDashboard = () => {
  const router = useRouter();
  const id = useSearchParams();
  const dashboardId = id.get("id") || "1";

  const { charts } = useChartStore();
  const { widgets } = useWidgetStore();
  const { dashboardChartMap } = useDashboardStore();

  const chartIds = dashboardChartMap[dashboardId] || [];
  const chartDataList = useMemo(
    () =>
      chartIds
        .map((chartId) =>
          charts[dashboardId]?.find((chart) => chart?.chartId === chartId)
        )
        .filter((chart): chart is NonNullable<typeof chart> => !!chart),
    [charts, dashboardId, chartIds]
  );

  const widgetDataList = useMemo(
    () =>
      chartIds
        .map((widgetId) =>
          widgets[dashboardId]?.find((widget) => widget?.widgetId === widgetId)
        )
        .filter((widget): widget is NonNullable<typeof widget> => !!widget),
    [widgets, dashboardId, chartIds]
  );

  const [from, setFrom] = useState<string | null>(null);
  const [to, setTo] = useState<string | null>(null);
  const [refreshTime, setRefreshTime] = useState<number | "autoType">(10);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [menuOpenIndex, setMenuOpenIndex] = useState<string | null>(null);
  const [isCloneModalOpen, setIsCloneModalOpen] = useState(false);
  const [selectedDashboard, setSelectedDashboard] = useState<string | null>(
    null
  );
  const [gridCols, setGridCols] = useState<number>(2);
  const [gridLayout, setGridLayout] = useState<
    { i: string; x: number; y: number; w: number; h: number }[]
  >([]);

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

  const computedLayout = useMemo(() => {
    return [
      ...chartDataList.map((chart, index) => ({
        i: chart.chartId,
        x: index % 2 === 0 ? 0 : 1,
        y: Math.floor(index / 2),
        w: 2,
        h: chart.chartOptions.displayMode === "chart" ? 3 : 4, // ✅ 차트: 3 / 테이블: 4
      })),
      ...widgetDataList.map((widget, index) => ({
        i: widget.widgetId,
        x: index % 2 === 0 ? 0 : 1,
        y: Math.floor(index / 2) + chartDataList.length,
        w: 1,
        h: 2,
      })),
    ];
  }, [chartDataList, widgetDataList]);

  useEffect(() => {
    setGridLayout(computedLayout);
  }, [computedLayout]);

  return (
    <div className="bg-ivory-bg_sub min-h-[calc(100vh-90px)]">
      <AddChartBar
        isEdit={false}
        onCreateClick={() => router.push(`/d?id=${dashboardId}`)}
        gridCols={gridCols}
        onGridChange={(change) =>
          setGridCols((prev) => Math.max(1, Math.min(4, prev + change)))
        }
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

      {/* ✅ 드래그 & 크기 조절 가능 */}
      <ResponsiveGridLayout
        className="layout"
        layouts={{ lg: gridLayout }}
        breakpoints={{ lg: 1200, md: 996, sm: 768 }}
        cols={{ lg: 4, md: 2, sm: 1 }}
        rowHeight={150}
        onLayoutChange={(layout) => setGridLayout(layout)}
        draggableHandle=".drag-handle"
        resizeHandles={["se"]}
      >
        {/* ✅ 차트 & 테이블 렌더링 (높이 고정) */}
        {chartDataList.map((chart) => (
          <div
            key={chart.chartId}
            data-grid={gridLayout.find((item) => item.i === chart.chartId)}
            style={{ height: "100%" }} // ✅ 부모 높이 유지
          >
            <div className="border rounded-lg bg-white p-4 shadow-md h-full flex flex-col">
              <h2 className="text-lg font-semibold mb-2 drag-handle cursor-move">
                {chart.chartOptions.titleText}
              </h2>
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

        {/* ✅ 위젯 렌더링 */}
        {widgetDataList.map((widget) => (
          <div
            key={widget.widgetId}
            data-grid={gridLayout.find((item) => item.i === widget.widgetId)}
            style={{ height: "100%" }}
          >
            <div className="border rounded-lg bg-white p-4 shadow-md h-full flex flex-col">
              <h2 className="text-lg font-semibold mb-2 drag-handle cursor-move">
                {widget.widgetOptions.label}
              </h2>
              <div className="flex-1 overflow-hidden">
                <CommonWidget backgroundColor={""} {...widget.widgetOptions} />
              </div>
            </div>
          </div>
        ))}
      </ResponsiveGridLayout>
    </div>
  );
};

export default DetailDashboard;
