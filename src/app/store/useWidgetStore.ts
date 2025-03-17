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

  // 위젯 추가
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

    // 대시보드에도 패널 추가
    useDashboardStore
      .getState()
      .addPanelToDashboard(dashboardId, newWidgetId, "widget");
  },

  // 위젯 수정
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

  // 위젯 삭제
  removeWidget: (dashboardId, widgetId) => {
    set((state) => ({
      widgets: {
        ...state.widgets,
        [dashboardId]: state.widgets[dashboardId]?.filter(
          (widget) => widget.widgetId !== widgetId
        ),
      },
    }));

    // 대시보드에서도 패널 제거
    useDashboardStore
      .getState()
      .removeChartFromDashboard(dashboardId, widgetId);
  },

  // 위젯 복제
  cloneWidget: (dashboardId, widgetId) => {
    const state = get();
    const originalWidget = state.widgets[dashboardId]?.find(
      (w) => w.widgetId === widgetId
    );
    if (!originalWidget) return;

    const newWidgetId = uuidv4();
    const clonedWidget: Widget = {
      widgetId: newWidgetId,
      widgetOptions: {
        ...originalWidget.widgetOptions,
        widgetId: newWidgetId,
      },
    };

    set((state) => ({
      widgets: {
        ...state.widgets,
        [dashboardId]: [...(state.widgets[dashboardId] || []), clonedWidget],
      },
    }));

    // 대시보드에도 패널 추가
    useDashboardStore
      .getState()
      .addPanelToDashboard(dashboardId, newWidgetId, "widget");
  },
}));
