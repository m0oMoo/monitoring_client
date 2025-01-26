import React from "react";
import { Layout } from "react-grid-layout";
import Btn from "../button/basic/btn";

const SnapshotManager = ({
  layout,
  snapshots,
  onSave,
  onRestore,
  onDelete,
}: {
  layout: Layout[];
  snapshots: { layout: Layout[]; tab: string; timestamp: string }[];
  onSave: () => void;
  onRestore: (snapshot: Layout[]) => void;
  onDelete: (index: number) => void;
}) => (
  <div className="p-4 border rounded-lg bg-gray-100">
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-lg font-semibold">Snapshots</h3>
      <Btn onClick={onSave} title={"Save Snapshot"} color={"green"} />
    </div>
    <ul className="list-disc ml-4 space-y-2">
      {snapshots.map((snapshot, index) => (
        <li key={index} className="flex justify-between items-center">
          <span>
            {snapshot.tab} Snapshot {index + 1} - {snapshot.timestamp}
          </span>
          <div className="flex gap-2">
            <Btn
              onClick={() => onRestore(snapshot.layout)}
              title={"Restore"}
              color={"gray"}
            />
            <Btn
              onClick={() => onDelete(index)}
              title={"Delete"}
              color={"red"}
            />
          </div>
        </li>
      ))}
    </ul>
  </div>
);

export default SnapshotManager;
