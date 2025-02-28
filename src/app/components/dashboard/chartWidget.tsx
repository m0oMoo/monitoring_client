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
  // ✅ `options`를 Chart.js 형식으로 변환
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: options?.showLegend ?? true,
        position: options?.legendPosition ?? "top",
        labels: { color: options?.legendColor ?? "#000" },
      },
      tooltip: {
        backgroundColor: options?.tooltipBgColor ?? "#4B4B4B",
      },
      zoom: {
        pan: {
          enabled: options?.enableZoom ?? true,
          mode: options?.zoomMode ?? "xy",
        },
        zoom: {
          wheel: { enabled: options?.enableZoom ?? true },
          pinch: { enabled: options?.enableZoom ?? true },
          mode: options?.zoomMode ?? "xy",
          speed: options?.zoomSensitivity ?? 1.0,
        },
      },
    },
    scales: {
      x: { grid: { display: options?.xGridDisplay ?? true } },
      y: { grid: { display: options?.yGridDisplay ?? true } },
    },
    interaction: { mode: options?.hoverMode ?? "index", intersect: false },
    hover: { mode: options?.hoverMode ?? "index", intersect: false },
    elements: {
      point: {
        radius: options?.showCrosshair ? options?.radius ?? 3 : 0,
        borderWidth: options?.crosshairWidth ?? 1,
      },
      line: { tension: options?.tension ?? 0.3 },
    },
  };

  switch (type) {
    case "bar":
      return <Bar data={data} options={chartOptions} />;
    case "line":
      return <Line data={data} options={chartOptions} />;
    case "pie":
      return <Pie data={data} options={chartOptions} />;
    case "doughnut":
      return <Doughnut data={data} options={chartOptions} />;
    default:
      return <p>Invalid chart type</p>;
  }
};

export default ChartWidget;
