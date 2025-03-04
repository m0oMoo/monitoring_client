"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type WidgetType = "stat" | "card" | "cardWithChart" | "numberOnly";

interface WidgetOptions {
  widgetType: WidgetType;
  label: string;
  value: string;
  maxValue: number;
  thresholds: number[];
  colors: string[];
  subText: string;
  changePercent: number;
  chartData: number[];
  widgetBackgroundColor: string;
  textColor: string;
  unit: string;
  arrowVisible: boolean;
  setWidgetOptions: (options: Partial<WidgetOptions>) => void;
  setWidgetType: (type: WidgetType) => void;
}

const WidgetOptionsContext = createContext<WidgetOptions | undefined>(
  undefined
);

export const WidgetOptionsProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [widgetOptions, setWidgetOptionsState] = useState<WidgetOptions>({
    widgetType: "stat",
    label: "",
    value: "",
    maxValue: 100,
    thresholds: [50, 75],
    colors: ["#4CAF50", "#f5f251", "#fc5353"],
    subText: "",
    changePercent: 0,
    chartData: [],
    widgetBackgroundColor: "#26415a",
    textColor: "#fff",
    unit: "",
    arrowVisible: false,
    setWidgetOptions: () => {},
    setWidgetType: () => {},
  });

  const setWidgetOptions = (newOptions: Partial<WidgetOptions>) => {
    setWidgetOptionsState((prev) => ({ ...prev, ...newOptions }));
  };

  const setWidgetType = (type: WidgetType) => {
    setWidgetOptionsState((prev) => ({ ...prev, widgetType: type }));
  };

  return (
    <WidgetOptionsContext.Provider
      value={{ ...widgetOptions, setWidgetOptions, setWidgetType }}
    >
      {children}
    </WidgetOptionsContext.Provider>
  );
};

export const useWidgetOptions = () => {
  const context = useContext(WidgetOptionsContext);
  if (!context) {
    throw new Error(
      "useWidgetOptions must be used within a WidgetOptionsProvider"
    );
  }
  return context;
};
