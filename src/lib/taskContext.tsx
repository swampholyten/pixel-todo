import { createContext, useContext, useEffect, useState } from "react";
import {
  createTask,
  db,
  deleteTask,
  toggleTask,
  type AddTask,
  type Task,
} from "./db";

interface TaskCtx {
  tasks: Task[];
  refresh: () => Promise<void>;
  add: (opts: AddTask) => Promise<void>;
  toggle: (id: string) => Promise<void>;
  remove: (id: string) => Promise<void>;
}

const Context = createContext<TaskCtx | null>(null);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const refresh = async () => {
    setTasks(await db.tasks.toArray());
  };

  const add = async (opts: AddTask) => {
    await createTask(opts);
    await refresh();
  };

  const toggle = async (id: string) => {
    await toggleTask(id);
    await refresh();
  };

  const remove = async (id: string) => {
    await deleteTask(id);
    await refresh();
  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <Context.Provider value={{ tasks, refresh, add, toggle, remove }}>
      {children}
    </Context.Provider>
  );
};

export const useTasks = () => {
  const ctx = useContext(Context);
  if (!ctx) throw new Error("useTasks must be used within TaskProvider");
  return ctx;
};
