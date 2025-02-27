import React, { createContext, useContext, useState } from "react";

export type Dataset = {
  label: string;
  data: number[];
  borderColor: string;
  backgroundColor: string;
  tension?: number;
  radius?: number;
};

type ChartOptions = {
  chartType: "bar" | "line" | "pie" | "doughnut";
  showLegend: boolean;
  legendPosition: "top" | "bottom" | "left" | "right";
  legendColor: string;
  isSingleColorMode: boolean;
  borderColor: string;
  backgroundColor: string;
  borderColors: string[];
  backgroundColors: string[];
  titleText: string;
  tooltipBgColor: string;
  tooltipMode: "index" | "nearest";
  hoverMode: "index" | "nearest";
  zoomMode: "xy" | "x" | "y";
  zoomSensitivity: number;
  crosshairColor: string;
  crosshairWidth: number;
  crosshairOpacity: number;
  xGridDisplay: boolean;
  yGridDisplay: boolean;
  showCrosshair: boolean;
  enableZoom: boolean;
  radius: number;
  tension: number;
  // datasets: Dataset[];
  setOptions: (options: Partial<ChartOptions>) => void;
};

const ChartOptionsContext = createContext<ChartOptions | undefined>(undefined);
export const ChartOptionsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [options, setOptionsState] = useState<ChartOptions>({
    chartType: "line",
    showLegend: true,
    legendPosition: "top",
    legendColor: "#000000",
    isSingleColorMode: false,
    borderColor: "rgba(220, 20, 60, 1)",
    backgroundColor: "rgba(220, 20, 60, 0.3)",
    borderColors: ["#ff6384", "#36a2eb", "#ffcd56", "#4bc0c0", "#9966ff"], // ✅ 기본 border 색상
    backgroundColors: [
      "rgba(255, 99, 132, 0.2)",
      "rgba(54, 162, 235, 0.2)",
      "rgba(255, 205, 86, 0.2)",
      "rgba(75, 192, 192, 0.2)",
      "rgba(153, 102, 255, 0.2)",
    ],
    titleText: "Chart Title",
    tooltipBgColor: "#4B4B4B",
    tooltipMode: "index",
    hoverMode: "index",
    zoomMode: "xy",
    zoomSensitivity: 1.0,
    crosshairColor: "#A0A0A0",
    crosshairWidth: 1,
    crosshairOpacity: 1,
    xGridDisplay: true,
    yGridDisplay: true,
    showCrosshair: true,
    enableZoom: true,
    radius: 3,
    tension: 0.3,
    // datasets: [
    //   {
    //     label: "Visitors",
    //     data: [500, 600, 700, 800, 900],
    //     borderColor: "rgba(220, 20, 60, 1)",
    //     backgroundColor: "rgba(220, 20, 60, 0.3)",
    //   },
    //   {
    //     label: "Active Users",
    //     data: [650, 350, 250, 700, 850],
    //     borderColor: "rgba(54, 162, 235, 1)",
    //     backgroundColor: "rgba(54, 162, 235, 0.3)",
    //   },
    // ],
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
