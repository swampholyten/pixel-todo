import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { db, createTask, toggleTask, deleteTask } from "@/lib/db";
import type { AddTask, Task } from "@/lib/db";

const DEFAULT_TAGS = [
  "💼 work",
  "🏠 personal",
  "🛒 shopping",
  "🚨 urgent",
  "💡 ideas",
  "🩺 health",
  "💰 finance",
  "✈️ travel",
  "📚 education",
  "🎉 social",
  "🎨 hobbies",
  "🔔 reminders",
  "🏗️ projects",
  "🔬 research",
  "✍️ daily log",
  "✨ wishlist",
  "📞 follow-up",
  "🛠️ maintenance",
] as const;

export function useTasks() {
  const qc = useQueryClient();
  const { data: tasks = [] } = useQuery<Task[]>({
    queryKey: ["tasks"],
    queryFn: () => db.tasks.toArray(),
  });

  const add = useMutation({
    mutationFn: (opts: AddTask) => createTask(opts),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["tasks"] }),
  });
  const toggle = useMutation({
    mutationFn: (id: string) => toggleTask(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["tasks"] }),
  });
  const remove = useMutation({
    mutationFn: (id: string) => deleteTask(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["tasks"] }),
  });

  const tags = [
    ...new Set<string>([
      ...DEFAULT_TAGS,
      ...tasks.flatMap((t) => t.tags ?? []),
    ]),
  ].sort();

  return {
    tasks,
    tags,
    add: add.mutateAsync,
    toggle: toggle.mutateAsync,
    remove: remove.mutateAsync,
  } as const;
}
