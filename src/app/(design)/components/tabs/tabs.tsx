import { ReactNode } from "react";

export interface TabsProps {
  children: ReactNode;
}

const Tabs: React.FC<TabsProps> = ({ children }) => (
  <div className="w-full">{children}</div>
);

export default Tabs;
