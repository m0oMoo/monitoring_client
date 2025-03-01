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
import { Dataset } from "@/app/context/chartOptionContext";

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
  type: "bar" | "line" | "pie" | "doughnut";
  datasets: Dataset[];
  options?: any;
};

const ChartWidget = ({ type, datasets, options }: ChartWidgetProps) => {
  // ✅ `datasets`을 기반으로 `data` 생성
  const chartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    datasets: datasets.map((dataset, index) => ({
      ...dataset,
      borderColor: options?.isSingleColorMode
        ? options?.borderColor
        : options?.borderColors?.[index % options?.borderColors?.length],
      backgroundColor: options?.isSingleColorMode
        ? options?.backgroundColor
        : options?.backgroundColors?.[
            index % options?.backgroundColors?.length
          ],
      borderWidth: options?.crosshairWidth ?? 1,
      fill: true,
    })),
  };

  // ✅ 차트 옵션 정의
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: options?.showLegend ?? true,
        position: options?.legendPosition ?? "top",
        labels: { color: options?.legendColor ?? "#000" },
      },
      tooltip: { backgroundColor: options?.tooltipBgColor ?? "#4B4B4B" },
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
      return <Bar data={chartData} options={chartOptions} />;
    case "line":
      return <Line data={chartData} options={chartOptions} />;
    case "pie":
      return <Pie data={chartData} options={chartOptions} />;
    case "doughnut":
      return <Doughnut data={chartData} options={chartOptions} />;
    default:
      return <p>Invalid chart type</p>;
  }
};

export default ChartWidget;
