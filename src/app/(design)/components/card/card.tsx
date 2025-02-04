import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
}

const Card: React.FC<CardProps> = ({ children }) => (
  <div className="bg-gray-700 p-4 rounded-lg shadow-md">{children}</div>
);
export default Card;
