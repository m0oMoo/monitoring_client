import React, { useState, useEffect, useRef } from "react";
import ChartWidget from "@/app/components/dashboard/chartWidget";
import TimeRangeBar from "@/app/components/bar/timeRangeBar";
import AddChartBar from "@/app/components/bar/addChartBar";
import { useChartOptions } from "@/app/context/chartOptionContext";
import { Chart } from "chart.js/auto";
import { v4 as uuidv4 } from "uuid";

import zoomPlugin from "chartjs-plugin-zoom";
import { useRouter, useSearchParams } from "next/navigation";
import { useChartStore } from "@/app/store/useChartStore";
import { useSelectedSection } from "@/app/context/selectedSectionContext";
import CommonWidget from "@/app/components/dashboard/commonWidget";
import { useWidgetOptions } from "@/app/context/widgetOptionContext";
import { useWidgetStore } from "@/app/store/useWidgetStore";
import { ChartOptions, WidgetOptions } from "@/app/types/options";

Chart.register(zoomPlugin);

const ChartSection = () => {
  const { selectedSection } = useSelectedSection();
  const {
    datasets,
    chartType,
    titleText,
    showLegend,
    legendPosition,
    legendColor,
    tooltipBgColor,
    isSingleColorMode,
    borderColor,
    backgroundColor,
    borderColors,
    backgroundColors,
    hoverMode,
    zoomMode,
    zoomSensitivity,
    xGridDisplay,
    yGridDisplay,
    crosshairColor,
    showCrosshair,
    crosshairWidth,
    enableZoom,
    radius,
    tension,
    tooltipMode,
    crosshairOpacity,
    setOptions,
    setDatasets,
  } = useChartOptions();

  const {
    widgetType,
    widgetData,
    label,
    maxValue,
    subText,
    changePercent,
    widgetBackgroundColor,
    textColor,
    colors,
    thresholds,
    unit,
    arrowVisible,
    setWidgetOptions,
  } = useWidgetOptions();

  const router = useRouter();
  const id = useSearchParams();
  const dashboardId = id.get("id") || "1";
  const chartId = id.get("chartId") || undefined;

  const { charts, addChart, updateChart } = useChartStore();
  const { widgets, addWidget, updateWidget } = useWidgetStore();

  const existingChart = chartId
    ? charts[dashboardId]?.find((chart) => chart.chartId === chartId)
    : null;

  const chartRef = useRef<Chart | null>(null);
  const [from, setFrom] = useState<string | null>(null);
  const [to, setTo] = useState<string | null>(null);
  const [refreshTime, setRefreshTime] = useState<number | "autoType">(10);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  useEffect(() => {
    if (existingChart) {
      if (existingChart.chartOptions) {
        setOptions(existingChart.chartOptions);
      }

      if (existingChart.datasets) {
        setDatasets(existingChart.datasets);
      }
    }
  }, [existingChart]);

  const handleTimeChange = (type: "from" | "to", value: string) => {
    if (type === "from") setFrom(value);
    if (type === "to") setTo(value);
  };

  const handleRefreshChange = (value: number | "autoType") => {
    setRefreshTime(value);
  };

  useEffect(() => {
    const now = new Date();
    setFrom(now.toISOString().slice(0, 16));
    setTo(now.toISOString().slice(0, 16));
    setLastUpdated(now.toLocaleTimeString());
  }, []);

  const existingWidget = chartId
    ? widgets[dashboardId]?.find((widget) => widget.widgetId === chartId)
    : null;

  useEffect(() => {
    if (existingChart) {
      setOptions(existingChart.chartOptions);
      setDatasets(existingChart.datasets);
    } else if (existingWidget) {
      setWidgetOptions(existingWidget.widgetOptions);
    }
  }, [existingChart, existingWidget]);

  const newChartOptions: ChartOptions = {
    chartType,
    titleText,
    showLegend,
    legendPosition,
    legendColor,
    tooltipBgColor,
    isSingleColorMode,
    borderColor,
    backgroundColor,
    borderColors,
    backgroundColors,
    hoverMode,
    zoomMode,
    zoomSensitivity,
    xGridDisplay,
    yGridDisplay,
    crosshairColor,
    showCrosshair,
    crosshairWidth,
    enableZoom,
    radius,
    tension,
    tooltipMode,
    crosshairOpacity,
  };

  const newWidgetOptions: WidgetOptions = {
    widgetId: chartId || uuidv4(),
    widgetType,
    widgetData,
    label,
    maxValue,
    subText,
    changePercent,
    widgetBackgroundColor,
    textColor,
    colors,
    thresholds,
    unit,
    arrowVisible,
  };

  // ✅ 수정된 핸들러: 차트 또는 위젯 생성 / 업데이트
  const handleCreateClick = () => {
    if (selectedSection === "chartOption") {
      if (chartId) {
        updateChart(dashboardId, chartId, newChartOptions, datasets);
      } else {
        addChart(dashboardId, newChartOptions, datasets);
      }
    } else if (selectedSection === "widgetOption") {
      if (chartId) {
        updateWidget(dashboardId, chartId, newWidgetOptions);
      } else {
        addWidget(dashboardId, newWidgetOptions);
      }
    }

    router.push(`/detail?id=${dashboardId}`);
  };

  return (
    <div className="mr-[300px] overflow-hidden">
      <AddChartBar isEdit={true} onCreateClick={handleCreateClick} />
      <TimeRangeBar
        from={from}
        to={to}
        lastUpdated={lastUpdated}
        refreshTime={refreshTime}
        onChange={handleTimeChange}
        onRefreshChange={handleRefreshChange}
      />

      <div className="px-4 min-h-[500px]">
        {selectedSection === "widgetOption" ? (
          <div className="flex justify-center items-center">
            <CommonWidget
              widgetType={widgetType}
              widgetData={widgetData}
              label={label}
              maxValue={maxValue}
              thresholds={thresholds}
              colors={colors}
              subText={subText}
              changePercent={changePercent}
              backgroundColor={widgetBackgroundColor}
              textColor={textColor}
              unit={unit}
              arrowVisible={arrowVisible}
              className="scale-[2] origin-center mt-32 will-change-transform"
            />
          </div>
        ) : (
          <div className="border rounded-lg bg-white p-6 shadow-md h-[400px] flex flex-col">
            <h2 className="text-lg font-semibold mb-2">{titleText}</h2>
            <div className="flex-1">
              <ChartWidget
                type={chartType}
                options={newChartOptions}
                datasets={datasets}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChartSection;
