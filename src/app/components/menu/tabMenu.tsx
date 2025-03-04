import React from "react";
import { Edit2, Trash2 } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

interface TabMenuProps {
  index: string;
  setEditingTabIndex: (index: string) => void;
  setIsModalOpen: (open: boolean) => void;
  setMenuOpenIndex: (index: string | null) => void;
  handleTabDelete: (index: string) => void;
}

const TabMenu: React.FC<TabMenuProps> = ({
  index,
  setEditingTabIndex,
  setIsModalOpen,
  setMenuOpenIndex,
  handleTabDelete,
}) => {
  return (
    <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md z-50">
      <button
        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        onClick={(e) => {
          e.stopPropagation();
          setEditingTabIndex(index);
          setIsModalOpen(true);
          setMenuOpenIndex(null);
        }}
      >
        <Edit2 className="w-4 h-4 mr-2" /> 수정
      </button>
      <button
        className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
        onClick={(e) => {
          e.stopPropagation();
          if (window.confirm("대시보드를 삭제하시겠습니까?")) {
            handleTabDelete(index);
          }
          setMenuOpenIndex(null);
        }}
      >
        <Trash2 className="w-4 h-4 mr-2" /> 삭제
      </button>
    </div>
  );
};

export default TabMenu;
