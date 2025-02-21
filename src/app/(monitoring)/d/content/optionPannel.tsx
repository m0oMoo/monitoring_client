import React, { useState, useEffect } from "react";
import { SketchPicker } from "react-color";
import { FaPalette } from "react-icons/fa";
import Checkbox from "@/app/components/checkbox/checkbox";
import TextInput from "@/app/components/input/textInput";
import NumberInput from "@/app/components/input/numberInput";
import ChartTypeSelector from "@/app/components/selector/chartTypeSelector";
import SquareToggleBtnGroup from "@/app/components/button/toggle/squareBtnGroup";
import ToggleSwitch from "@/app/components/button/toggle/toggleSwitch";

const OptionPanel = () => {
  const [isClient, setIsClient] = useState<boolean>(false);
  const [showLegend, setShowLegend] = useState<boolean>(true);
  const [legendPosition, setLegendPosition] = useState<string>("top");
  const [legendColor, setLegendColor] = useState<string>("#000000");
  const [titleText, setTitleText] = useState<string>("Chart Title");
  const [tooltipBgColor, setTooltipBgColor] = useState<string>("#ffffff");
  const [tooltipMode, setTooltipMode] = useState<string>("index");
  const [xGridDisplay, setXGridDisplay] = useState<boolean>(true);
  const [ySuggestedMin, setYSuggestedMin] = useState<number>(0);
  const [ySuggestedMax, setYSuggestedMax] = useState<number>(100);
  const [hoverMode, setHoverMode] = useState<string>("index");
  const [showCrosshair, setShowCrosshair] = useState<boolean>(true);
  const [crosshairColor, setCrosshairColor] = useState<string>("#ff0000");
  const [crosshairWidth, setCrosshairWidth] = useState<number>(1);
  const [crosshairDash, setCrosshairDash] = useState<string>("solid");
  const [crosshairOpacity, setCrosshairOpacity] = useState<number>(1);
  const [showGridlineOnHover, setShowGridlineOnHover] = useState<boolean>(true);
  const [enableZoom, setEnableZoom] = useState<boolean>(true);
  const [zoomMode, setZoomMode] = useState<string>("xy");
  const [zoomSensitivity, setZoomSensitivity] = useState<number>(1.0);
  const [isPickerVisible, setIsPickerVisible] = useState<boolean>(false);
  const [isPickerVisible2, setIsPickerVisible2] = useState<boolean>(false);
  const [chartType, setChartType] = useState<
    "bar" | "line" | "pie" | "doughnut"
  >("bar");

  // 임시 색상 상태를 각각 범례와 툴팁에 대해 따로 설정
  const [tempLegendColor, setTempLegendColor] = useState<string>(legendColor);
  const [tempTooltipColor, setTempTooltipColor] =
    useState<string>(tooltipBgColor);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLegendColorChange = (color: any) => {
    setTempLegendColor(color.hex); // 임시 범례 색상값 변경
  };

  const handleTooltipColorChange = (color: any) => {
    setTempTooltipColor(color.hex); // 임시 툴팁 색상값 변경
  };

  const confirmLegendColorChange = () => {
    setLegendColor(tempLegendColor);
    setIsPickerVisible(false); // 색상 선택 후 Picker 닫기
  };

  const confirmTooltipColorChange = () => {
    setTooltipBgColor(tempTooltipColor);
    setIsPickerVisible2(false); // 색상 선택 후 Picker 닫기
  };

  const togglePickerVisibility = () => {
    setIsPickerVisible((prevState) => !prevState);
  };

  const togglePickerVisibility2 = () => {
    setIsPickerVisible2((prevState) => !prevState);
  };

  const handleLegendChange = (checked: boolean) => {
    setShowLegend(checked);
  };

  return (
    <div className="bg-ivory-bg_sub border-l border-0.5 no-scrollbar border-navy-border pt-[44px] pl-6 w-[300px] h-[100vh] overflow-y-auto">
      {isClient && (
        <div className="w-full flex flex-col pb-24">
          <h2 className="text-lg font-semibold mb-4">Option</h2>

          {/* Left options panel */}
          <div className="w-1/3">
            {/* Chart type */}
            <div className="flex flex-col gap-1 mb-1.5">
              <label className="text-sm2 text-text2">차트 유형</label>
              <ChartTypeSelector
                chartType={chartType}
                setChartType={setChartType}
              />
            </div>

            {/* Show legend */}
            <div className="flex flex-col gap-1 mb-6">
              <label className="text-sm2 text-text2">범례 표시</label>
              <ToggleSwitch
                checked={showLegend}
                onChange={handleLegendChange}
              />
            </div>

            {/* Legend position */}
            <div className="flex flex-col gap-1 mb-6">
              <label className="text-sm2 text-text2">범례 위치</label>
              <SquareToggleBtnGroup
                label="범례 위치"
                options={["top", "bottom", "right"]}
                selected={legendPosition}
                onChange={setLegendPosition}
              />
            </div>

            {/* Legend color */}
            <div className="flex flex-col gap-1 mb-6">
              <label className="text-sm2 text-text2">범례 색상</label>
              <div className="flex items-center">
                <TextInput
                  value={legendColor}
                  onChange={(value) => setLegendColor(value)}
                  placeholder="색상 코드 입력"
                  className="w-[200px]"
                />
                <button
                  onClick={togglePickerVisibility}
                  className="p-2 rounded-full focus:outline-none"
                >
                  {/* 색상 미리보기 박스 */}
                  <div
                    style={{ backgroundColor: tempLegendColor }}
                    className="w-6 h-6 border rounded-full"
                  />
                </button>
              </div>
            </div>

            {/* Chart title */}
            <div className="flex flex-col gap-1 mb-6">
              <label className="text-sm2 text-text2">차트 제목</label>
              <TextInput
                value={titleText}
                onChange={(value) => setTitleText(value)}
                placeholder="차트 제목"
                className="w-[200px]"
              />
            </div>

            {/* Tooltip background color */}
            <div className="flex flex-col gap-1 mb-6">
              <label className="text-sm2 text-text2">툴팁 배경색</label>
              <div className="flex items-center">
                <TextInput
                  value={tooltipBgColor}
                  onChange={(value) => setTooltipBgColor(value)}
                  placeholder="색상 코드 입력"
                  className="w-[200px]"
                />
                <button
                  onClick={togglePickerVisibility2}
                  className="p-2 rounded-full focus:outline-none"
                >
                  {/* 색상 미리보기 박스 */}
                  <div
                    style={{ backgroundColor: tempTooltipColor }}
                    className="w-6 h-6 border rounded-full"
                  />
                </button>
              </div>
            </div>

            {/* Tooltip mode */}
            <div className="flex flex-col gap-1 mb-6">
              <label className="text-sm2 text-text2">툴팁 모드</label>
              <SquareToggleBtnGroup
                label="툴팁 모드"
                options={["index", "nearest"]}
                selected={tooltipMode}
                onChange={setTooltipMode}
              />
            </div>

            {/* Hover mode */}
            <div className="flex flex-col gap-1 mb-6">
              <label className="text-sm2 text-text2">호버 모드</label>
              <SquareToggleBtnGroup
                label="호버 모드"
                options={["index", "nearest"]}
                selected={hoverMode}
                onChange={setHoverMode}
              />
            </div>

            {/* Zoom mode */}
            <div className="flex flex-col gap-1 mb-6">
              <label className="text-sm2 text-text2">줌 모드</label>
              <SquareToggleBtnGroup
                label="줌 모드"
                options={["xy", "x", "y"]}
                selected={zoomMode}
                onChange={setZoomMode}
              />
            </div>

            {/* Zoom sensitivity */}
            <div className="flex flex-col gap-1 mb-6">
              <label className="text-sm2 text-text2">줌 민감도</label>
              <NumberInput
                value={zoomSensitivity.toString()}
                onChange={(value) => setZoomSensitivity(Number(value))}
                placeholder="줌 민감도"
                className="w-[200px]"
              />
            </div>
          </div>

          {isPickerVisible && (
            <div className="absolute z-10">
              <SketchPicker
                color={tempLegendColor}
                onChange={handleLegendColorChange}
              />
              <button
                className="mt-2 float-right px-3 py-1 shadow-md bg-white border border-gray-2 rounded text-md1"
                onClick={confirmLegendColorChange}
              >
                확인
              </button>
            </div>
          )}
          {isPickerVisible2 && (
            <div className="absolute z-10">
              <SketchPicker
                color={tempTooltipColor}
                onChange={handleTooltipColorChange}
              />
              <button
                className="mt-2 float-right px-3 py-1 shadow-md bg-white border border-gray-2 rounded text-md1"
                onClick={confirmTooltipColorChange}
              >
                확인
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default OptionPanel;
