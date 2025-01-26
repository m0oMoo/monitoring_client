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
    gray: "bg-gray-5 hover:bg-gray-4 active:bg-gray-6",
    pink: "bg-pink-5 hover:bg-pink-4 active:bg-pink-6",
    blue: "bg-blue-7 hover:bg-blue-6 active:bg-blue-8",
    green: "bg-green-6 hover:bg-green-5 active:bg-green-7",
    yellow: "bg-yellow-7 hover:bg-yellow-6 active:bg-yellow-8",
    red: "bg-red-6 hover:bg-red-5 active:bg-red-7",
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
