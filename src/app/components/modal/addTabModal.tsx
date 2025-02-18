import React, { useState } from "react";

interface AddTabModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTab: (tabName: string) => void;
}

const AddTabModal = ({ isOpen, onClose, onAddTab }: AddTabModalProps) => {
  const [newTabName, setNewTabName] = useState("");

  const handleSubmit = () => {
    if (newTabName.trim()) {
      onAddTab(newTabName);
      setNewTabName("");
    }
  };

  return (
    isOpen && (
      <div className="fixed inset-0 bg-gray-0 bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-[#fdf7e4] p-6 rounded-lg shadow-lg w-96 border border-[#1f3e5c]">
          <h2 className="text-xl text-[#1f3e5c] mb-4">새 탭 추가</h2>
          <input
            type="text"
            value={newTabName}
            onChange={(e) => setNewTabName(e.target.value)}
            className="border border-[#1f3e5c] p-2 mb-4 w-full bg-[#F5F5F5] text-[#102841] placeholder-[#B0C4DE] rounded-lg"
            placeholder="탭 이름을 입력하세요"
          />
          <div className="flex justify-end gap-4">
            <button
              className="px-4 py-2 bg-[#1f3e5c] text-white rounded-lg hover:bg-[#102841]"
              onClick={onClose}
            >
              취소
            </button>
            <button
              className="px-4 py-2 bg-[#1f3e5c] text-white rounded-lg hover:bg-[#102841]"
              onClick={handleSubmit}
            >
              추가
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default AddTabModal;
