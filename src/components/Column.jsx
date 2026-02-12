import { useBoardStore } from "../store/useBoardStore";
import { useDroppable, useDraggable } from "@dnd-kit/core";

export default function Column({ title, column }) {
  const tasks = useBoardStore((s) => s.tasks);
  const deleteTask = useBoardStore((s) => s.deleteTask);

  // ⚠️ derive AFTER subscribing (prevents infinite loop)
  const columnTasks = tasks.filter((task) => task.column === column);

  // ✅ droppable column
  const { setNodeRef } = useDroppable({
    id: column,
  });

  return (
    <div
      ref={setNodeRef}
      className="flex-1 bg-zinc-800 p-4 rounded-xl border border-zinc-700"
    >
      <h2 className="font-bold mb-4">{title}</h2>

      <div className="space-y-3">
        {columnTasks.length === 0 && (
          <p className="text-zinc-500 text-sm">No tasks</p>
        )}

        {columnTasks.map((task) => (
          <DraggableTask key={task.id} task={task} deleteTask={deleteTask} />
        ))}
      </div>
    </div>
  );
}

function DraggableTask({ task, deleteTask }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });

  const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="bg-zinc-900 p-3 rounded border border-zinc-700 cursor-grab active:cursor-grabbing"
    >
      <p>{task.title}</p>

      <button
        onPointerDown={(e) => e.stopPropagation()}
        onClick={(e) => {
          e.stopPropagation();
          deleteTask(task.id);
        }}
        className="text-xs bg-red-600 px-2 py-1 rounded mt-2"
      >
        Delete
      </button>
    </div>
  );
}
