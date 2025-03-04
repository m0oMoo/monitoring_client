import StatWidget from "@/app/components/dashboard/statWidget";
import CardWidget from "@/app/components/dashboard/cardWidget";
import CardWidgetWithBarChart from "@/app/components/dashboard/cardWidgetWithBarChart";
import CardWidgetOnlyNumber from "@/app/components/dashboard/cardWidgetOnlyNumber";

interface CommonWidgetProps {
  widgetType: "stat" | "card" | "cardWithChart" | "numberOnly";
  label: string;
  value: string | number;
  maxValue: number;
  thresholds: number[];
  colors: string[];
  subText: string;
  changePercent: number;
  chartData: number[];
  backgroundColor: string;
  textColor: string;
  unit: string;
  arrowVisible: boolean;
  className?: string;
}

const CommonWidget = ({
  widgetType,
  label = "Default Label",
  value = "0",
  maxValue = 100,
  thresholds = [50, 75],
  colors = ["#4CAF50", "#f5f251", "#fc5353"],
  subText = "",
  changePercent = 0,
  chartData = [],
  backgroundColor = "#26415a",
  textColor = "#fff",
  unit = "",
  arrowVisible = false,
  className,
}: CommonWidgetProps) => {
  // value가 숫자가 아니면 기본값 0 설정
  const numericValue = isNaN(Number(value)) ? 0 : Number(value);

  switch (widgetType) {
    case "stat":
      return (
        <StatWidget
          className={className}
          label={label}
          value={numericValue}
          maxValue={maxValue}
          thresholds={thresholds}
          colors={colors}
        />
      );
    case "card":
      return (
        <CardWidget
          className={className}
          title={label}
          value={String(numericValue)}
          subText={subText}
          changePercent={changePercent}
          backgroundColor={backgroundColor}
          textColor={textColor}
          arrowVisible={arrowVisible}
        />
      );
    case "cardWithChart":
      return (
        <CardWidgetWithBarChart
          className={className}
          title={label}
          value={String(numericValue)}
          subText={subText}
          changePercent={changePercent}
          chartData={chartData}
          backgroundColor={backgroundColor}
          textColor={textColor}
          arrowVisible={arrowVisible}
        />
      );
    case "numberOnly":
      return (
        <CardWidgetOnlyNumber
          className={className}
          title={label}
          value={String(numericValue)}
          unit={unit}
          changePercent={changePercent}
          backgroundColor={backgroundColor}
          textColor={textColor}
          arrowVisible={arrowVisible}
        />
      );
    default:
      return null;
  }
};

export default CommonWidget;
