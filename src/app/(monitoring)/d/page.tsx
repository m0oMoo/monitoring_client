"use client";

import React, { Suspense } from "react";
import { ChartOptionsProvider } from "@/app/context/chartOptionContext";
import View from "./content/veiw";

const DashboardDetailPage = () => {
  return (
    <ChartOptionsProvider>
      <Suspense>
        <View />
      </Suspense>
    </ChartOptionsProvider>
  );
};

export default DashboardDetailPage;
