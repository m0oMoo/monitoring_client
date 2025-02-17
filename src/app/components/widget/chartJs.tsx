import { Bar, Line, Pie, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale, // ✅ category 스케일 등록
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { convertToChartJS } from "@/app/utils/convertToChart";

// ✅ Chart.js 모듈 등록
ChartJS.register(
  CategoryScale, // ✅ 반드시 등록해야 함!
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const ChartJSWidget = ({ data }: { data: any }) => {
  const chartData = convertToChartJS(data);

  return (
    <>
      {data.options.chartType === "bar" && (
        <Bar data={chartData} options={chartData.options} />
      )}
      {data.options.chartType === "line" && (
        <Line data={chartData} options={chartData.options} />
      )}
      {data.options.chartType === "pie" && (
        <Pie data={chartData} options={chartData.options} />
      )}
      {data.options.chartType === "doughnut" && (
        <Doughnut data={chartData} options={chartData.options} />
      )}
      {!["bar", "line", "pie", "doughnut"].includes(data.options.chartType) && (
        <p>Invalid chart type</p>
      )}
    </>
  );
};

export default ChartJSWidget;
