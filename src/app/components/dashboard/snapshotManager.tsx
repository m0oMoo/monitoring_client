import { useState } from "react";

const SnapshotManager = ({
  layout,
  onRestore,
}: {
  layout: any;
  onRestore: (layout: any) => void;
}) => {
  const [snapshots, setSnapshots] = useState<any[]>([]);

  const saveSnapshot = () => {
    const newSnapshot = [...layout];
    setSnapshots((prev) => [...prev, newSnapshot]);
    localStorage.setItem(
      "snapshots",
      JSON.stringify([...snapshots, newSnapshot])
    );
  };

  const restoreSnapshot = (index: number) => {
    const savedLayout = snapshots[index];
    onRestore(savedLayout);
  };

  return (
    <div>
      <button onClick={saveSnapshot}>Save Snapshot</button>
      {snapshots.map((_, index) => (
        <button key={index} onClick={() => restoreSnapshot(index)}>
          Restore {index + 1}
        </button>
      ))}
    </div>
  );
};

export default SnapshotManager;
