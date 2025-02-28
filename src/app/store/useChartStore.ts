import { create } from "zustand";

interface ChartStore {
  charts: Record<string, any[]>;
  setChartData: (
    dashboardId: string,
    chartData: any,
    chartOptions: any,
    chartType: string,
    titleText: string
  ) => void;
}

export const useChartStore = create<ChartStore>((set) => ({
  charts: {},
  setChartData: (
    dashboardId,
    chartData,
    chartOptions,
    chartType,
    titleText
  ) => {
    set((state) => ({
      charts: {
        ...state.charts,
        [dashboardId]: [
          ...(state.charts[dashboardId] || []),
          { chartData, chartOptions, chartType, titleText },
        ],
      },
    }));
  },
}));
