import { create } from "zustand";
import { persist } from "zustand/middleware";
import { simulateApi } from "../services/mockApi";
import toast from "react-hot-toast";

export const useBoardStore = create(
  persist(
    (set, get) => ({
      tasks: [],

      addTask: async (title) => {
        const snapshot = get().tasks;

        const newTask = {
          id: crypto.randomUUID(),
          title,
          column: "todo",
        };

        set({ tasks: [...snapshot, newTask] });

        try {
          await simulateApi(newTask);
        } catch {
          set({ tasks: snapshot }); 
          toast.error("Failed to add task");

        }
      },

      moveTask: async (id, newColumn) => {
        const snapshot = get().tasks;

        const updated = snapshot.map((task) =>
          task.id === id ? { ...task, column: newColumn } : task,
        );

        set({ tasks: updated });

        try {
          await simulateApi(updated);
        } catch {
          set({ tasks: snapshot });
          toast.error("Move failed");

        }
      },

      deleteTask: async (id) => {
        const snapshot = get().tasks;

        const updated = snapshot.filter((task) => task.id !== id);

        set({ tasks: updated });



        try {
          await simulateApi();
          toast.success("Task deleted");

        } catch {
          set({ tasks: snapshot });
          toast.error("Delete failed");

        }
      },
    }),
    {
      name: "kanban-storage",
    },
  ),
);
