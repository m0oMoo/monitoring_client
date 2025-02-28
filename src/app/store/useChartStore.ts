import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";

interface ChartStore {
  charts: Record<string, any[]>; // 대시보드별 차트들
  setChartData: (
    dashboardId: string,
    chartData: any,
    chartOptions: any,
    chartType: string,
    titleText: string,
    chartId?: string
  ) => void; // chartId가 있을 때 기존 차트 업데이트
  removeChart: (dashboardId: string, chartId: string) => void;
}

export const useChartStore = create<ChartStore>((set) => ({
  charts: {},
  setChartData: (
    dashboardId,
    chartData,
    chartOptions,
    chartType,
    titleText,
    chartId
  ) => {
    if (chartId) {
      // 차트가 존재하는 경우 업데이트
      set((state) => {
        const updatedCharts = state.charts[dashboardId].map((chart) =>
          chart.chartId === chartId
            ? { ...chart, chartData, chartOptions, chartType, titleText } // 기존 차트 업데이트
            : chart
        );
        return {
          charts: {
            ...state.charts,
            [dashboardId]: updatedCharts,
          },
        };
      });
    } else {
      // 차트가 존재하지 않으면 새로 추가
      const newChartId = uuidv4(); // 새 chartId 생성
      set((state) => ({
        charts: {
          ...state.charts,
          [dashboardId]: [
            ...(state.charts[dashboardId] || []),
            {
              chartId: newChartId,
              chartData,
              chartOptions,
              chartType,
              titleText,
            },
          ],
        },
      }));
    }
  },
  removeChart: (dashboardId: string, chartId: string) => {
    set((state) => {
      const newCharts =
        state.charts[dashboardId]?.filter(
          (chart) => chart.chartId !== chartId
        ) || [];
      return {
        charts: {
          ...state.charts,
          [dashboardId]: newCharts,
        },
      };
    });
  },
}));
