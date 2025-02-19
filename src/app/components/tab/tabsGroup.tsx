import React, { useState } from "react";
import { TabsTrigger } from "./tabsTrigger";

interface TabsGroupProps {
  tabs: { id: string; label: string; description: string }[];
  onTabEdit: (index: number, newName: string) => void;
  onTabSelect: (index: number) => void;
}

const TabsGroup = ({ tabs, onTabEdit }: TabsGroupProps) => {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [newTabName, setNewTabName] = useState<string>("");

  const handleEdit = (index: number, label: string) => {
    setEditingIndex(index);
    setNewTabName(label);
  };

  const handleSave = (index: number) => {
    onTabEdit(index, newTabName);
    setEditingIndex(null);
  };

  const handleCancel = () => {
    setEditingIndex(null);
  };

  return (
    <div className="flex space-x-3">
      {tabs.map((tab, index) => (
        <div key={tab.id} className="relative">
          {editingIndex === index ? (
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={newTabName}
                onChange={(e) => setNewTabName(e.target.value)}
                className="bg-transparent h-9 w-[120px] text-[#19324b] px-2
                border-b-2 border-[#19324b] focus:outline-none text-sm"
              />
              <button
                onClick={() => handleSave(index)}
                className="text-[#19324b] hover:text-[#273e55] text-xs"
              >
                저장
              </button>
              <button
                onClick={handleCancel}
                className="text-red-600 hover:text-red-500 text-xs"
              >
                취소
              </button>
            </div>
          ) : (
            <TabsTrigger
              id={tab.id}
              className="flex items-center pb-2 px-2 border-b-2 transition-all duration-200 text-[#19324b] hover:text-[#19324b]
              data-[state=active]:border-[#19324b] data-[state=active]:text-[#19324b] text-sm"
            >
              {tab.label}
              <span
                onClick={() => handleEdit(index, tab.label)}
                className="ml-2 text-[#19324b] text-sm cursor-pointer"
              >
                ✏️
              </span>
            </TabsTrigger>
          )}
        </div>
      ))}
    </div>
  );
};

export default TabsGroup;
