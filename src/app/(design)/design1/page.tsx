"use client";

import React, { useState } from "react";
import { Moon, Sun } from "lucide-react";
import Button from "@/app/(design)/components/button/button";
import Card from "@/app/(design)/components/card/card";
import Tabs from "@/app/(design)/components/tabs/tabs";
import TabsContent from "@/app/(design)/components/tabs/tabsContent";
import TabsList from "@/app/(design)/components/tabs/tabsList";
import TabsTrigger from "@/app/(design)/components/tabs/tabsTrigger";

const DesignPage1: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>("overview");

  return (
    <div
      className={
        darkMode
          ? "bg-gray-900 text-white min-h-screen p-6"
          : "bg-white text-black min-h-screen p-6"
      }
    >
      <div className="flex justify-end mb-4">
        <Button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </Button>
      </div>

      <header className="mb-6">
        <h1 className="text-2xl font-bold">모니터링 대시보드</h1>
        <p className="text-gray-400">시스템 모니터링을 위한 대시보드 UI</p>
      </header>

      <Tabs>
        <TabsList>
          <TabsTrigger
            value="overview"
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          >
            개요
          </TabsTrigger>
          <TabsTrigger
            value="charts"
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          >
            차트
          </TabsTrigger>
          <TabsTrigger
            value="reports"
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          >
            보고서
          </TabsTrigger>
          <TabsTrigger
            value="settings"
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          >
            설정
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" activeTab={activeTab}>
          <Card>개요 페이지 내용</Card>
        </TabsContent>
        <TabsContent value="charts" activeTab={activeTab}>
          <Card>차트 UI</Card>
        </TabsContent>
        <TabsContent value="reports" activeTab={activeTab}>
          <Card>보고서 UI</Card>
        </TabsContent>
        <TabsContent value="settings" activeTab={activeTab}>
          <Card>설정 UI</Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DesignPage1;
