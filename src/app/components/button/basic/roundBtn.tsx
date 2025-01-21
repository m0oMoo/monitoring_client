interface ButtonProps {
  title: string;
  onClick: () => void;
  size?: "small" | "large";
  color: "gray" | "pink" | "blue" | "green" | "yellow";
  className?: string;
}

const RoundBtn = ({
  title,
  onClick,
  size = "small",
  color,
  className,
}: ButtonProps) => {
  // 크기별 스타일
  const sizeClasses =
    size === "large" ? "py-2 px-4 text-md1" : "py-1.5 px-3 text-sm1";

  // 색상별 스타일
  const colorClasses = {
    gray: "bg-transparent-gray border-gray-5",
    pink: "bg-transparent-pink border-pink-5",
    blue: "bg-transparent-blue border-blue-6",
    green: "bg-transparent-green border-green-5",
    yellow: "bg-transparent-yellow border-yellow-6",
  }[color];

  return (
    <button
      onClick={onClick}
      className={`border text-text2 rounded-3xl ${sizeClasses} ${colorClasses} ${
        className || ""
      }`}
    >
      {title}
    </button>
  );
};

export default RoundBtn;
