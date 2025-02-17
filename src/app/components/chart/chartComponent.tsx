import dynamic from "next/dynamic";

const ChartJSWidget = dynamic(() => import("../widget/chartJs"), {
  ssr: false,
});
const D3Widget = dynamic(() => import("../widget/d3"), { ssr: false });
const PlotlyWidget = dynamic(() => import("../widget/plotly"), { ssr: false });

interface ChartComponentProps {
  library: "chartjs" | "plotly" | "d3";
  data: any;
}

const ChartComponent = ({ library, data }: ChartComponentProps) => {
  switch (library) {
    case "chartjs":
      return <ChartJSWidget data={data} />;
    case "plotly":
      return <PlotlyWidget data={data} />;
    case "d3":
      return <D3Widget data={data} />;
    default:
      return <p>올바른 차트 라이브러리를 선택하세요.</p>;
  }
};

export default ChartComponent;
