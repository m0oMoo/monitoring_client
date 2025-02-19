import React, { useState } from "react";

interface AddTabModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTab: (tabName: string, tabDescription: string) => void;
}

const AddTabModal = ({ isOpen, onClose, onAddTab }: AddTabModalProps) => {
  const [newTabName, setNewTabName] = useState<string>("");
  const [newTabDescription, setNewTabDescription] = useState<string>("");

  const handleSubmit = () => {
    if (newTabName.trim()) {
      onAddTab(newTabName, newTabDescription);
      setNewTabName("");
      setNewTabDescription("");
    }
  };

  return (
    isOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm flex justify-center items-center z-50">
        <div className="bg-ivory-bg p-6 rounded-lg shadow-lg w-96 border border-navy-boㄴrder">
          <h2 className="text-lg text-navy-border mb-4">새 탭 추가</h2>

          <input
            type="text"
            value={newTabName}
            onChange={(e) => setNewTabName(e.target.value)}
            className="border border-navy-border p-2 mb-4 w-full text-sm bg-ivory-bg_secondary text-navy-text placeholder-text2 rounded-lg"
            placeholder="탭 이름을 입력하세요"
          />

          <textarea
            value={newTabDescription}
            onChange={(e) => setNewTabDescription(e.target.value)}
            className="border border-navy-border p-2 mb-4 w-full text-sm bg-ivory-bg_secondary text-navy-text placeholder-text2 rounded-lg"
            placeholder="탭 설명을 입력하세요"
          />

          <div className="flex justify-end gap-3">
            <button
              className="px-3 py-1.5 bg-navy-border text-sm text-white rounded-lg hover:bg-navy-text"
              onClick={onClose}
            >
              취소
            </button>
            <button
              className="px-3 py-1.5 bg-navy-btn text-sm text-white rounded-lg hover:bg-navy-btn_hover"
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
