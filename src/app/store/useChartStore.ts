import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import { Dataset } from "../context/chartOptionContext";
import { useDashboardStore } from "./useDashboardStore";
import { ChartOptions } from "../types/options";

export interface Chart {
  chartId: string;
  chartOptions: ChartOptions;
  datasets: Dataset[];
}

interface ChartStore {
  charts: Record<string, Chart[]>; // 대시보드 ID → 차트 배열
  addChart: (
    dashboardId: string,
    chartOptions: ChartOptions,
    datasets: Dataset[]
  ) => void;
  updateChart: (
    dashboardId: string,
    chartId: string,
    chartOptions: ChartOptions,
    datasets: Dataset[]
  ) => void;
  removeChart: (dashboardId: string, chartId: string) => void;
  cloneChart: (dashboardId: string, chartId: string) => void;
}

export const useChartStore = create<ChartStore>((set, get) => ({
  charts: {},

  // 차트 추가
  addChart: (dashboardId, chartOptions, datasets) => {
    const newChartId = uuidv4();
    set((state) => ({
      charts: {
        ...state.charts,
        [dashboardId]: [
          ...(state.charts[dashboardId] || []),
          { chartId: newChartId, chartOptions, datasets },
        ],
      },
    }));

    // 대시보드에도 패널 추가
    useDashboardStore
      .getState()
      .addPanelToDashboard(dashboardId, newChartId, "chart");
  },

  // 차트 수정
  updateChart: (dashboardId, chartId, chartOptions, datasets) => {
    set((state) => ({
      charts: {
        ...state.charts,
        [dashboardId]: state.charts[dashboardId]?.map((chart) =>
          chart.chartId === chartId
            ? { ...chart, chartOptions, datasets }
            : chart
        ),
      },
    }));
  },

  // 차트 삭제
  removeChart: (dashboardId, chartId) => {
    set((state) => ({
      charts: {
        ...state.charts,
        [dashboardId]: state.charts[dashboardId]?.filter(
          (chart) => chart.chartId !== chartId
        ),
      },
    }));

    // 대시보드에서도 패널 제거
    useDashboardStore.getState().removeChartFromDashboard(dashboardId, chartId);
  },

  // 차트 복제
  cloneChart: (dashboardId, chartId) => {
    const state = get();
    const chart = state.charts[dashboardId]?.find((c) => c.chartId === chartId);
    if (!chart) return;

    const newChartId = uuidv4();
    set((state) => ({
      charts: {
        ...state.charts,
        [dashboardId]: [
          ...state.charts[dashboardId],
          { ...chart, chartId: newChartId },
        ],
      },
    }));

    // 대시보드에도 패널 추가
    useDashboardStore
      .getState()
      .addPanelToDashboard(dashboardId, newChartId, "chart");
  },
}));
