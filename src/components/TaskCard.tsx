import { Checkbox } from "@/components/ui/checkbox";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import dayjs from "dayjs";
import type { Task } from "@/lib/db";
import { useTasks } from "@/lib/taskContext";

interface Props {
  task: Task;
}

export default function TaskCard({ task }: Props) {
  const { toggle, remove } = useTasks();
  return (
    <div className="flex items-center justify-between rounded-xl border p-2 bg-card">
      <div className="flex items-center gap-2">
        <Checkbox
          checked={task.completed}
          onCheckedChange={() => toggle(task.id)}
        />
        <div>
          <p
            className={
              task.completed ? "line-through text-muted-foreground" : ""
            }
          >
            {task.title}
          </p>
          {task.dueDate && (
            <p className="text-xs text-muted-foreground">
              {dayjs(task.dueDate).format("MMM D")}
            </p>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2">
        {task.priority && <Badge variant="outline">{task.priority}</Badge>}
        <button
          className="p-1 hover:bg-muted rounded-md"
          onClick={() => remove(task.id)}
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
