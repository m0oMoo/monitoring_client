interface ButtonProps {
  title: string;
  onClick: () => void;
  size?: "small" | "large";
  mode?: "dark" | "light";
  color: "gray" | "pink" | "blue" | "green" | "yellow" | "red";
  className?: string;
}

const RoundBtn = ({
  title,
  onClick,
  size = "small",
  mode = "dark",
  color,
  className,
}: ButtonProps) => {
  // 크기별 스타일
  const sizeClasses =
    size === "large" ? "py-2.5 px-5 text-md1" : "py-2 px-4 text-sm1";

  // 모드별 스타일
  const modeClasses = mode === "dark" ? "text-white " : "text-text2";

  // 색상별 스타일
  const colorClasses = {
    gray: "bg-transparent-gray border-gray-5 hover:bg-transparent-gray_hover active:bg-transparent-gray_active",
    pink: "bg-transparent-pink border-pink-5 hover:bg-transparent-pink_hover active:bg-transparent-pink_active",
    blue: "bg-transparent-blue border-blue-6 hover:bg-transparent-blue_hover active:bg-transparent-blue_active",
    green:
      "bg-transparent-green border-green-5 hover:bg-transparent-green_hover active:bg-transparent-green_active",
    yellow:
      "bg-transparent-yellow border-yellow-6 hover:bg-transparent-yellow_hover active:bg-transparent-yellow_active",
    red: "bg-transparent-red border-red-6 hover:bg-transparent-red_hover active:bg-transparent-red_active",
  }[color];

  return (
    <button
      onClick={onClick}
      className={`border rounded-3xl ${modeClasses} ${sizeClasses} ${colorClasses} ${
        className || ""
      }`}
    >
      {title}
    </button>
  );
};

export default RoundBtn;
