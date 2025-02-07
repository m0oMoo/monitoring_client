import { ReactNode } from "react";

interface ButtonProps {
  onClick: () => void;
  children: ReactNode;
  variant?: "ghost" | "solid";
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  variant = "ghost",
}) => (
  <button
    onClick={onClick}
    className={`p-2 rounded ${
      variant === "ghost" ? "bg-transparent text-white" : "bg-gray-7 text-white"
    }`}
  >
    {children}
  </button>
);
export default Button;
