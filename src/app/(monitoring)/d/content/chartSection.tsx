import React, { useState, useEffect, useRef } from "react";
import ChartWidget from "@/app/components/dashboard/chartWidget";
import TimeRangeBar from "@/app/components/bar/timeRangeBar";
import AddChartBar from "@/app/components/bar/addChartBar";
import { useChartOptions } from "@/app/context/chartOptionContext";
import { Chart } from "chart.js/auto";
import zoomPlugin from "chartjs-plugin-zoom";
import { useRouter, useSearchParams } from "next/navigation";
import { useChartStore } from "@/app/store/useChartStore";
import { useSelectedSection } from "@/app/context/selectedSectionContext";
import CommonWidget from "@/app/components/dashboard/commonWidget";
import { useWidgetOptions } from "@/app/context/widgetOptionContext";

Chart.register(zoomPlugin);

const ChartSection = () => {
  const { selectedSection, setSelectedSection } = useSelectedSection();
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
    setOptions,
    setDatasets,
  } = useChartOptions();

  const {
    widgetType,
    setWidgetType,
    label,
    value,
    maxValue,
    subText,
    changePercent,
    chartData,
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

  const { charts, setChartData } = useChartStore();
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

  // 🔹 날짜 변경 핸들러
  const handleTimeChange = (type: "from" | "to", value: string) => {
    if (type === "from") setFrom(value);
    if (type === "to") setTo(value);
  };

  // 🔹 새로고침 시간 변경 핸들러
  const handleRefreshChange = (value: number | "autoType") => {
    setRefreshTime(value);
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

  const newChartOptions = {
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
  };

  // ✅ 차트 데이터 저장 또는 업데이트 (datasets 추가)
  const handleCreateClick = () => {
    setChartData(dashboardId, newChartOptions, datasets, chartId);

    setOptions(newChartOptions);

    router.push(`/detail?id=${dashboardId}`);
  };

  return (
    <div className="mr-[300px]">
      {/* Time Range & Refresh Control */}
      <AddChartBar isEdit={true} onCreateClick={handleCreateClick} />
      <TimeRangeBar
        from={from}
        to={to}
        lastUpdated={lastUpdated}
        refreshTime={refreshTime}
        onChange={handleTimeChange}
        onRefreshChange={handleRefreshChange}
      />

      <div className="px-4">
        {selectedSection === "chartOption" ? (
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
        ) : (
          <div className="flex justify-center items-center">
            <CommonWidget
              widgetType={widgetType}
              value={value}
              label={label}
              maxValue={maxValue}
              thresholds={thresholds}
              colors={colors}
              subText={subText}
              changePercent={changePercent}
              chartData={chartData}
              backgroundColor={widgetBackgroundColor}
              textColor={textColor}
              unit={unit}
              arrowVisible={arrowVisible}
              className="scale-[2] origin-center mt-32"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChartSection;
