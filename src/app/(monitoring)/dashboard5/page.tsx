"use client";

import CardWidget from "@/app/components/dashboard/cardWidget";
import CardWidgetOnlyNumber from "@/app/components/dashboard/cardWidgetOnlyNumber";
import CardWidgetWithBarChart from "@/app/components/dashboard/cardWidgetWithBarChart";
import StatWidget from "@/app/components/dashboard/statWidget";

const Dashboard5 = () => {
  return (
    <div className="mt-[40px] flex flex-col p-5 gap-5">
      <div className="flex gap-5">
        <StatWidget label="CPU 사용률" value={74.8} thresholds={[30, 50]} />
        <StatWidget
          label="메모리 사용량"
          value={1579}
          maxValue={2000}
          thresholds={[1200, 1600]}
        />
        <StatWidget
          label="실행 중인 인스턴스"
          value={10}
          thresholds={[15, 50]}
        />
      </div>
      <div className="flex gap-5">
        <CardWidget
          title="CPU 사용률"
          value="74.8%"
          subText="이전보다 증가"
          changePercent={5.2}
          backgroundColor="#4CAF50"
          arrowVisible={true}
        />
        <CardWidget
          title="메모리 사용량"
          value="1579MB"
          subText="안정적인 상태"
          changePercent={-3.1}
          backgroundColor="#FF5733"
          arrowVisible={false}
        />
        <CardWidget
          title="실행 중인 인스턴스"
          value="10"
          subText="정상 동작 중"
          changePercent={0}
          backgroundColor="#36A2EB"
          arrowVisible={false}
        />
      </div>
      <div className="flex gap-5">
        <CardWidgetWithBarChart
          title="CPU 사용률"
          value="74.8%"
          subText="이전보다 증가"
          changePercent={5.2}
          chartData={[65, 70, 72, 74, 75, 66, 60, 55, 79, 80, 55]}
          backgroundColor="#5bac5e"
          arrowVisible={false}
        />
        <CardWidgetWithBarChart
          title="메모리 사용량"
          value="1579MB"
          subText="안정적인 상태"
          changePercent={-3.1}
          chartData={[
            1600, 1880, 1070, 1565, 1579, 1090, 1100, 1355, 1100, 1620, 1700,
          ]}
          backgroundColor="#f35b50"
          arrowVisible={false}
        />
        <CardWidgetWithBarChart
          title="실행 중인 인스턴스"
          value="10"
          subText="정상 동작 중"
          changePercent={0}
          chartData={[9, 10, 10, 18, 10, 11, 9, 2, 13, 5, 1, 10]}
          backgroundColor="#41a6e9"
          arrowVisible={true}
        />
      </div>
      <div className="flex gap-5">
        <CardWidgetOnlyNumber
          title="CPU 사용률"
          value="74.8"
          unit="%"
          changePercent={5.2}
          backgroundColor="#96df97"
        />
        <CardWidgetOnlyNumber
          title="메모리 사용량"
          value="1579"
          unit="MB"
          changePercent={-3.1}
          backgroundColor="#ff9a91"
          arrowVisible={true}
        />
        <CardWidgetOnlyNumber
          title="실행 중인 인스턴스"
          value="10"
          unit="MB"
          changePercent={11}
          backgroundColor="#abcdff"
        />
      </div>
    </div>
  );
};

export default Dashboard5;
