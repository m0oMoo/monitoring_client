import { useContext } from "react";
import { TabsContext } from "./tabs";

interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

export const TabsTrigger: React.FC<TabsTriggerProps> = ({
  value,
  children,
  className,
}) => {
  const context = useContext(TabsContext);
  if (!context) throw new Error("TabsTrigger must be used within a Tabs");

  const { activeTab, setActiveTab } = context;

  return (
    <button
      className={`${className} px-4 py-2 border-b-2 transition ${
        activeTab === value
          ? "border-[#1f3e5c] text-[#1f3e5c]"
          : "border-transparent border-gray-2 text-gray-2 hover:text-gray-5"
      }`}
      onClick={() => setActiveTab(value)}
    >
      {children}
    </button>
  );
};
