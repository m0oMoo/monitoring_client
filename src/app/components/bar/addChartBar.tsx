import { useRouter } from "next/navigation";

interface AddChartBarProps {
  isEdit: boolean;
  onCreateClick: () => void;
  onSaveClick?: () => void;
}

const AddChartBar = ({
  isEdit,
  onCreateClick,
  onSaveClick,
}: AddChartBarProps) => {
  return (
    <div
      className="flex justify-end items-center mt-[44px] bg-transparent
      border-b border-navy-border border-0.5 py-1.5"
    >
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
