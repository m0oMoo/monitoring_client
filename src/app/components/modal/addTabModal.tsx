"use client";

import React, { useState, useEffect } from "react";
import { useDashboardStore } from "@/app/store/useDashboardStore"; // 🔹 대시보드 스토어 추가

interface AddTabModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTab: (tabName: string, tabDescription: string) => void;
  initialTabName: string;
  initialTabDescription: string;
  onEditTab: (id: string, newName: string, newDescription: string) => void;
  editingIndex: string | null;
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
  const { dashboardList } = useDashboardStore(); // 🔹 대시보드 목록 가져오기
  const [newTabName, setNewTabName] = useState<string>("");
  const [newTabDescription, setNewTabDescription] = useState<string>("");

  useEffect(() => {
    if (isOpen) {
      if (editingIndex !== null) {
        // 🔹 editingIndex가 존재하면 해당 대시보드의 데이터를 찾아서 설정
        const existingDashboard = dashboardList.find(
          (tab) => tab.id === editingIndex
        );
        if (existingDashboard) {
          setNewTabName(existingDashboard.label);
          setNewTabDescription(existingDashboard.description);
        }
      } else {
        // 🔹 새 탭 추가 시 초기값 설정
        setNewTabName(initialTabName);
        setNewTabDescription(initialTabDescription);
      }
    }
  }, [isOpen, editingIndex, dashboardList]); // 🔹 editingIndex와 dashboardList 변경 시 업데이트

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
            text-navy-text placeholder-gray-3 rounded-lg"
            placeholder="탭 이름을 입력하세요"
          />
          <textarea
            value={newTabDescription}
            onChange={(e) => setNewTabDescription(e.target.value)}
            className="border p-2 mb-4 w-full text-sm focus:border-navy-border focus:outline-none 
            bg-white text-navy-text placeholder-gray-3 rounded-lg"
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
