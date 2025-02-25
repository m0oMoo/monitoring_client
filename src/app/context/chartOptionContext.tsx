import React, { createContext, useContext, useState } from "react";

type ChartOptions = {
  chartType: "bar" | "line" | "pie" | "doughnut";
  showLegend: boolean;
  legendPosition: string;
  legendColor: string;
  titleText: string;
  tooltipBgColor: string;
  tooltipMode: string;
  hoverMode: string;
  zoomMode: string;
  zoomSensitivity: number;
  crosshairColor: string;
  crosshairWidth: number;
  setOptions: (options: Partial<ChartOptions>) => void;
};

const ChartOptionsContext = createContext<ChartOptions | undefined>(undefined);

export const ChartOptionsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [options, setOptionsState] = useState<ChartOptions>({
    chartType: "bar",
    showLegend: true,
    legendPosition: "top",
    legendColor: "#000000",
    titleText: "Chart Title",
    tooltipBgColor: "#ffffff",
    tooltipMode: "index",
    hoverMode: "index",
    zoomMode: "xy",
    zoomSensitivity: 1.0,
    crosshairColor: "#ff0000",
    crosshairWidth: 1,
    setOptions: () => {},
  });

  const setOptions = (newOptions: Partial<ChartOptions>) => {
    setOptionsState((prev) => ({ ...prev, ...newOptions }));
  };

  return (
    <ChartOptionsContext.Provider value={{ ...options, setOptions }}>
      {children}
    </ChartOptionsContext.Provider>
  );
};

export const useChartOptions = () => {
  const context = useContext(ChartOptionsContext);
  if (!context) {
    throw new Error(
      "useChartOptions must be used within a ChartOptionsProvider"
    );
  }
  return context;
};
