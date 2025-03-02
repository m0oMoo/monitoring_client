"use client";

import React, { useState, useEffect } from "react";
import { useChartStore } from "@/app/store/useChartStore";
import { useRouter, useSearchParams } from "next/navigation";
import AddChartBar from "@/app/components/bar/addChartBar";
import TimeRangeBar from "@/app/components/bar/timeRangeBar";
import ChartWidget from "@/app/components/dashboard/chartWidget";

const DetailDashboard = () => {
  const router = useRouter();
  const id = useSearchParams();
  const dashboardId = id.get("id") || "1";

  const { charts, setChartData, removeChart } = useChartStore();
  const chartDataList = charts[dashboardId] ?? [];

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

  const handleTimeChange = (type: "from" | "to", value: string) => {
    if (type === "from") setFrom(value);
    if (type === "to") setTo(value);
  };

  const handleRefreshChange = (value: number | "autoType") => {
    setRefreshTime(value);
  };

  const handleCreateClick = () => {
    router.push(`/d?id=${dashboardId}`);
  };

  const handleDeleteChart = (chartId: string) => {
    removeChart(dashboardId, chartId);
  };

  const handleEditChart = (chartId: string) => {
    console.log(`Edit chart ${chartId}`);
    router.push(`/d?id=${dashboardId}&chartId=${chartId}`);
  };

  return (
    <div className="bg-ivory-bg_sub min-h-[calc(100vh-90px)]">
      <AddChartBar isEdit={false} onCreateClick={handleCreateClick} />
      <TimeRangeBar
        from={from}
        to={to}
        lastUpdated={lastUpdated}
        refreshTime={refreshTime}
        onChange={handleTimeChange}
        onRefreshChange={handleRefreshChange}
      />
      {/* == ChartSection == */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-6 p-4">
        {chartDataList.length > 0 ? (
          chartDataList.map((chart) => {
            return (
              <div key={chart.chartId} className="flex justify-center">
                <div className="w-full h-[400px]">
                  <ChartWidget
                    type={chart.chartOptions.chartType}
                    datasets={chart.datasets}
                    options={chart.chartOptions}
                  />
                  <div className="flex justify-between mt-2">
                    <button
                      onClick={() => handleEditChart(chart.chartId)}
                      className="text-blue-500 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteChart(chart.chartId)}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p>No charts available</p>
        )}
      </div>
    </div>
  );
};

export default DetailDashboard;
