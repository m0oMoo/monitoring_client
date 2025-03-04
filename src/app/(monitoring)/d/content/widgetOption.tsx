import { useEffect, useState } from "react";
import WidgetTypeSelector from "@/app/components/selector/widgetTypeSelector";
import TextInput from "@/app/components/input/textInput";
import ToggleSwitch from "@/app/components/button/toggle/toggleSwitch";
import { HexAlphaColorPicker } from "react-colorful";
import { useWidgetOptions } from "@/app/context/widgetOptionContext";

const WidgetOption = () => {
  const [isClient, setIsClient] = useState<boolean>(false);
  const [isBgPickerVisible, setIsBgPickerVisible] = useState<boolean>(false);
  const [isTextColorPickerVisible, setIsTextColorPickerVisible] =
    useState<boolean>(false);

  const {
    widgetType,
    setWidgetType,
    label,
    value,
    maxValue,
    subText,
    changePercent,
    chartData,
    widgetBackgroundColor,
    textColor,
    unit,
    arrowVisible,
    setWidgetOptions,
  } = useWidgetOptions();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const [isPickerVisible, setIsPickerVisible] = useState<boolean>(false);
  const [isPickerVisible2, setIsPickerVisible2] = useState<boolean>(false);

  const [tempBackgroundColor, setTempBackgroundColor] = useState<string>(
    widgetBackgroundColor
  );
  const [tempTextColor, setTempTextColor] = useState<string>(textColor);

  const handleBackgroundColorChange = (color: any) => {
    setTempBackgroundColor(color);
  };

  const handleTextColorChange = (color: any) => {
    setTempTextColor(color);
  };

  const confirmBackgroundColorChange = () => {
    setWidgetOptions({ widgetBackgroundColor: tempBackgroundColor });
    setIsPickerVisible(false);
  };

  const confirmTextColorChange = () => {
    setWidgetOptions({ textColor: tempTextColor });
    setIsPickerVisible2(false);
  };

  const togglePickerVisibility = () => {
    setIsPickerVisible((prevState) => !prevState);
    setIsPickerVisible2(false);
  };

  const togglePickerVisibility2 = () => {
    setIsPickerVisible2((prevState) => !prevState);
    setIsPickerVisible(false);
  };

  return (
    <div className="bg-ivory-bg_sub border-l border-0.5 no-scrollbar border-navy-border py-8 pl-6 w-[300px] h-[100vh] overflow-y-auto">
      {isClient && (
        <div className="w-full flex flex-col pb-24">
          <h2 className="text-lg font-semibold mb-4">Widget Option</h2>
          <div>
            {/* 위젯 유형 선택 */}
            <div className="flex flex-col gap-1 mb-1.5">
              <label className="text-sm2 text-text2">위젯 유형</label>
              <WidgetTypeSelector
                widgetType={widgetType}
                setWidgetType={setWidgetType}
              />
            </div>

            {/* 위젯 유형별 옵션 */}
            {widgetType === "stat" && (
              <>
                <div className="flex flex-col gap-1 mb-6">
                  <label className="text-sm2 text-text2">값</label>
                  <TextInput
                    value={value}
                    onChange={(e) => setWidgetOptions({ value: e })}
                  />
                </div>
                <div className="flex flex-col gap-1 mb-6">
                  <label className="text-sm2 text-text2">최대값</label>
                  <TextInput
                    value={maxValue.toString()}
                    onChange={(e) => setWidgetOptions({ maxValue: Number(e) })}
                  />
                </div>
              </>
            )}

            {(widgetType === "card" || widgetType === "cardWithChart") && (
              <>
                <div className="flex flex-col gap-1 mb-6">
                  <label className="text-sm2 text-text2">타이틀</label>
                  <TextInput
                    value={label}
                    onChange={(e) => setWidgetOptions({ label: e })}
                  />
                </div>
                <div className="flex flex-col gap-1 mb-6">
                  <label className="text-sm2 text-text2">값</label>
                  <TextInput
                    value={value}
                    onChange={(e) => setWidgetOptions({ value: e })}
                  />
                </div>
                <div className="flex flex-col gap-1 mb-6">
                  <label className="text-sm2 text-text2">설명</label>
                  <TextInput
                    value={subText}
                    onChange={(e) => setWidgetOptions({ subText: e })}
                  />
                </div>
                <div className="flex flex-col gap-1 mb-6">
                  <label className="text-sm2 text-text2">변화율 (%)</label>
                  <TextInput
                    value={changePercent?.toString() ?? ""}
                    onChange={(e) =>
                      setWidgetOptions({ changePercent: Number(e) })
                    }
                  />
                </div>
                <div className="flex flex-col gap-1 mb-6">
                  <label className="text-sm2 text-text2">표시</label>
                  <ToggleSwitch
                    checked={arrowVisible}
                    onChange={(checked) =>
                      setWidgetOptions({ arrowVisible: checked })
                    }
                  />
                </div>
              </>
            )}

            {widgetType === "cardWithChart" && (
              <div className="flex flex-col gap-1 mb-6">
                <label className="text-sm2 text-text2">
                  차트 데이터 (쉼표로 구분)
                </label>
                <TextInput
                  value={chartData.join(",")}
                  onChange={(e) =>
                    setWidgetOptions({ chartData: e.split(",").map(Number) })
                  }
                />
              </div>
            )}

            {widgetType === "numberOnly" && (
              <>
                <div className="flex flex-col gap-1 mb-6">
                  <label className="text-sm2 text-text2">타이틀</label>
                  <TextInput
                    value={label}
                    onChange={(e) => setWidgetOptions({ label: e })}
                  />
                </div>
                <div className="flex flex-col gap-1 mb-6">
                  <label className="text-sm2 text-text2">값</label>
                  <TextInput
                    value={value}
                    onChange={(e) => setWidgetOptions({ value: e })}
                  />
                </div>
                <div className="flex flex-col gap-1 mb-6">
                  <label className="text-sm2 text-text2">단위</label>
                  <TextInput
                    value={unit}
                    onChange={(e) => setWidgetOptions({ unit: e })}
                  />
                </div>
              </>
            )}

            {/* 배경색 선택 */}
            <div className="flex flex-col gap-1 mb-6">
              <label className="text-sm2 text-text2">배경색</label>
              <div className="flex items-center">
                <TextInput
                  value={widgetBackgroundColor}
                  onChange={(value) =>
                    setWidgetOptions({ widgetBackgroundColor: value })
                  }
                  placeholder="색상 코드 입력"
                  className="w-[200px]"
                />
                <button
                  onClick={togglePickerVisibility}
                  className="p-2 rounded-full focus:outline-none"
                >
                  <div
                    style={{ backgroundColor: widgetBackgroundColor }}
                    className="w-6 h-6 border rounded-full"
                  />
                </button>
              </div>
              {isBgPickerVisible && (
                <HexAlphaColorPicker
                  color={widgetBackgroundColor}
                  onChange={(color) =>
                    setWidgetOptions({ widgetBackgroundColor: color })
                  }
                />
              )}
            </div>

            {/* 텍스트 색상 선택 */}
            <div className="flex flex-col gap-1 mb-6">
              <label className="text-sm2 text-text2">텍스트 색상</label>
              <div className="flex items-center">
                <TextInput
                  value={textColor}
                  onChange={(value) => setWidgetOptions({ textColor: value })}
                  placeholder="색상 코드 입력"
                  className="w-[200px]"
                />
                <button
                  onClick={togglePickerVisibility2}
                  className="p-2 rounded-full focus:outline-none"
                >
                  <div
                    style={{ backgroundColor: textColor }}
                    className="w-6 h-6 border rounded-full"
                  />
                </button>
              </div>
              {isTextColorPickerVisible && (
                <HexAlphaColorPicker
                  color={textColor}
                  onChange={(color) => setWidgetOptions({ textColor: color })}
                />
              )}
            </div>
          </div>
          {isPickerVisible && (
            <div className="absolute z-10">
              <HexAlphaColorPicker
                color={tempBackgroundColor}
                onChange={handleBackgroundColorChange}
              />
              <button
                className="mt-2 float-right px-3 py-1 shadow-md bg-white border border-gray-2 rounded text-md1"
                onClick={confirmBackgroundColorChange}
              >
                확인
              </button>
            </div>
          )}
          {isPickerVisible2 && (
            <div className="absolute z-10">
              <HexAlphaColorPicker
                color={tempTextColor}
                onChange={handleTextColorChange}
              />
              <button
                className="mt-2 float-right px-3 py-1 shadow-md bg-white border border-gray-2 rounded text-md1"
                onClick={confirmTextColorChange}
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

export default WidgetOption;
