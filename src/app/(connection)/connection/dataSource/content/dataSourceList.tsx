"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { DATA_SOURCE } from "@/app/data/dataSource";
import { Database } from "lucide-react";
import SearchInput from "@/app/components/search/searchInput";

const DataSourceList = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>("");

  // 데이터 소스 선택 핸들러
  const handleDataSourceClick = (link: string) => {
    router.push(link);
  };

  // 검색어 입력 처리
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  // 검색 쿼리에 맞는 데이터 소스 필터링
  const filteredDataSources = DATA_SOURCE.filter((source) =>
    source.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-ivory-bg_sub text-navy-text min-h-screen p-4 pt-[44px]">
      <header className="flex justify-between items-center my-3">
        <h1 className="text-xl font-bold tracking-wide flex items-center">
          <Database className="mr-2" /> 데이터 소스 관리
        </h1>
        <SearchInput
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
        />
      </header>

      {/* 검색창 */}

      {/* 경계 */}
      <div className="w-full mb-5 border-b border-0.5 border-navy-border" />

      {/* 데이터 소스 목록 표시 */}
      <div className="flex flex-wrap justify-start gap-6">
        {filteredDataSources.map((source) => (
          <div
            key={source.id}
            className="border border-navy-border p-6 rounded-xl cursor-pointer 
            hover:bg-navy-hover active:bg-navy-pressed transition-colors duration-300 w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
            onClick={() => handleDataSourceClick(source.link)}
          >
            <div className="flex justify-center mb-4">
              <Image
                src={source.imageUrl}
                alt={source.name}
                width={60}
                height={60}
                className="transition-all duration-200 hover:opacity-90"
              />
            </div>
            <h3 className="text-center text-sm font-semibold text-navy-text">
              {source.name}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DataSourceList;
