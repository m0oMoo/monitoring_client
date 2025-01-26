interface ButtonProps {
  title: string;
  onClick: () => void;
  size?: "small" | "large";
  mode?: "dark" | "light";
  color: "gray" | "pink" | "blue" | "green" | "yellow" | "red";
  className?: string;
}

const BorderBtn = ({
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
  const modeClasses = mode === "dark" ? "text-white" : "text-text2";

  // 색상별 스타일
  const colorClasses = {
    gray: "border-gray-3 hover:shadow-[0_0_8px_2px_rgba(128,128,128,0.5)]",
    pink: "border-pink-4 hover:shadow-[0_0_8px_2px_rgba(244,114,182,0.5)]",
    blue: "border-blue-5 hover:shadow-[0_0_8px_2px_rgba(92,198,255,0.5)]",
    green: "border-green-4 hover:shadow-[0_0_8px_2px_rgba(51,184,97,0.5)]",
    yellow: "border-yellow-6 hover:shadow-[0_0_8px_2px_rgba(251,230,170,0.5)]",
    red: "border-red-5 hover:shadow-[0_0_8px_2px_rgba(239,68,68,0.5)]",
  }[color];

  return (
    <button
      onClick={onClick}
      className={`border transition-all duration-200 ${modeClasses} ${sizeClasses} ${colorClasses} ${
        className || ""
      }`}
    >
      {title}
    </button>
  );
};

export default BorderBtn;
