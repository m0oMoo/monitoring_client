import { useState } from "react";
import { MdAdd, MdClose } from "react-icons/md";
import Btn from "../button/basic/btn";

const Tabs = ({
  tabs,
  onSelect,
  onAddTab,
  onRemoveTab,
}: {
  tabs: string[];
  onSelect: (tab: string) => void;
  onAddTab: (newTabName: string) => void;
  onRemoveTab: (tabName: string) => void;
}) => {
  const [activeTab, setActiveTab] = useState<string>(tabs[0]);
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [newTabName, setNewTabName] = useState<string>("");

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

  const handleRemoveTab = (tabName: string) => {
    onRemoveTab(tabName);
    if (activeTab === tabName) {
      const remainingTabs = tabs.filter(
        (tab) => tab !== tabName && tab !== "+"
      );
      setActiveTab(remainingTabs[0] || "");
      if (remainingTabs[0]) {
        onSelect(remainingTabs[0]);
      }
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
            p-2 bg-white text-gray-600 flex items-center"
          >
            <MdAdd size={20} />
          </button>
        ) : (
          <div key={tab} className="relative group">
            <button
              onClick={() => handleTabClick(tab)}
              className={`border border-b-0 rounded-t-lg border-gray-300
              p-2 bg-white flex items-center
              ${activeTab === tab ? "active p-3 bg-gray-200" : ""}`}
            >
              {tab}
            </button>
            {tabs.filter((t) => t !== "+").length > 1 && (
              <button
                onClick={() => handleRemoveTab(tab)}
                className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-red-5 text-white 
                text-sm p-1 rounded-full opacity-0 group-hover:opacity-100 flex items-center z-50"
              >
                <MdClose size={12} />
              </button>
            )}
          </div>
        )
      )}
      {isAdding && (
        <div className="ml-4 flex gap-2 items-center">
          <input
            type="text"
            value={newTabName}
            onChange={(e) => setNewTabName(e.target.value)}
            placeholder="New Tab Name"
            className="border p-2 rounded"
          />
          <Btn onClick={handleAddTab} title={"Add"} color={"blue"} />
          <Btn
            onClick={() => setIsAdding(false)}
            title={"Cancel"}
            color={"red"}
          />
        </div>
      )}
    </div>
  );
};

export default Tabs;
