import { DndContext } from "@dnd-kit/core";
import Column from "../components/Column";
import AddTask from "../components/AddTask";
import { logout } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import { useBoardStore } from "../store/useBoardStore";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";

export default function Board() {
  const navigate = useNavigate();
  const moveTask = useBoardStore((s) => s.moveTask);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="p-8 min-h-screen">
      <div className="flex justify-between mb-8">
        <h1 className="text-2xl font-bold">Kanban Board</h1>

        <button onClick={handleLogout} className="bg-red-600 px-4 py-2 rounded">
          Logout
        </button>
      </div>

      <AddTask />

      <DndContext
        modifiers={[restrictToWindowEdges]}
        onDragEnd={({ active, over }) => {
          if (!over) return;
          moveTask(active.id, over.id);
        }}
      >
        <div className="flex gap-6 mt-6">
          <Column title="To Do" column="todo" />
          <Column title="In Progress" column="inprogress" />
          <Column title="Done" column="done" />
        </div>
      </DndContext>
    </div>
  );
}
