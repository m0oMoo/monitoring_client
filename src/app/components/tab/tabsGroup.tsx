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
                className="bg-transparent h-12 w-[160px] text-[#19324b] px-2
                border-b-2 border-[#19324b] focus:outline-none"
              />
              <button
                onClick={() => handleSave(index)}
                className="text-[#19324b] hover:text-[#273e55]"
              >
                저장
              </button>
              <button
                onClick={handleCancel}
                className="text-red-600 hover:text-red-500"
              >
                취소
              </button>
            </div>
          ) : (
            <TabsTrigger
              id={tab.id}
              className="flex items-center pb-3 px-4 border-b-4 transition-all duration-200 text-[#19324b] hover:text-[#19324b]
              data-[state=active]:border-[#19324b] data-[state=active]:text-[#19324b]"
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
