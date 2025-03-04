import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

interface StatWidgetProps {
  label: string;
  value: number;
  color: string;
}

const StatWidget = ({ label, value, color }: StatWidgetProps) => {
  const data = {
    datasets: [
      {
        data: [value, 100 - value],
        backgroundColor: [color, "#E0E0E0"],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "80%",
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
      title: {
        display: true,
        text: label,
        color: "#1F1F1F",
        font: {
          size: 16,
          weight: "bold",
          family: "Pretendard, sans-serif",
        } as any,
      },
    },
  };

  return (
    <div
      className="relative flex flex-col items-center justify-center
    border-navy-border pb-3 w-72 h-48 rounded-md shadow-lg bg-white"
    >
      <Doughnut data={data} options={options} />
      <div className="absolute text-3xl font-bold text-text mt-8">{value}</div>
    </div>
  );
};

export default StatWidget;
