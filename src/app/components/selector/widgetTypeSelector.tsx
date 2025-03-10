import { Gauge, SquareStack, BarChart3, Type } from "lucide-react";

type WidgetType = "stat" | "card" | "cardWithChart" | "numberOnly";

interface WidgetTypeSelectorProps {
  widgetType: WidgetType;
  setWidgetType: (type: WidgetType) => void;
}

const WidgetTypeSelector: React.FC<WidgetTypeSelectorProps> = ({
  widgetType,
  setWidgetType,
}) => {
  return (
    <div className="mb-4">
      <div className="flex space-x-4">
        {/* ✅ Stat Widget (도넛형 위젯) */}
        <button
          onClick={() => setWidgetType("stat")}
          className={`p-2 ${
            widgetType === "stat"
              ? "bg-navy-btn text-hover"
              : "bg-ivory-bg_primary_secondary hover:bg-navy-hover active:bg-navy-pressed"
          } rounded-xl transition duration-300`}
        >
          <Gauge size={24} />
        </button>

        {/* ✅ Card Widget (일반 카드형 위젯) */}
        <button
          onClick={() => setWidgetType("card")}
          className={`p-2 ${
            widgetType === "card"
              ? "bg-navy-btn text-hover"
              : "bg-ivory-bg_primary_secondary hover:bg-navy-hover active:bg-navy-pressed"
          } rounded-xl transition duration-300`}
        >
          <SquareStack size={24} />
        </button>

        {/* ✅ Card With Bar Chart Widget (차트 포함 카드 위젯) */}
        <button
          onClick={() => setWidgetType("cardWithChart")}
          className={`p-2 ${
            widgetType === "cardWithChart"
              ? "bg-navy-btn text-hover"
              : "bg-ivory-bg_primary_secondary hover:bg-navy-hover active:bg-navy-pressed"
          } rounded-xl transition duration-300`}
        >
          <BarChart3 size={24} />
        </button>

        {/* ✅ Number Only Widget (숫자만 표시하는 위젯) */}
        <button
          onClick={() => setWidgetType("numberOnly")}
          className={`p-2 ${
            widgetType === "numberOnly"
              ? "bg-navy-btn text-hover"
              : "bg-ivory-bg_primary_secondary hover:bg-navy-hover active:bg-navy-pressed"
          } rounded-xl transition duration-300`}
        >
          <Type size={24} />
        </button>
      </div>
    </div>
  );
};

export default WidgetTypeSelector;
