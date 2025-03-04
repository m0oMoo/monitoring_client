import React, { useState, useEffect, useMemo } from "react";
import TextInput from "@/app/components/input/textInput";
import TextArea from "@/app/components/textarea/textarea";
import Dropdown from "@/app/components/dropdown/dropdown";
import RoundToggleBtnGroup from "@/app/components/button/toggle/roundToggleBtnGroup";
import { useChartOptions } from "@/app/context/chartOptionContext";
import { COLUMNS, MOCK_DATA } from "@/app/data/dataBinding";
import MultiSelectDropdown from "@/app/components/dropdown/multiSelectDropdown";

const DataBinding = () => {
  const { datasets, setDatasets } = useChartOptions();
  const [isApiBinding, setIsApiBinding] = useState("API");
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const [query, setQuery] = useState<string>("");
  const [apiUrl, setApiUrl] = useState<string>("");
  const [queryParams, setQueryParams] = useState<string>("");

  // ✅ 테이블 선택 핸들러 (테이블 변경 시 컬럼 초기화)
  const handleTableChange = (value: string) => {
    setSelectedTable(value);
    setSelectedColumns([]);
    setQuery("");
  };

  useEffect(() => {
    if (selectedColumns.length === 0) {
      setDatasets([]);
    }
  }, [selectedColumns]);

  const updatedDatasets = useMemo(() => {
    if (!selectedTable || selectedColumns.length === 0) return [];

    return selectedColumns.map((column) => ({
      label: column,
      data: MOCK_DATA[selectedTable]?.[column] || [],
    }));
  }, [selectedColumns, selectedTable]);

  // ✅ `selectedColumns`이 변경될 때 `setDatasets` 업데이트
  useEffect(() => {
    if (
      updatedDatasets.length > 0 &&
      JSON.stringify(updatedDatasets) !== JSON.stringify(datasets)
    ) {
      setDatasets(updatedDatasets);
    }
  }, [updatedDatasets, datasets, setDatasets]);

  // ✅ 쿼리 실행 핸들러 (SQL WHERE 조건 지원)
  const handleQueryExecute = () => {
    if (!selectedTable || !query.trim()) return;

    const match = query.match(
      /SELECT\s+\*\s+FROM\s+(\w+)(?:\s+WHERE\s+(.+))?/i
    );
    if (!match) return;

    const table = match[1];
    const condition = match[2];

    if (!MOCK_DATA[table]) return;

    let filteredData = MOCK_DATA[table];

    if (condition) {
      const [col, operator, value] = condition
        .split(/(<=|>=|=|<|>)/)
        .map((s) => s.trim());

      if (col && operator && value && filteredData[col]) {
        const numValue = parseFloat(value);
        if (!isNaN(numValue)) {
          filteredData = {
            [col]: filteredData[col].filter((item) =>
              operator === ">"
                ? item > numValue
                : operator === "<"
                ? item < numValue
                : operator === ">="
                ? item >= numValue
                : operator === "<="
                ? item <= numValue
                : operator === "="
                ? item === numValue
                : false
            ),
          };
        }
      }
    }

    // ✅ 필터링된 데이터 차트에 반영
    setDatasets(
      Object.keys(filteredData).map((key) => ({
        label: key,
        data: filteredData[key],
      }))
    );
  };

  return (
    <div className="bg-ivory-bg_sub border-l border-0.5 no-scrollbar border-navy-border pt-[44px] pl-6 w-[300px] h-[100vh] overflow-y-auto">
      <div className="w-full flex flex-col pt-10 pb-10">
        <h2 className="text-lg font-semibold mb-4">Data Binding</h2>

        {/* ✅ API vs Query 선택 토글 */}
        <div className="flex flex-col mb-6">
          <label className="text-sm2 text-text2 mb-2">
            Select Binding Method
          </label>
          <RoundToggleBtnGroup
            options={["API", "Query"]}
            selected={isApiBinding}
            onChange={setIsApiBinding}
            label=""
            clssName="w-[120px]"
          />
        </div>

        {/* ✅ API Binding 옵션 */}
        {isApiBinding === "API" ? (
          <>
            {/* API URL 입력 */}
            <div className="flex flex-col mb-6">
              <label className="text-sm2 text-text2 mb-2">API URL</label>
              <TextInput
                value={apiUrl}
                onChange={(e) => setApiUrl(e)}
                placeholder="Enter API URL"
                className="w-[250px]"
              />
            </div>

            {/* Query parameters */}
            <div className="flex flex-col mb-6">
              <label className="text-sm2 text-text2 mb-2">
                Query Parameters (Optional)
              </label>
              <TextInput
                value={queryParams}
                onChange={(e) => setQueryParams(e)}
                placeholder="e.g., id=1&name=John"
                className="w-[250px]"
              />
            </div>
          </>
        ) : (
          <>
            {/* ✅ 테이블 선택 */}
            <div className="flex flex-col mb-6">
              <label className="text-sm2 text-text2 mb-2">Select Table</label>
              <Dropdown
                value={selectedTable || ""}
                onChange={handleTableChange}
                options={Object.keys(COLUMNS).map((table) => ({
                  label: table,
                  value: table,
                }))}
                placeholder="Select a table"
                className="w-[250px]"
              />
            </div>

            {/* ✅ 컬럼 선택 (여러 개 가능) */}
            {selectedTable && (
              <div className="flex flex-col mb-6">
                <label className="text-sm2 text-text2 mb-2">
                  Select Columns
                </label>
                <MultiSelectDropdown
                  value={selectedColumns}
                  onChange={setSelectedColumns}
                  options={COLUMNS[selectedTable].map((column) => ({
                    label: column,
                    value: column,
                  }))}
                  placeholder="Select one or more columns"
                  className="w-[250px]"
                />
              </div>
            )}

            {/* ✅ SQL 쿼리 입력 */}
            <div className="flex flex-col mb-6">
              <label className="text-sm2 text-text2 mb-2">Write Query</label>
              <TextArea
                value={query}
                onChange={(value) => setQuery(value)}
                placeholder="SELECT * FROM table WHERE ..."
                className="w-[250px]"
              />
            </div>

            {/* ✅ 쿼리 실행 버튼 */}
            <button
              className="bg-navy-btn text-white p-2 rounded w-[250px] hover:bg-navy-btn_hover"
              onClick={handleQueryExecute}
              disabled={!query.trim()}
            >
              Execute Query
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default DataBinding;
