import { MinusCircle, PlusCircle } from "lucide-react";

interface AddChartBarProps {
  isEdit: boolean;
  onCreateClick: () => void;
  onSaveClick?: () => void;
  gridCols?: number;
  onGridChange?: (change: number) => void;
  gridVisible?: boolean;
}

const AddChartBar = ({
  isEdit,
  onCreateClick,
  onSaveClick,
  gridCols,
  onGridChange,
  gridVisible = false,
}: AddChartBarProps) => {
  return (
    <div
      className={`flex ${
        gridVisible ? "justify-between" : "justify-end"
      }  items-center mt-[44px] bg-transparent
      border-b border-navy-border border-0.5 py-1.5`}
    >
      {gridVisible && (
        <div className={`flex justify-end items-center space-x-2 pl-3`}>
          <button
            onClick={() => onGridChange && onGridChange(-1)}
            disabled={gridCols === 1}
            className="p-1 rounded-md text-white bg-navy-btn hover:bg-navy-btn_hover disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            <MinusCircle size={16} />
          </button>
          <span className="text-sm_bold">{gridCols} Columns</span>
          <button
            onClick={() => onGridChange && onGridChange(1)}
            disabled={gridCols === 4}
            className="p-1 rounded-md text-white bg-navy-btn hover:bg-navy-btn_hover disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            <PlusCircle size={16} />
          </button>
        </div>
      )}
      <div className="flex flex-row gap-2 mr-4">
        <button
          className={`text-text text-sm_bold border-2 border-navy-border
      px-1 py-[2.5px] rounded-sm ${isEdit ? "hidden" : "block"}`}
          onClick={onSaveClick}
        >
          Edit
        </button>
        <button
          className="text-ivory-text text-sm_bold bg-navy-btn
        px-2 py-1 rounded-sm"
          onClick={onCreateClick}
        >
          {isEdit ? "Save" : "Create"}
        </button>
      </div>
    </div>
  );
};

export default AddChartBar;
