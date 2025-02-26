interface ToggleButtonGroupProps<T extends string> {
  options: T[];
  selected: T;
  onChange: (value: T) => void;
  label: string;
}

/**
 *
 * @param options 버튼 옵션 배열
 * @param selected 선택된 값
 * @param onChange
 * @param label 그룹의 레이블
 * @returns
 */
const SquareToggleBtnGroup = <T extends string>({
  options,
  selected,
  onChange,
  label,
}: ToggleButtonGroupProps<T>) => {
  return (
    <div className="text-sm1">
      <div className="flex">
        <div className="flex gap-1 border-y-[1px] border-gray-1 p-1">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => onChange(option)}
              className={`px-3.5 py-1.5 rounded-sm ${
                selected === option
                  ? "bg-navy-btn_hover text-white"
                  : "bg-gray-1 text-gray-7"
              } transition duration-300`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SquareToggleBtnGroup;
