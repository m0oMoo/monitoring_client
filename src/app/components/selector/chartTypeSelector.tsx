import { BarChart, LineChart, PieChart, Circle } from "lucide-react";

type ChartType = "pie" | "bar" | "line" | "doughnut";

interface ChartTypeSelectorProps {
  chartType: ChartType;
  setChartType: (type: ChartType) => void;
}

const ChartTypeSelector: React.FC<ChartTypeSelectorProps> = ({
  chartType,
  setChartType,
}) => {
  return (
    <div className="mb-4">
      <div className="flex space-x-4">
        <button
          onClick={() => setChartType("pie")}
          className={`p-2 ${
            chartType === "pie"
              ? "bg-navy-btn text-hover"
              : "bg-ivory-bg_primary_secondary hover:bg-navy-hover active:bg-navy-pressed"
          } rounded-xl`}
        >
          <PieChart size={24} />
        </button>
        <button
          onClick={() => setChartType("bar")}
          className={`p-2 ${
            chartType === "bar"
              ? "bg-navy-btn text-hover"
              : "bg-ivory-bg_primary_secondary hover:bg-navy-hover active:bg-navy-pressed"
          } rounded-xl`}
        >
          <BarChart size={24} />
        </button>
        <button
          onClick={() => setChartType("line")}
          className={`p-2 ${
            chartType === "line"
              ? "bg-navy-btn text-hover"
              : "bg-ivory-bg_primary_secondary hover:bg-navy-hover active:bg-navy-pressed"
          } rounded-xl`}
        >
          <LineChart size={24} />
        </button>
        <button
          onClick={() => setChartType("doughnut")}
          className={`p-2 ${
            chartType === "doughnut"
              ? "bg-navy-btn text-hover"
              : "bg-ivory-bg_primary_secondary hover:bg-navy-hover active:bg-navy-pressed"
          } rounded-xl`}
        >
          <Circle size={24} />
        </button>
      </div>
    </div>
  );
};

export default ChartTypeSelector;
