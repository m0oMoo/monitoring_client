import React, { useState, useEffect, useRef } from "react";
import ChartWidget from "@/app/components/dashboard/chartWidget";
import TimeRangeBar from "@/app/components/bar/timeRangeBar";
import AddChartBar from "@/app/components/bar/addChartBar";
import { useChartOptions } from "@/app/context/chartOptionContext";
import { Chart } from "chart.js/auto";
import zoomPlugin from "chartjs-plugin-zoom";

Chart.register(zoomPlugin);

const ChartSection = () => {
  const {
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
    showCrosshair,
    crosshairWidth,
    enableZoom,
    radius,
    tension,
  } = useChartOptions();

  const chartRef = useRef<Chart | null>(null);
  const [from, setFrom] = useState<string | null>(null);
  const [to, setTo] = useState<string | null>(null);
  const [refreshTime, setRefreshTime] = useState<number | "autoType">(10);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  // ✅ `datasets`을 상태로 관리
  const [datasets, setDatasets] = useState([
    { label: "Visitors", data: [500, 600, 700, 800, 900] },
    { label: "Active Users", data: [650, 350, 250, 700, 850] },
  ]);

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

  // ✅ 차트 데이터
  const chartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    datasets: datasets.map((dataset, index) => ({
      ...dataset,
      borderColor: isSingleColorMode
        ? borderColor
        : borderColors[index % borderColors.length],
      backgroundColor: isSingleColorMode
        ? backgroundColor
        : backgroundColors[index % backgroundColors.length],
      borderWidth: crosshairWidth,
      fill: true,
    })),
  };

  // ✅ 차트 옵션
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: showLegend,
        position: legendPosition,
        labels: { color: legendColor },
      },
      tooltip: { backgroundColor: tooltipBgColor },
      zoom: {
        pan: { enabled: enableZoom, mode: zoomMode },
        zoom: {
          wheel: { enabled: enableZoom },
          pinch: { enabled: enableZoom },
          mode: zoomMode,
          speed: zoomSensitivity,
        },
      },
    },
    scales: {
      x: { grid: { display: xGridDisplay } },
      y: { grid: { display: yGridDisplay } },
    },
    interaction: { mode: hoverMode, intersect: false },
    hover: { mode: hoverMode, intersect: false },
    elements: {
      point: {
        radius: showCrosshair ? radius : 0,
        borderWidth: crosshairWidth,
      },
      line: { tension },
    },
  };

  return (
    <div className="overflow-auto mr-[300px]">
      {/* Time Range & Refresh Control */}
      <AddChartBar isEdit={true} />
      <TimeRangeBar
        from={from}
        to={to}
        lastUpdated={lastUpdated}
        refreshTime={refreshTime}
        onChange={handleTimeChange}
        onRefreshChange={handleRefreshChange}
        className="mt-[44psx]"
      />

      <div className="px-4">
        {/* ✅ Chart Widget */}
        <div className="border rounded-lg bg-white p-6 shadow-md h-[400px] flex flex-col">
          <h2 className="text-lg font-semibold mb-2">{titleText}</h2>
          <div className="flex-1">
            <ChartWidget
              type={chartType}
              data={chartData}
              options={chartOptions}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartSection;
