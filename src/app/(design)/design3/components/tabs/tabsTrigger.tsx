import { useContext } from "react";
import { TabsContext } from "./tabs";

interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
}

export const TabsTrigger: React.FC<TabsTriggerProps> = ({
  value,
  children,
}) => {
  const context = useContext(TabsContext);
  if (!context) throw new Error("TabsTrigger must be used within a Tabs");

  const { activeTab, setActiveTab } = context;

  return (
    <button
      className={`px-4 py-2 border-b-2 transition ${
        activeTab === value
          ? "border-white text-white"
          : "border-transparent text-gray-400 hover:text-white"
      }`}
      onClick={() => setActiveTab(value)}
    >
      {children}
    </button>
  );
};
