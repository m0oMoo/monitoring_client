import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
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
  backgroundColor: string;
}

const CardWidget = ({
  title,
  value,
  subText,
  changePercent,
  backgroundColor,
}: CardWidgetProps) => {
  return (
    <div
      className={`p-4 rounded-lg shadow-md flex flex-col justify-between w-72 h-32`}
      style={{ backgroundColor }}
    >
      {/* 제목 */}
      <div className="text-white text-sm font-semibold">{title}</div>

      {/* 메인 값 */}
      <div className="text-2xl font-bold flex items-center gap-1">
        {value}
        {changePercent !== undefined &&
          (changePercent < 0 ? (
            <ArrowDown size={20} className="text-red-500" />
          ) : (
            <ArrowUp size={20} className="text-green-500" />
          ))}
      </div>

      {/* 부가 정보 */}
      {subText && <div className="text-white text-xs">{subText}</div>}
    </div>
  );
};

export default CardWidget;
