import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import { Dataset } from "../context/chartOptionContext";

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
}

export const useChartStore = create<ChartStore>((set) => ({
  charts: {},
  setChartData: (dashboardId, chartOptions, datasets, chartId) => {
    set((state) => {
      // ✅ dashboardId가 존재하지 않으면 빈 배열 할당하여 오류 방지
      const existingCharts = state.charts[dashboardId] || [];

      if (chartId) {
        // ✅ 기존 차트 업데이트 (datasets 포함)
        const updatedCharts = existingCharts.map((chart) =>
          chart.chartId === chartId
            ? { ...chart, chartOptions, datasets }
            : chart
        );
        return { charts: { ...state.charts, [dashboardId]: updatedCharts } };
      } else {
        // ✅ 새로운 차트 추가 (datasets 포함)
        const newChart = {
          chartId: uuidv4(),
          chartOptions,
          datasets,
        };
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
    set((state) => ({
      charts: {
        ...state.charts,
        [dashboardId]: (state.charts[dashboardId] || []).filter(
          (chart) => chart.chartId !== chartId
        ),
      },
    }));
  },
}));
