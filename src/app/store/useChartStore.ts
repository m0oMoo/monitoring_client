import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";

interface ChartStore {
  charts: Record<
    string,
    {
      chartId: string;
      chartData: any;
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
    }[]
  >;
  setChartData: (
    dashboardId: string,
    chartData: any,
    chartOptions: any,
    chartId?: string
  ) => void;
  removeChart: (dashboardId: string, chartId: string) => void;
}

export const useChartStore = create<ChartStore>((set) => ({
  charts: {},
  setChartData: (dashboardId, chartData, chartOptions, chartId) => {
    set((state) => {
      if (chartId) {
        // ✅ 기존 차트 업데이트
        const updatedCharts = state.charts[dashboardId].map((chart) =>
          chart.chartId === chartId
            ? { ...chart, chartData, chartOptions } // 기존 데이터 유지
            : chart
        );
        return { charts: { ...state.charts, [dashboardId]: updatedCharts } };
      } else {
        // ✅ 새로운 차트 추가
        const newChart = {
          chartId: uuidv4(),
          chartData,
          chartOptions,
        };
        return {
          charts: {
            ...state.charts,
            [dashboardId]: [...(state.charts[dashboardId] || []), newChart],
          },
        };
      }
    });
  },
  removeChart: (dashboardId, chartId) => {
    set((state) => ({
      charts: {
        ...state.charts,
        [dashboardId]: state.charts[dashboardId]?.filter(
          (chart) => chart.chartId !== chartId
        ),
      },
    }));
  },
}));
