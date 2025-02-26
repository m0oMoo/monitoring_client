import React, { createContext, useContext, useState } from "react";

type ChartOptions = {
  chartType: "bar" | "line" | "pie" | "doughnut";
  showLegend: boolean;
  legendPosition: "top" | "bottom" | "left" | "right";
  legendColor: string;
  backgroundColor: string;
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
  setOptions: (options: Partial<ChartOptions>) => void;
};

const ChartOptionsContext = createContext<ChartOptions | undefined>(undefined);

export const ChartOptionsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [options, setOptionsState] = useState<ChartOptions>({
    chartType: "line", // 기본 차트 유형
    showLegend: true, // 범례 표시 여부
    legendPosition: "top", // 기본 범례 위치
    legendColor: "#000000", // 범례 색상
    backgroundColor: "#8296ad", // 백그라운드 색상
    titleText: "Chart Title", // 기본 제목
    tooltipBgColor: "#4B4B4B", // 툴팁 배경색 (기본 흰색)
    tooltipMode: "index", // 툴팁 모드
    hoverMode: "index", // 호버 모드
    zoomMode: "xy", // 줌 모드 (x, y축 둘 다)
    zoomSensitivity: 1.0, // 줌 민감도 기본값
    crosshairColor: "#A0A0A0", // 크로스헤어 색상 (빨강)
    crosshairWidth: 1, // 크로스헤어 두께 (기본 1px)
    crosshairOpacity: 1, // 크로스헤어 투명도 (1 = 불투명)
    xGridDisplay: true, // X축 그리드 라인 표시 여부
    yGridDisplay: true, // Y축 그리드 라인 표시 여부
    showCrosshair: true, // 크로스헤어 표시 여부
    enableZoom: true, // 줌 기능 활성화 여부
    radius: 3, // 도트 크기
    tension: 0.3, // 곡률 (line에서만 적용)
    setOptions: () => {}, // 이후 setOptions 함수가 설정됨
  });

  const setOptions = (newOptions: Partial<ChartOptions>) => {
    setOptionsState((prev) => ({ ...prev, ...newOptions }));
  };

  return (
    <ChartOptionsContext.Provider value={{ ...options, setOptions }}>
      {children}
    </ChartOptionsContext.Provider>
  );
};

export const useChartOptions = () => {
  const context = useContext(ChartOptionsContext);
  if (!context) {
    throw new Error(
      "useChartOptions must be used within a ChartOptionsProvider"
    );
  }
  return context;
};
