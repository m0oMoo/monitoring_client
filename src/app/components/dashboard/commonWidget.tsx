import StatWidget from "@/app/components/dashboard/statWidget";
import CardWidget from "@/app/components/dashboard/cardWidget";
import CardWidgetWithBarChart from "@/app/components/dashboard/cardWidgetWithBarChart";
import CardWidgetOnlyNumber from "@/app/components/dashboard/cardWidgetOnlyNumber";

interface CommonWidgetProps {
  widgetType: "stat" | "card" | "cardWithChart" | "numberOnly";
  label: string;
  widgetData: { label: string; data: any } | null;
  maxValue: number;
  thresholds: number[];
  colors: string[];
  subText: string;
  changePercent: number;
  backgroundColor: string;
  textColor: string;
  unit: string;
  arrowVisible: boolean;
  className?: string;
}

// ✅ 위젯 타입에 맞게 데이터를 변환하는 함수
const parseWidgetData = (
  widgetType: CommonWidgetProps["widgetType"],
  widgetData: { label: string; data: any } | null
) => {
  if (!widgetData || !widgetData.data) {
    return { value: "0", chartData: [] };
  }

  // ✅ data가 배열이면 마지막 요소를 가져옴
  let lastValue = Array.isArray(widgetData.data)
    ? widgetData.data[widgetData.data.length - 1] // 🔹 가장 최신 데이터
    : widgetData.data;

  const numericValue = isNaN(Number(lastValue)) ? 0 : Number(lastValue);

  if (widgetType === "cardWithChart") {
    // ✅ `cardWithChart`는 전체 배열 데이터를 `chartData`로 사용
    const chartData =
      Array.isArray(widgetData.data) && widgetData.data.every((d) => !isNaN(d))
        ? widgetData.data
        : [numericValue]; // 기본적으로 숫자 값만 있다면 배열로 변환

    return { value: String(numericValue), chartData };
  }

  return { value: String(numericValue) };
};

const CommonWidget = ({
  widgetType,
  label = "Default Label",
  widgetData = null,
  maxValue = 100,
  thresholds = [50, 75],
  colors = ["#4CAF50", "#f5f251", "#fc5353"],
  subText = "",
  changePercent = 0,
  backgroundColor = "#26415a",
  textColor = "#fff",
  unit = "",
  arrowVisible = false,
  className,
}: CommonWidgetProps) => {
  const { value, chartData } = parseWidgetData(widgetType, widgetData);

  switch (widgetType) {
    case "stat":
      return (
        <StatWidget
          className={className}
          label={label}
          value={parseFloat(value)}
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
          value={value}
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
          value={value}
          subText={subText}
          changePercent={changePercent}
          chartData={chartData} // ✅ 차트 데이터 전달
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
          value={value}
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
