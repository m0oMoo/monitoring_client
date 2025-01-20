import { useState } from "react";

const Tabs = ({
  tabs,
  onSelect,
}: {
  tabs: string[];
  onSelect: (tab: string) => void;
}) => {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    onSelect(tab);
  };

  return (
    <div>
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => handleTabClick(tab)}
          className={activeTab === tab ? "active" : ""}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
