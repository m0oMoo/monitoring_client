interface ButtonProps {
  title: string;
  onClick: () => void;
  size?: "small" | "large";
  color: "gray" | "pink" | "blue" | "green" | "yellow" | "red";
  className?: string;
}

const Btn = ({
  title,
  onClick,
  size = "small",
  color,
  className,
}: ButtonProps) => {
  // 크기별 스타일
  const sizeClasses =
    size === "large" ? "py-2.5 px-5 text-md1" : "py-2 px-4 text-sm1";

  // 색상별 스타일
  const colorClasses = {
    gray: "bg-gray-6 hover:bg-gray-5",
    pink: "bg-pink-5 hover:bg-pink-4",
    blue: "bg-blue-7 hover:bg-blue-6",
    green: "bg-green-6 hover:bg-green-5",
    yellow: "bg-yellow-7 hover:bg-yellow-6",
    red: "bg-red-6 hover:bg-red-5",
  }[color];

  return (
    <button
      onClick={onClick}
      className={`rounded-lg text-white ${sizeClasses} ${colorClasses} ${
        className || ""
      }`}
    >
      {title}
    </button>
  );
};

export default Btn;
