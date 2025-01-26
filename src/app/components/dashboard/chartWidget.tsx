import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line, Pie, Doughnut } from "react-chartjs-2";

// Chart.js 모듈 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

type ChartWidgetProps = {
  type: "bar" | "line" | "pie" | "doughnut"; // 지원할 차트 유형
  data: any; // 차트 데이터
};

const ChartWidget = ({ type, data }: ChartWidgetProps) => {
  switch (type) {
    case "bar":
      return <Bar data={data} />;
    case "line":
      return <Line data={data} />;
    case "pie":
      return <Pie data={data} />;
    case "doughnut":
      return <Doughnut data={data} />;
    default:
      return <p>Invalid chart type</p>;
  }
};

export default ChartWidget;
