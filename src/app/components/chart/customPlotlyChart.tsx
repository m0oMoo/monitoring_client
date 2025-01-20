import React, { useEffect, useRef } from "react";
import Plotly from "plotly.js-dist-min";

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

  useEffect(() => {
    const container = containerRef.current;

    if (container) {
      // 사용자 정의 코드 적용
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
    }
  }, [data, layout, config, customCode]);

  return <div ref={containerRef} style={{ width: "100%", height: "400px" }} />;
};

export default CustomPlotlyChart;
