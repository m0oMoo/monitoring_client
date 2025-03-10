"use client";

import React, { Suspense } from "react";
import { ChartOptionsProvider } from "@/app/context/chartOptionContext";
import View from "./content/veiw";
import { SelectedSectionProvider } from "@/app/context/selectedSectionContext";
import { WidgetOptionsProvider } from "@/app/context/widgetOptionContext";

const DashboardDetailPage = () => {
  return (
    <ChartOptionsProvider>
      <SelectedSectionProvider>
        <WidgetOptionsProvider>
          <Suspense>
            <View />
          </Suspense>
        </WidgetOptionsProvider>
      </SelectedSectionProvider>
    </ChartOptionsProvider>
  );
};

export default DashboardDetailPage;
