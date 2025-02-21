import React, { useState } from "react";
import TextInput from "@/app/components/input/textInput";
import TextArea from "@/app/components/textarea/textarea";
import Dropdown from "@/app/components/dropdown/dropdown";
import SquareToggleBtnGroup from "@/app/components/button/toggle/squareBtnGroup"; // SquareToggleBtnGroup 컴포넌트
import RoundToggleBtnGroup from "@/app/components/button/toggle/roundToggleBtnGroup";

const columns: { [key: string]: string[] } = {
  users: ["id", "name", "email"],
  orders: ["order_id", "product_name", "price"],
  products: ["product_id", "product_name", "category"],
};

const DataBinding = () => {
  const [isApiBinding, setIsApiBinding] = useState("API");
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [selectedColumn, setSelectedColumn] = useState<string | null>(null);
  const [query, setQuery] = useState<string>("");
  const [apiUrl, setApiUrl] = useState<string>("");
  const [queryParams, setQueryParams] = useState<string>("");

  const handleTableChange = (value: string) => {
    setSelectedTable(value);
    setSelectedColumn(null);
  };

  return (
    <div className="bg-ivory-bg_sub border-l border-0.5 no-scrollbar border-navy-border pt-[44px] pl-6 w-[300px] h-[100vh] overflow-y-auto">
      <div className="w-full flex flex-col pt-10 pb-10">
        <h2 className="text-lg font-semibold mb-4">Data Binding</h2>

        {/* Toggle Button Group to choose between API and Query */}
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

        {/* API Binding Inputs */}
        {isApiBinding === "API" ? (
          <>
            {/* API URL input */}
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
            {/* Table selection */}
            <div className="flex flex-col mb-6">
              <label className="text-sm2 text-text2 mb-2">Select Table</label>
              <Dropdown
                value={selectedTable || ""}
                onChange={handleTableChange}
                options={Object.keys(columns).map((table) => ({
                  label: table,
                  value: table,
                }))}
                placeholder="Select a table"
                className="w-[250px]"
              />
            </div>

            {/* Column selection */}
            {selectedTable && (
              <div className="flex flex-col mb-6">
                <label className="text-sm2 text-text2 mb-2">
                  Select Column
                </label>
                <Dropdown
                  value={selectedColumn || ""}
                  onChange={(value) => setSelectedColumn(value)}
                  options={columns[selectedTable].map((column) => ({
                    label: column,
                    value: column,
                  }))}
                  placeholder="Select a column"
                  className="w-[250px]"
                />
              </div>
            )}

            {/* Query text area */}
            <div className="flex flex-col mb-6">
              <label className="text-sm2 text-text2 mb-2">Write Query</label>
              <TextArea
                value={query}
                onChange={(value) => setQuery(value)}
                placeholder="SELECT * FROM table WHERE ..."
                className="w-[250px]"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DataBinding;
