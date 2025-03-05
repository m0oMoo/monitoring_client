import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import { WidgetType } from "@/app/context/widgetOptionContext";
import { useDashboardStore } from "./useDashboardStore";

interface WidgetData {
  label: string;
  data: any;
}

interface WidgetOptions {
  widgetId: string;
  widgetType: WidgetType;
  widgetData: WidgetData | null;
  label: string;
  maxValue: number;
  subText: string;
  changePercent: number;
  widgetBackgroundColor: string;
  textColor: string;
  colors: string[];
  thresholds: number[];
  unit: string;
  arrowVisible: boolean;
}

interface WidgetStore {
  widgets: Record<string, WidgetOptions[]>;
  setWidgetData: (
    dashboardId: string,
    widgetOptions: Omit<WidgetOptions, "widgetId">,
    widgetId?: string
  ) => void;
  removeWidget: (dashboardId: string, widgetId: string) => void;
}

export const useWidgetStore = create<WidgetStore>((set) => ({
  widgets: {},

  setWidgetData: (dashboardId, widgetOptions, widgetId) => {
    set((state) => {
      const existingWidgets = state.widgets[dashboardId] || [];

      if (widgetId) {
        // ✅ 기존 위젯 업데이트
        const updatedWidgets = existingWidgets.map((widget) =>
          widget.widgetId === widgetId
            ? { ...widget, ...widgetOptions }
            : widget
        );
        return { widgets: { ...state.widgets, [dashboardId]: updatedWidgets } };
      } else {
        // ✅ 새로운 위젯 추가
        const newWidgetId = uuidv4();
        const newWidget = { widgetId: newWidgetId, ...widgetOptions };

        useDashboardStore
          .getState()
          .addChartToDashboard(dashboardId, newWidgetId);

        return {
          widgets: {
            ...state.widgets,
            [dashboardId]: [...existingWidgets, newWidget],
          },
        };
      }
    });
  },

  removeWidget: (dashboardId, widgetId) => {
    set((state) => {
      const updatedWidgets = (state.widgets[dashboardId] || []).filter(
        (widget) => widget.widgetId !== widgetId
      );

      useDashboardStore
        .getState()
        .removeChartFromDashboard(dashboardId, widgetId);

      return {
        widgets: {
          ...state.widgets,
          [dashboardId]: updatedWidgets,
        },
      };
    });
  },
}));
