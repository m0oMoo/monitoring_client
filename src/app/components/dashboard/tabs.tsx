import { useState } from "react";

const Tabs = ({
  tabs,
  onSelect,
  onAddTab,
}: {
  tabs: string[];
  onSelect: (tab: string) => void;
  onAddTab: (newTabName: string) => void;
}) => {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [isAdding, setIsAdding] = useState(false);
  const [newTabName, setNewTabName] = useState("");

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    onSelect(tab);
  };

  const handleAddTab = () => {
    if (newTabName.trim() !== "") {
      onAddTab(newTabName.trim());
      setActiveTab(newTabName.trim());
      setNewTabName("");
      setIsAdding(false);
    }
  };

  return (
    <div className="flex items-center">
      {tabs.map((tab, index) =>
        tab === "+" ? (
          <button
            key={`add-tab-${index}`}
            onClick={() => setIsAdding(true)}
            className="border border-b-0 rounded-t-lg border-gray-300
            p-2 bg-white text-gray-600"
          >
            ➕
          </button>
        ) : (
          <button
            key={tab}
            onClick={() => handleTabClick(tab)}
            className={`border border-b-0 rounded-t-lg border-gray-300
            p-2 bg-white
            ${activeTab === tab ? "active p-3 bg-gray-200" : ""}`}
          >
            {tab}
          </button>
        )
      )}
      {isAdding && (
        <div className="ml-4 flex items-center">
          <input
            type="text"
            value={newTabName}
            onChange={(e) => setNewTabName(e.target.value)}
            placeholder="New Tab Name"
            className="border p-2 rounded"
          />
          <button
            onClick={handleAddTab}
            className="ml-2 px-3 py-2 bg-blue-500 text-white rounded"
          >
            Add
          </button>
          <button
            onClick={() => setIsAdding(false)}
            className="ml-2 px-3 py-2 bg-red-500 text-white rounded"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default Tabs;
