import Dexie, { type Table } from "dexie";
import { v4 as uuid } from "uuid";

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  dueDate?: string;
  priority: "low" | "medium" | "high";
  tags?: string[];
  listId?: string;
  notes?: string;
}

export type AddTask = Omit<Task, "id" | "completed">;

export interface List {
  id: string;
  name: string;
  color?: string;
}

export interface Setting {
  key: string;
  value: string;
}

class TodoDB extends Dexie {
  tasks!: Table<Task>;
  lists!: Table<List>;
  settings!: Table<Setting>;

  constructor() {
    super("todo_db");
    this.version(1).stores({
      tasks: "id, completed, dueDate, listId, *tags",
      lists: "id",
      settings: "key",
    });
  }
}

export const db = new TodoDB();

export const createTask = async (partial: AddTask) => {
  const task: Task = {
    id: uuid(),
    completed: false,
    ...partial,
  };

  await db.tasks.add(task);
  return task;
};

export const toggleTask = async (id: string) => {
  const task = await db.tasks.get(id);
  if (task) {
    task.completed = !task.completed;
    await db.tasks.put(task);
  }
};

export const deleteTask = async (id: string) => db.tasks.delete(id);
