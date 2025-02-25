"use client";

import React from "react";
import RightSection from "./content/rightSection";
import ChartSection from "./content/chartSection";
import { ChartOptionsProvider } from "@/app/context/chartOptionContext";

const DashboardDetailPage = () => {
  return (
    <ChartOptionsProvider>
      <div className="relative min-h-screen bg-ivory-bg_sub">
        <ChartSection />
        <RightSection />
      </div>
    </ChartOptionsProvider>
  );
};

export default DashboardDetailPage;
