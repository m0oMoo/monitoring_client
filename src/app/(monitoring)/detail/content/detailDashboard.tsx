"use client";

import AddChartBar from "@/app/components/bar/addChartBar";
import TimeRangeBar from "@/app/components/bar/timeRangeBar";
import ChartWidget from "@/app/components/dashboard/chartWidget";
import { useChartStore } from "@/app/store/useChartStore";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const DetailDashboard = () => {
  const router = useRouter();
  const id = useSearchParams();
  const dashboardId = id.get("id") || "1";

  const { charts } = useChartStore();
  const chartDataList = charts[dashboardId] || [];

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

  // 🔹 날짜 변경 핸들러
  const handleTimeChange = (type: "from" | "to", value: string) => {
    if (type === "from") setFrom(value);
    if (type === "to") setTo(value);
  };

  // 🔹 새로고침 시간 변경 핸들러
  const handleRefreshChange = (value: number | "autoType") => {
    setRefreshTime(value);
  };

  const handleCreateClick = () => {
    router.push(`/d?id=${dashboardId}`);
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
          chartDataList.map((chart, index) => (
            <div key={index} className="flex justify-center">
              <div className="w-full h-[400px]">
                <ChartWidget
                  type={chart.chartType}
                  data={chart.chartData}
                  options={chart.chartOptions}
                />
              </div>
            </div>
          ))
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
};

export default DetailDashboard;
