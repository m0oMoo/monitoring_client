"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

interface Tab {
  value: string;
  label: string;
  description: string;
  content: string;
}

const DashboardPage = () => {
  const idParam = useSearchParams();

  const [id, setId] = useState<string>("");

  useEffect(() => {
    setId(idParam.get("id") || "");
  });

  // 예시로 탭 데이터
  const tabs: Tab[] = [
    {
      value: "dashboard1",
      label: "📊 대시보드 1",
      description: "This is dashboard 1",
      content: "Content for Dashboard 1",
    },
    {
      value: "dashboard2",
      label: "📈 대시보드 2",
      description: "This is dashboard 2",
      content: "Content for Dashboard 2",
    },
    {
      value: "dashboard3",
      label: "🔍 대시보드 3",
      description: "This is dashboard 3",
      content: "Content for Dashboard 3",
    },
    {
      value: "dashboard4",
      label: "📉 대시보드 4",
      description: "This is dashboard 4",
      content: "Content for Dashboard 4",
    },
    {
      value: "dashboard5",
      label: "📑 대시보드 5",
      description: "This is dashboard 5",
      content: "Content for Dashboard 5",
    },
  ];

  // URL에서 받아온 id로 해당 대시보드 찾기
  const selectedTab = tabs.find((tab) => tab.value === id);

  if (!selectedTab) {
    return <div>대시보드를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="bg-[#f8f1dc] text-[#19324b] min-h-screen p-6">
      <header className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-wide mb-6">
          {selectedTab.label}
        </h1>
      </header>

      <div className="mt-6 p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-[#19324b]">설명</h2>
        <p className="text-[#102841] mt-2">{selectedTab.description}</p>

        <h3 className="text-xl font-semibold text-[#19324b] mt-6">
          대시보드 내용
        </h3>
        <p className="text-[#102841] mt-2">{selectedTab.content}</p>
      </div>
    </div>
  );
};

export default DashboardPage;
