import { ReactNode } from "react";

interface TabsTriggerProps {
  value: string;
  children: ReactNode;
  activeTab: string;
  setActiveTab: (value: string) => void;
}

const TabsTrigger: React.FC<TabsTriggerProps> = ({
  value,
  children,
  activeTab,
  setActiveTab,
}) => (
  <button
    className={`p-2 ${
      activeTab === value ? "border-b-2 border-white" : "text-gray-400"
    }`}
    onClick={() => setActiveTab(value)}
  >
    {children}
  </button>
);
export default TabsTrigger;
