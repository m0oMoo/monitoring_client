import ChartJSWidget from "../widget/chartJs";
import D3Widget from "../widget/d3";
import PlotlyWidget from "../widget/plotly";

interface ChartComponentProps {
  library: "chartjs" | "plotly" | "d3"; // 차트 라이브러리 선택
  data: any; // 차트에 들어갈 데이터
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
