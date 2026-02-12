import { useDraggable } from "@dnd-kit/core";
import { useBoardStore } from "../store/useBoardStore";

export default function TaskCard({ task }) {
  const deleteTask = useBoardStore((s) => s.deleteTask);

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });

  const style = transform
    ? { transform: `translate(${transform.x}px, ${transform.y}px)` }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className="bg-gray-50 p-3 rounded-lg shadow mb-3 flex justify-between"
    >
      {task.title}

      <button onClick={() => deleteTask(task.id)} className="text-red-500">
        ✕
      </button>
    </div>
  );
}
