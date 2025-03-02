import React from "react";

type TimeRangePickerProps = {
  from: string | null;
  to: string | null;
  onChange: (type: "from" | "to", value: string) => void;
};

const TimeRangePicker = ({ from, to, onChange }: TimeRangePickerProps) => {
  return (
    <div className="flex gap-2 items-center">
      <label className="text-sm_bold">From:</label>
      {from && (
        <input
          type="datetime-local"
          value={from}
          onChange={(e) => onChange("from", e.target.value)}
          className="border py-1 px-2 rounded text-sm1"
        />
      )}
      <label className="text-sm_bold">To:</label>
      {to && (
        <input
          type="datetime-local"
          value={to}
          onChange={(e) => onChange("to", e.target.value)}
          className="border py-1 px-2 rounded text-sm1"
        />
      )}
    </div>
  );
};

export default TimeRangePicker;
