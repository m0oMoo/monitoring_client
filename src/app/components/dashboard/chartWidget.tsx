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
  options?: any;
};

const ChartWidget = ({ type, data, options }: ChartWidgetProps) => {
  switch (type) {
    case "bar":
      return <Bar data={data} options={options} />;
    case "line":
      return <Line data={data} options={options} />;
    case "pie":
      return <Pie data={data} options={options} />;
    case "doughnut":
      return <Doughnut data={data} options={options} />;
    default:
      return <p>Invalid chart type</p>;
  }
};

export default ChartWidget;
