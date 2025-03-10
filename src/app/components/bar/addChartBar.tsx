import { MinusCircle, PlusCircle } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDashboardStore } from "@/app/store/useDashboardStore";

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
  const router = useRouter();
  const searchParams = useSearchParams();
  const dashboardId = searchParams.get("id") || undefined;

  // `dashboardId`에 해당하는 대시보드 찾기
  const dashboard = useDashboardStore((state) =>
    state.dashboardList.find((d) => d.id === dashboardId)
  );

  const handleGoBack = () => {
    router.push("/dashboard2");
  };

  return (
    <div
      className={`flex justify-between items-center mt-[44px] bg-transparent
      border-b border-navy-border border-0.5 py-1.5`}
    >
      {/* breadcrumb 표시 */}
      <span className=" ml-4 text-lg1 text-text2">
        <span
          className="text-text1 cursor-pointer hover:underline"
          onClick={handleGoBack}
        >
          Dashboard
        </span>
        &nbsp; {">"}
        <span className="text-navy-text text-bold_lg">
          &nbsp; {dashboard ? dashboard.label : "Unknown Dashboard"}
        </span>
      </span>
      <div className="flex flex-row gap-5 mr-4">
        {gridVisible && (
          <div className={`flex justify-end items-center space-x-2`}>
            <button
              onClick={() => onGridChange && onGridChange(-1)}
              disabled={gridCols === 1}
              className="p-1 rounded-md text-navy-btn hover:bg-navy-btn_hover disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              <MinusCircle size={16} />
            </button>
            <span className="text-sm_bold">{gridCols} Columns</span>
            <button
              onClick={() => onGridChange && onGridChange(1)}
              disabled={gridCols === 4}
              className="p-1 rounded-md text-navy-btn hover:bg-navy-btn_hover disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              <PlusCircle size={16} />
            </button>
          </div>
        )}
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
