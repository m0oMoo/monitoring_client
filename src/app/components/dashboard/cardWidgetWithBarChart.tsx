import {
  Chart as ChartJS,
  CategoryScale, // ✅ X축용 (범주형 데이터)
  LinearScale, // ✅ Y축용 (숫자형 데이터) 추가
  BarElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

import { Bar } from "react-chartjs-2";
import { ArrowDown, ArrowUp } from "lucide-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  Title
);

interface CardWidgetProps {
  title: string;
  value: string;
  subText?: string;
  changePercent?: number;
  chartData?: number[];
  backgroundColor: string;
}

const CardWidgetWithBarChart = ({
  title,
  value,
  subText,
  changePercent,
  chartData,
  backgroundColor,
}: CardWidgetProps) => {
  return (
    <div
      className={`p-4 rounded-lg shadow-md flex flex-col justify-between`}
      style={{ backgroundColor }}
    >
      {/* 제목 */}
      <div className="text-white text-sm font-semibold">{title}</div>

      {/* 메인 값 */}
      <div className="text-2xl font-bold flex items-center gap-1">
        {value}
        {changePercent !== undefined &&
          (changePercent < 0 ? (
            <ArrowDown size={20} className="text-red-800" />
          ) : (
            <ArrowUp size={20} className="text-green-800" />
          ))}
      </div>

      {/* 부가 정보 */}
      {subText && <div className="text-white text-xs">{subText}</div>}

      {/* 작은 차트 (미니 바 차트) */}
      {chartData && (
        <div className="mt-2 h-10">
          <Bar
            data={{
              labels: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"],
              datasets: [
                {
                  data: chartData,
                  backgroundColor: "rgba(255,255,255,0.7)",
                  borderRadius: 4,
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { display: false },
                tooltip: { enabled: false },
              },
              scales: {
                x: { display: false },
                y: { display: false },
              },
            }}
          />
        </div>
      )}
    </div>
  );
};

export default CardWidgetWithBarChart;
