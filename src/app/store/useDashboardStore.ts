import { create } from "zustand";

interface Dashboard {
  id: string;
  label: string;
  description: string;
}

interface DashboardStore {
  dashboardChartMap: Record<string, string[]>; // 대시보드 ID → 차트 ID 배열 매핑
  dashboardList: Dashboard[]; // 전체 대시보드 목록
  addDashboard: (dashboard: Dashboard) => void;
  addChartToDashboard: (dashboardId: string, chartId: string) => void;
  removeChartFromDashboard: (dashboardId: string, chartId: string) => void;
  removeDashboard: (dashboardId: string) => void;
}

export const useDashboardStore = create<DashboardStore>((set) => ({
  dashboardChartMap: {},
  dashboardList: [],

  // ✅ 대시보드 추가
  addDashboard: (dashboard) => {
    set((state) => ({
      dashboardList: [...state.dashboardList, dashboard],
      dashboardChartMap: {
        ...state.dashboardChartMap,
        [dashboard.id]: state.dashboardChartMap[dashboard.id] || [], // 기본적으로 빈 배열 할당
      },
    }));
  },

  // ✅ 대시보드에 차트 추가
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

  // ✅ 대시보드에서 특정 차트 제거
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

  // ✅ 대시보드 삭제 (차트 매핑도 제거)
  removeDashboard: (dashboardId) => {
    set((state) => {
      const updatedMap = { ...state.dashboardChartMap };
      delete updatedMap[dashboardId];
      return {
        dashboardChartMap: updatedMap,
        dashboardList: state.dashboardList.filter(
          (dashboard) => dashboard.id !== dashboardId
        ),
      };
    });
  },
}));
