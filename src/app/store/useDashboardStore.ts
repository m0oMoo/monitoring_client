import { create } from "zustand";

interface DashboardStore {
  dashboardChartMap: Record<string, string[]>; // 대시보드 ID → 차트 ID 배열 매핑
  addChartToDashboard: (dashboardId: string, chartId: string) => void;
  removeChartFromDashboard: (dashboardId: string, chartId: string) => void;
  removeDashboard: (dashboardId: string) => void;
}

export const useDashboardStore = create<DashboardStore>((set) => ({
  dashboardChartMap: {},

  addChartToDashboard: (dashboardId, chartId) => {
    set((state) => ({
      dashboardChartMap: {
        ...state.dashboardChartMap,
        [dashboardId]: [
          ...(state.dashboardChartMap[dashboardId] || []),
          chartId,
        ],
      },
    }));
  },

  removeChartFromDashboard: (dashboardId, chartId) => {
    set((state) => ({
      dashboardChartMap: {
        ...state.dashboardChartMap,
        [dashboardId]: (state.dashboardChartMap[dashboardId] || []).filter(
          (id) => id !== chartId
        ),
      },
    }));
  },

  removeDashboard: (dashboardId) => {
    set((state) => {
      const updatedMap = { ...state.dashboardChartMap };
      delete updatedMap[dashboardId]; // 대시보드 삭제 시 해당 데이터도 삭제
      return { dashboardChartMap: updatedMap };
    });
  },
}));
