import React, { useState, useEffect, useRef } from "react";
import ChartWidget from "@/app/components/dashboard/chartWidget";
import CustomTable from "@/app/components/table/customTable";
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
    displayMode,
    toggleDisplayMode,
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
      setOptions(existingChart.chartOptions);
      setDatasets(existingChart.datasets);
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
    displayMode,
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

  // 🔹 `datasets` 데이터를 `CustomTable` 형식으로 변환
  const convertToTableData = () => {
    if (datasets.length === 0) return { headers: [], rows: [] };

    const headers = [
      "항목",
      ...datasets[0].data.map((_, index) => `X${index + 1}`),
    ];
    const rows = datasets.map((dataset) => ({
      label: dataset.label,
      values: dataset.data,
    }));

    return { headers, rows };
  };

  const tableData = convertToTableData();

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
          <>
            {displayMode === "chart" ? (
              <div className="border rounded-lg bg-white p-6 shadow-md h-[450px] flex flex-col">
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
              <CustomTable
                columns={[
                  { key: "name", label: "ID" },
                  ...datasets.map((dataset) => ({
                    key: dataset.label,
                    label: dataset.label,
                  })), // 데이터셋의 label을 컬럼명으로 사용
                ]}
                data={datasets[0]?.data.map((_, index) => ({
                  name: `${index + 1}`, // 각 데이터의 인덱스
                  ...datasets.reduce((acc, dataset) => {
                    acc[dataset.label] = dataset.data[index]; // dataset의 label을 key로 사용하여 값 저장
                    return acc;
                  }, {} as Record<string, any>),
                }))}
                title={titleText}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ChartSection;
