"use client";

import React, { useState, useEffect } from "react";
import { useChartStore } from "@/app/store/useChartStore";
import { useDashboardStore } from "@/app/store/useDashboardStore";
import { useRouter, useSearchParams } from "next/navigation";
import AddChartBar from "@/app/components/bar/addChartBar";
import TimeRangeBar from "@/app/components/bar/timeRangeBar";
import ChartWidget from "@/app/components/dashboard/chartWidget";
import TabMenu from "@/app/components/menu/tabMenu";
import { MoreVertical } from "lucide-react";

const DetailDashboard = () => {
  const router = useRouter();
  const id = useSearchParams();
  const dashboardId = id.get("id") || "1";

  const { charts, removeChart } = useChartStore();
  const { dashboardChartMap } = useDashboardStore();

  const chartIds = dashboardChartMap[dashboardId] || [];
  const chartDataList = chartIds
    .map((chartId) =>
      charts[dashboardId]?.find((chart) => chart.chartId === chartId)
    )
    .filter(Boolean);

  const [from, setFrom] = useState<string | null>(null);
  const [to, setTo] = useState<string | null>(null);
  const [refreshTime, setRefreshTime] = useState<number | "autoType">(10);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [menuOpenIndex, setMenuOpenIndex] = useState<string | null>(null);

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

  return (
    <div
      className="bg-ivory-bg_sub min-h-[calc(100vh-90px)]"
      onClick={() => setMenuOpenIndex(null)}
    >
      <AddChartBar
        isEdit={false}
        onCreateClick={() => router.push(`/d?id=${dashboardId}`)}
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-6 p-4">
        {chartDataList.length > 0 ? (
          chartDataList.map((chart, index) =>
            chart ? (
              <div key={chart.chartId} className="relative flex justify-center">
                <div
                  className="w-full h-[400px] relative"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="absolute top-2 right-0">
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
                      />
                    )}
                  </div>

                  {/* 차트 위젯 */}
                  <ChartWidget
                    type={chart.chartOptions?.chartType}
                    datasets={chart.datasets || []}
                    options={chart.chartOptions}
                  />
                </div>
              </div>
            ) : null
          )
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
};

export default DetailDashboard;
