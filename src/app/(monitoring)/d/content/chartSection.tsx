import React, { useState, useEffect, useRef } from "react";
import ChartWidget from "@/app/components/dashboard/chartWidget";
import TimeRangePicker from "@/app/components/picker/timeRangePicker";
import { useChartOptions } from "@/app/context/chartOptionContext";
import { Chart } from "chart.js/auto";
import zoomPlugin from "chartjs-plugin-zoom";
import TimeRangeBar from "@/app/components/bar/timeRangeBar";
import AddChartBar from "@/app/components/bar/addChartBar";

Chart.register(zoomPlugin);

const ChartSection = () => {
  const {
    chartType,
    titleText,
    showLegend,
    legendPosition,
    legendColor,
    tooltipBgColor,
    backgroundColor,
    hoverMode,
    zoomMode,
    zoomSensitivity,
    xGridDisplay,
    yGridDisplay,
    showCrosshair,
    crosshairColor,
    crosshairWidth,
    crosshairOpacity,
    enableZoom,
    radius,
    tension,
  } = useChartOptions();

  const chartRef = useRef<Chart | null>(null);

  const [from, setFrom] = useState<string | null>(null);
  const [to, setTo] = useState<string | null>(null);
  const [refreshTime, setRefreshTime] = useState<number | "autoType">(10);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

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

  // 차트 데이터
  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Sales",
        data: [30, 50, 70, 40, 90],
        backgroundColor: backgroundColor,
        borderColor: crosshairColor,
        borderWidth: crosshairWidth,
      },
    ],
  };

  // 차트 옵션 (useChartOptions 값 적용)
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: showLegend,
        position: legendPosition,
        labels: {
          color: legendColor,
        },
      },
      tooltip: {
        backgroundColor: tooltipBgColor,
      },
      zoom: {
        pan: {
          enabled: enableZoom, // 차트 이동 활성화
          mode: zoomMode,
        },
        zoom: {
          wheel: { enabled: enableZoom }, // 마우스 휠 줌
          pinch: { enabled: enableZoom }, // 모바일 핀치 줌
          mode: zoomMode, // 줌 모드 (xy, x, y)
          speed: zoomSensitivity,
          limits: {
            x: { min: "original", max: "original" }, // X축 원래 값 유지
            y: { min: "original", max: "original" }, // Y축 원래 값 유지
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: xGridDisplay,
          // drawOnChartArea: showCrosshair,
          // drawTicks: showCrosshair,
          // color: showCrosshair ? crosshairColor : "transparent",
        },
      },
      y: {
        grid: {
          display: yGridDisplay,
          // drawOnChartArea: showCrosshair,
          // drawTicks: showCrosshair,
          // color: showCrosshair ? crosshairColor : "transparent",
        },
      },
    },
    interaction: {
      mode: hoverMode,
      intersect: false,
    },
    hover: {
      mode: hoverMode,
      intersect: false,
    },
    elements: {
      point: {
        radius: showCrosshair ? radius : 0,
        backgroundColor: `rgba(${parseInt(crosshairColor.slice(1, 3), 16)}, 
                              ${parseInt(crosshairColor.slice(3, 5), 16)}, 
                              ${parseInt(crosshairColor.slice(5, 7), 16)}, 
                              ${crosshairOpacity})`,
        borderWidth: crosshairWidth,
      },
      line: {
        tension: tension,
      },
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
        {/* Chart Widget */}
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
