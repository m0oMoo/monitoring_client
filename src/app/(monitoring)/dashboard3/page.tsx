"use client";

import { useEffect, useState } from "react";
import { File, Download } from "lucide-react";
import ChartWidget from "@/app/components/dashboard/chartWidget";
import ReactGridLayout from "react-grid-layout";
import DataBindingPanel from "@/app/components/drawer/dataBindingPanel";
import { fetchDashboardData } from "@/app/api/api";
import TabsGroup from "@/app/(design)/design6/components/tabs/tabsGroup";
import { Tabs } from "@/app/(design)/design6/components/tabs/tabs";

const Dashboard3Page: React.FC = () => {
  const [dashboard, setDashboard] = useState<any>(null); // 📌 대시보드 데이터 상태
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      const data = await fetchDashboardData(); // 📌 동적 데이터 불러오기
      setDashboard(data);
      setIsLoading(false);
    };

    loadDashboard();
  }, []);

  if (isLoading)
    return <div className="text-white text-center">Loading Dashboard...</div>;

  // 📌 JSON 내보내기 함수
  const exportDashboard = () => {
    const jsonString = JSON.stringify(dashboard, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "dashboard_export.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-[#292929] text-white min-h-screen p-6 overflow-hidden">
      <header className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">{dashboard.title}</h1>
        <div className="flex space-x-3">
          <button
            className="flex gap-2 bg-gray-7 p-3 rounded-lg text-white hover:bg-gray-6"
            onClick={() => setIsPanelOpen(true)}
          >
            <File size={20} />
            <p>데이터 바인딩</p>
          </button>
          <button
            className="flex gap-2 bg-gray-7 p-3 rounded-lg text-white hover:bg-gray-6"
            onClick={exportDashboard}
          >
            <Download size={20} />
            <p>내보내기</p>
          </button>
        </div>
      </header>

      <Tabs
        defaultValue="dashboard1"
        className="w-full border-b border-gray-6 pb-2 flex justify-between"
      >
        <TabsGroup />
      </Tabs>

      <div className="w-full h-screen">
        <ReactGridLayout
          className="layout"
          layout={dashboard.charts.map((chart: any, index: number) => ({
            i: chart.chartId,
            x: (index % 4) * 3,
            y: Math.floor(index / 4) * 2,
            w: 3,
            h: 3,
          }))}
          cols={12}
          width={window.innerWidth - 70}
          draggableHandle=".drag-handle"
        >
          {dashboard.charts.map((chart: any) => (
            <div
              key={chart.chartId}
              className="border border-gray-700 rounded-lg"
            >
              <ChartWidget type={chart.type} data={chart.data} />
            </div>
          ))}
        </ReactGridLayout>
      </div>

      <DataBindingPanel
        isOpen={isPanelOpen}
        onClose={() => setIsPanelOpen(false)}
      />
    </div>
  );
};

export default Dashboard3Page;
