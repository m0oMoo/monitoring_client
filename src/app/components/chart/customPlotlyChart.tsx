"use client";

import React, { useEffect, useRef, useState } from "react";

interface CustomPlotlyChartProps {
  data: Partial<Plotly.PlotData>[]; // Plotly 데이터
  layout?: Partial<Plotly.Layout>; // Plotly 레이아웃
  config?: Partial<Plotly.Config>; // Plotly 설정
  customCode?: string; // 사용자 정의 코드
}

const CustomPlotlyChart: React.FC<CustomPlotlyChartProps> = ({
  data,
  layout = {},
  config = { responsive: true },
  customCode,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [Plotly, setPlotly] = useState<
    typeof import("plotly.js-dist-min") | null
  >(null);

  useEffect(() => {
    // 클라이언트에서만 실행
    setIsClient(typeof window !== "undefined");

    // 동적으로 Plotly.js 로드
    import("plotly.js-dist-min").then((mod) => {
      setPlotly(mod);
    });
  }, []);

  useEffect(() => {
    if (!isClient || !containerRef.current || !Plotly) return;

    const container = containerRef.current;

    // 사용자 정의 코드 실행
    if (customCode) {
      try {
        const customFunction = new Function("data", "layout", customCode);
        customFunction(data, layout);
      } catch (error) {
        console.error("Error executing custom code:", error);
      }
    }

    // Plotly 차트 렌더링
    Plotly.newPlot(container, data, layout, config);

    // 언마운트 시 리소스 정리
    return () => {
      Plotly.purge(container);
    };
  }, [isClient, Plotly, data, layout, config, customCode]);

  if (!isClient || !Plotly) return <p>Loading Chart...</p>;

  return <div ref={containerRef} style={{ width: "100%", height: "400px" }} />;
};

export default CustomPlotlyChart;
