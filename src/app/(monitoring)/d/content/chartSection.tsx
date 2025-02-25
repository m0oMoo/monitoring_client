import React, { useState, useEffect } from "react";
import ChartWidget from "@/app/components/dashboard/chartWidget";
import TimeRangePicker from "@/app/components/picker/timeRangePicker";
import { useChartOptions } from "@/app/context/chartOptionContext";

const ChartSection = () => {
  const {
    chartType,
    titleText,
    showLegend,
    legendPosition,
    legendColor,
    tooltipBgColor,
    zoomMode,
  } = useChartOptions();

  const [from, setFrom] = useState<string | null>(null);
  const [to, setTo] = useState<string | null>(null);
  const [refreshTime, setRefreshTime] = useState<number | "autoType">(10);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

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
        backgroundColor: "rgba(54, 162, 235, 0.6)",
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
        mode: zoomMode,
      },
    },
  };

  return (
    <div className="overflow-auto mr-[300px]">
      {/* Time Range & Refresh Control */}
      <div
        className="flex items-center mt-[44px] justify-between bg-transparent
        border-b border-navy-border border-0.5 mb-4"
      >
        <div className="pl-4">
          <TimeRangePicker
            from={from}
            to={to}
            onChange={(type, value) => {
              if (type === "from") setFrom(value);
              if (type === "to") setTo(value);
            }}
          />
        </div>
        <div className="flex items-center p-4 gap-2">
          <div className="flex flex-row">
            <p className="text-sm2 mr-1">Last Update : </p>
            <p className="text-sm mr-3">{lastUpdated}</p>
          </div>
          <label className="text-sm_bold">Refresh:</label>
          <select
            value={refreshTime}
            onChange={(e) =>
              setRefreshTime(
                e.target.value === "autoType"
                  ? "autoType"
                  : Number(e.target.value)
              )
            }
            className="border py-1 px-2 rounded text-sm1"
          >
            <option value="autoType">Auto</option>
            <option value={5}>5s</option>
            <option value={10}>10s</option>
            <option value={15}>15s</option>
            <option value={30}>30s</option>
          </select>
        </div>
      </div>

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
