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
  updateDashboard: (
    dashboardId: string,
    newLabel: string,
    newDescription: string
  ) => void;
  addChartToDashboard: (dashboardId: string, chartId: string) => void;
  removeChartFromDashboard: (dashboardId: string, chartId: string) => void;
  removeDashboard: (dashboardId: string) => void;
}

export const useDashboardStore = create<DashboardStore>((set) => ({
  dashboardChartMap: {},
  dashboardList: [],

  // 대시보드 추가
  addDashboard: (dashboard) => {
    set((state) => ({
      dashboardList: [...state.dashboardList, dashboard],
      dashboardChartMap: {
        ...state.dashboardChartMap,
        [dashboard.id]: state.dashboardChartMap[dashboard.id] || [], // 기존 차트 매핑 유지
      },
    }));
  },

  // 기존의 대시보드를 업데이트하는 함수 추가 (설명과 이름만 변경)
  updateDashboard: (dashboardId, newLabel, newDescription) => {
    set((state) => {
      const existingCharts = state.dashboardChartMap[dashboardId] || []; // 기존 차트 유지

      return {
        dashboardList: state.dashboardList.map((dashboard) =>
          dashboard.id === dashboardId
            ? { ...dashboard, label: newLabel, description: newDescription }
            : dashboard
        ),
        dashboardChartMap: {
          ...state.dashboardChartMap,
          [dashboardId]: existingCharts, // 기존 차트 정보 유지
        },
      };
    });
  },

  // 대시보드에 차트 추가
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

  // 대시보드에서 특정 차트 제거
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

  // 대시보드 삭제 (차트 매핑도 제거)
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
