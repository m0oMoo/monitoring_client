import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import { useDashboardStore } from "./useDashboardStore";
import { WidgetOptions } from "../types/options";

export interface Widget {
  widgetId: string;
  widgetOptions: WidgetOptions;
}

interface WidgetStore {
  widgets: Record<string, Widget[]>; // 대시보드 ID → 위젯 배열
  addWidget: (
    dashboardId: string,
    widgetOptions: Omit<WidgetOptions, "widgetId">
  ) => void;
  updateWidget: (
    dashboardId: string,
    widgetId: string,
    widgetOptions: WidgetOptions
  ) => void;
  removeWidget: (dashboardId: string, widgetId: string) => void;
  cloneWidget: (dashboardId: string, widgetId: string) => void;
}

export const useWidgetStore = create<WidgetStore>((set, get) => ({
  widgets: {},

  // ✅ 위젯 추가
  addWidget: (dashboardId, widgetOptions) => {
    const newWidgetId = uuidv4();
    const newWidget: Widget = {
      widgetId: newWidgetId,
      widgetOptions: { ...widgetOptions, widgetId: newWidgetId }, // widgetId 포함
    };

    set((state) => ({
      widgets: {
        ...state.widgets,
        [dashboardId]: [...(state.widgets[dashboardId] || []), newWidget],
      },
    }));

    useDashboardStore
      .getState()
      .dashboardChartMap[dashboardId]?.push(newWidgetId);
  },

  // ✅ 위젯 수정
  updateWidget: (dashboardId, widgetId, widgetOptions) => {
    set((state) => ({
      widgets: {
        ...state.widgets,
        [dashboardId]: state.widgets[dashboardId]?.map((widget) =>
          widget.widgetId === widgetId ? { ...widget, widgetOptions } : widget
        ),
      },
    }));
  },

  // ✅ 위젯 삭제
  removeWidget: (dashboardId, widgetId) => {
    set((state) => ({
      widgets: {
        ...state.widgets,
        [dashboardId]: state.widgets[dashboardId]?.filter(
          (widget) => widget.widgetId !== widgetId
        ),
      },
    }));

    useDashboardStore.getState().dashboardChartMap[dashboardId] =
      useDashboardStore
        .getState()
        .dashboardChartMap[dashboardId]?.filter((id) => id !== widgetId);
  },

  // ✅ 위젯 복제
  cloneWidget: (newDashboardId, widgetId) => {
    const newWidgetId = uuidv4(); // ✅ set() 밖에서 선언하여 사용 가능하도록 변경

    set((state) => {
      // 기존 위젯 찾기
      const originalWidget = Object.values(state.widgets)
        .flat()
        .find((w) => w.widgetId === widgetId);

      if (!originalWidget) return state;

      // 새로운 위젯 데이터 복제
      const clonedWidget: Widget = {
        widgetId: newWidgetId, // ✅ 새로 생성한 ID 사용
        widgetOptions: {
          ...originalWidget.widgetOptions,
          widgetId: newWidgetId, // ✅ 새로운 ID 적용
        },
      };

      return {
        widgets: {
          ...state.widgets,
          [newDashboardId]: [
            ...(state.widgets[newDashboardId] || []),
            clonedWidget,
          ], // ✅ 새로운 대시보드 ID로 복제
        },
      };
    });

    // ✅ 복제된 대시보드의 dashboardChartMap 업데이트
    useDashboardStore
      .getState()
      .dashboardChartMap[newDashboardId]?.push(newWidgetId);
  },
}));
