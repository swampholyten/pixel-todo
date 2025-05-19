import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { db, createTask, toggleTask, deleteTask } from "@/lib/db";
import type { AddTask, Task } from "@/lib/db";

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

  return {
    tasks,
    add: add.mutateAsync,
    toggle: toggle.mutateAsync,
    remove: remove.mutateAsync,
  } as const;
}
