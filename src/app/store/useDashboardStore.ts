import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

interface Dashboard {
  id: string;
  label: string;
  description: string;
}

export interface PanelLayout {
  panelId: string;
  type: "chart" | "widget" | "table";
  x: number;
  y: number;
  w: number;
  h: number;
}

interface DashboardStore {
  dashboardList: Dashboard[]; // 전체 대시보드 목록
  dashboardPanels: Record<string, PanelLayout[]>; // 대시보드 ID → 패널 리스트
  addDashboard: (dashboard: Dashboard) => void;
  updateDashboard: (
    dashboardId: string,
    newLabel: string,
    newDescription: string
  ) => void;
  addPanelToDashboard: (
    dashboardId: string,
    panelId: string,
    type: "chart" | "widget" | "table"
  ) => void;
  saveDashboard: (dashboardId: string, layouts: PanelLayout[]) => void;
  removeChartFromDashboard: (dashboardId: string, chartId: string) => void;
  removeDashboard: (dashboardId: string) => void;
  cloneDashboard: (dashboardId: string) => void;
}

export const useDashboardStore = create<DashboardStore>()(
  persist(
    devtools((set, get) => ({
      dashboardList: [],
      dashboardPanels: {},

      // 대시보드 추가
      addDashboard: (dashboard) => {
        set((state) => ({
          dashboardList: [...state.dashboardList, dashboard],
          dashboardPanels: {
            ...state.dashboardPanels,
            [dashboard.id]: [], // 초기 패널 배열
          },
        }));
      },

      // 대시보드 이름 및 설명 수정
      updateDashboard: (dashboardId, newLabel, newDescription) => {
        set((state) => ({
          dashboardList: state.dashboardList.map((dashboard) =>
            dashboard.id === dashboardId
              ? { ...dashboard, label: newLabel, description: newDescription }
              : dashboard
          ),
        }));
      },

      // 패널 추가 (차트, 위젯, 테이블)
      addPanelToDashboard: (dashboardId, panelId, type) => {
        set((state) => ({
          dashboardPanels: {
            ...state.dashboardPanels,
            [dashboardId]: [
              ...(state.dashboardPanels[dashboardId] || []),
              { panelId, type, x: 0, y: 0, w: 2, h: 2 }, // 기본 위치
            ],
          },
        }));
      },

      // 대시보드 저장 (패널 위치 정보 포함)
      saveDashboard: (dashboardId, layouts) => {
        set((state) => ({
          dashboardPanels: {
            ...state.dashboardPanels,
            [dashboardId]: layouts,
          },
        }));
      },

      // 특정 차트 제거
      removeChartFromDashboard: (dashboardId, chartId) => {
        set((state) => ({
          dashboardPanels: {
            ...state.dashboardPanels,
            [dashboardId]: state.dashboardPanels[dashboardId]?.filter(
              (panel) => panel.panelId !== chartId
            ),
          },
        }));
      },

      // 대시보드 삭제
      removeDashboard: (dashboardId) => {
        set((state) => ({
          dashboardList: state.dashboardList.filter(
            (dashboard) => dashboard.id !== dashboardId
          ),
          dashboardPanels: Object.keys(state.dashboardPanels)
            .filter((id) => id !== dashboardId)
            .reduce((acc, id) => {
              acc[id] = state.dashboardPanels[id];
              return acc;
            }, {} as Record<string, PanelLayout[]>),
        }));
      },

      // 대시보드 복제
      cloneDashboard: (dashboardId) => {
        const newDashboardId = crypto.randomUUID();
        const state = get();

        set((state) => ({
          dashboardList: [
            ...state.dashboardList,
            {
              ...state.dashboardList.find((d) => d.id === dashboardId)!,
              id: newDashboardId,
            },
          ],
          dashboardPanels: {
            ...state.dashboardPanels,
            [newDashboardId]: [...(state.dashboardPanels[dashboardId] || [])],
          },
        }));
      },
    })),
    {
      name: "dashboard-storage", // persist 미들웨어 적용 (새로고침해도 유지)
    }
  )
);
