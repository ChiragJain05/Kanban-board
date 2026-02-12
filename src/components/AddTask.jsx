import { useState } from "react";
import { useBoardStore } from "../store/useBoardStore";

export default function AddTask() {
  const [title, setTitle] = useState("");

  const addTask = useBoardStore((s) => s.addTask);

  const handleAdd = () => {
    if (!title.trim()) return;

    addTask(title);
    setTitle("");
  };

  return (
    <div className="mb-6 flex gap-2">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New Task..."
        className="flex-1 p-3 rounded bg-zinc-800 border border-zinc-700"
      />

      <button
        onClick={handleAdd}
        className="bg-indigo-600 px-4 rounded hover:bg-indigo-700"
      >
        Add
      </button>
    </div>
  );
}
