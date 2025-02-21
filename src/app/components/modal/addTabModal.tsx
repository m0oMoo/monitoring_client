"use client";

import React, { useState, useEffect } from "react";
import { MoreVertical, Trash2, Edit2 } from "lucide-react";

interface AddTabModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTab: (tabName: string, tabDescription: string) => void;
  initialTabName: string;
  initialTabDescription: string;
  onEditTab: (index: number, newName: string, newDescription: string) => void;
  editingIndex: number | null;
}

const AddTabModal = ({
  isOpen,
  onClose,
  onAddTab,
  initialTabName,
  initialTabDescription,
  onEditTab,
  editingIndex,
}: AddTabModalProps) => {
  const [newTabName, setNewTabName] = useState<string>("");
  const [newTabDescription, setNewTabDescription] = useState<string>("");

  useEffect(() => {
    if (isOpen) {
      setNewTabName(initialTabName);
      setNewTabDescription(initialTabDescription);
    }
  }, [isOpen, initialTabName, initialTabDescription]);

  const handleClose = () => {
    setNewTabName("");
    setNewTabDescription("");
    onClose();
  };

  const handleSubmit = () => {
    if (newTabName.trim()) {
      if (editingIndex !== null) {
        onEditTab(editingIndex, newTabName, newTabDescription);
      } else {
        onAddTab(newTabName, newTabDescription);
      }
      handleClose();
    }
  };

  return (
    isOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm flex justify-center items-center z-50">
        <div className="bg-ivory-bg_sub p-6 rounded-lg shadow-lg w-96 border border-navy-border">
          <h2 className="text-lg text-navy-border mb-4">
            {editingIndex !== null ? "탭 수정" : "새 탭 추가"}
          </h2>
          <input
            type="text"
            value={newTabName}
            onChange={(e) => setNewTabName(e.target.value)}
            className="border focus:border-navy-border focus:outline-none p-2 mb-4 w-full text-sm bg-white 
            text-navy-text placeholder-text2 rounded-lg"
            placeholder="탭 이름을 입력하세요"
          />
          <textarea
            value={newTabDescription}
            onChange={(e) => setNewTabDescription(e.target.value)}
            className="border p-2 mb-4 w-full text-sm focus:border-navy-border focus:outline-none 
            bg-white text-navy-text placeholder-text2 rounded-lg"
            placeholder="탭 설명을 입력하세요"
          />
          <div className="flex justify-end gap-3">
            <button
              className="px-3 py-1.5 bg-navy-border text-sm text-white rounded-lg hover:bg-navy-text"
              onClick={handleClose}
            >
              취소
            </button>
            <button
              className="px-3 py-1.5 bg-navy-btn text-sm text-white rounded-lg hover:bg-navy-btn_hover"
              onClick={handleSubmit}
            >
              {editingIndex !== null ? "수정" : "추가"}
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default AddTabModal;
