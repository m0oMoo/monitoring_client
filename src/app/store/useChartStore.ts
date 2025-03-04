import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import { Dataset } from "../context/chartOptionContext";
import { useDashboardStore } from "./useDashboardStore";

interface ChartStore {
  charts: Record<
    string,
    {
      chartId: string;
      chartOptions: {
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
      };
      datasets: Dataset[];
    }[]
  >;
  setChartData: (
    dashboardId: string,
    chartOptions: any,
    datasets: Dataset[],
    chartId?: string
  ) => void;
  removeChart: (dashboardId: string, chartId: string) => void;
  removeDashboard: (dashboardId: string) => void; // ✅ 대시보드 삭제 추가
}

export const useChartStore = create<ChartStore>((set) => ({
  charts: {},

  setChartData: (dashboardId, chartOptions, datasets, chartId) => {
    set((state) => {
      const existingCharts = state.charts[dashboardId] || [];

      if (chartId) {
        const updatedCharts = existingCharts.map((chart) =>
          chart.chartId === chartId
            ? { ...chart, chartOptions, datasets }
            : chart
        );
        return { charts: { ...state.charts, [dashboardId]: updatedCharts } };
      } else {
        const newChartId = uuidv4();
        const newChart = { chartId: newChartId, chartOptions, datasets };

        useDashboardStore
          .getState()
          .addChartToDashboard(dashboardId, newChartId);

        return {
          charts: {
            ...state.charts,
            [dashboardId]: [...existingCharts, newChart],
          },
        };
      }
    });
  },

  removeChart: (dashboardId, chartId) => {
    set((state) => {
      const updatedCharts = (state.charts[dashboardId] || []).filter(
        (chart) => chart.chartId !== chartId
      );

      useDashboardStore
        .getState()
        .removeChartFromDashboard(dashboardId, chartId);

      return {
        charts: {
          ...state.charts,
          [dashboardId]: updatedCharts,
        },
      };
    });
  },

  removeDashboard: (dashboardId) => {
    set((state) => {
      const updatedCharts = { ...state.charts };
      delete updatedCharts[dashboardId]; // ✅ 해당 대시보드의 모든 차트 삭제
      useDashboardStore.getState().removeDashboard(dashboardId); // ✅ 대시보드 매핑 삭제
      return { charts: updatedCharts };
    });
  },
}));
