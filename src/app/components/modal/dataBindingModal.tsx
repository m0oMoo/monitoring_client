import React, { useState } from "react";
import { X } from "lucide-react"; // lucide-react에서 X 아이콘을 가져옵니다.

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DataBindingModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [bindingType, setBindingType] = useState<"api" | "query">("api");
  const [apiUrl, setApiUrl] = useState("");
  const [query, setQuery] = useState("");

  if (!isOpen) return null;

  const handleApiBinding = () => {
    console.log("API URL:", apiUrl);
    // API 데이터 바인딩 로직 추가
    onClose();
  };

  const handleQueryBinding = () => {
    console.log("Query:", query);
    // 쿼리 기반 데이터 바인딩 로직 추가
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-[#2E2E2E] p-6 rounded-lg shadow-lg w-[450px]">
        <div className="flex justify-end p-1">
          <button onClick={onClose} className="text-gray-300 hover:text-white">
            <X size={20} />
          </button>
        </div>
        <div className="flex justify-between items-center mt-6 mb-8">
          <h2 className="text-title_lg font-bold">데이터 불러오기</h2>
        </div>
        <div className="flex space-x-6 mb-5 p-2 text-lg2">
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              value="api"
              checked={bindingType === "api"}
              onChange={() => setBindingType("api")}
              className="mr-2"
            />
            API
          </label>
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              value="query"
              checked={bindingType === "query"}
              onChange={() => setBindingType("query")}
              className="mr-2"
            />
            Query
          </label>
        </div>
        {bindingType === "api" && (
          <div>
            <label className="block text-gray-300 mb-2">API URL:</label>
            <input
              type="text"
              value={apiUrl}
              onChange={(e) => setApiUrl(e.target.value)}
              className="w-full p-2 rounded-lg bg-gray-5 text-white border border-gray-600"
              placeholder="https://api.example.com/data"
            />
            <button
              className="mt-4 bg-gray-6 border border-gray-4 py-2 px-3 rounded-lg text-white"
              onClick={handleApiBinding}
            >
              API 데이터 불러오기
            </button>
          </div>
        )}
        {bindingType === "query" && (
          <div>
            <label className="block text-gray-300 mb-2">쿼리문:</label>
            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full p-2 rounded-lg bg-gray-5 text-white border border-gray-600"
              placeholder="SELECT * FROM table_name"
              rows={4}
            />
            <button
              className="mt-4 py-2 px-3 bg-gray-6 border border-gray-4 rounded-lg text-white"
              onClick={handleQueryBinding}
            >
              쿼리 데이터 불러오기
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataBindingModal;
