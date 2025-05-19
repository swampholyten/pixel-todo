import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2 } from "lucide-react";
import dayjs from "dayjs";
import type { Task } from "@/lib/db";
import { cn } from "@/lib/utils";
import { useTasks } from "@/hooks/useTasks";
import { Button } from "./ui/button";

interface Props {
  tasks: Task[];
  emptyMessage: string;
}

const priorityClass: Record<Task["priority"], string> = {
  low: "text-green-600",
  medium: "text-yellow-600",
  high: "text-red-600",
};

export default function TodoTable({ tasks, emptyMessage }: Props) {
  const { toggle, remove } = useTasks();

  return (
    <Table className="border rounded-xl">
      <TableHeader>
        <TableRow>
          <TableHead className="w-10" />
          <TableHead>Title</TableHead>
          <TableHead className="w-32">Due</TableHead>
          <TableHead className="w-24">Priority</TableHead>
          <TableHead className="w-10" />
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasks.map((task) => (
          <TableRow
            key={task.id}
            className={task.completed ? "opacity-50" : ""}
          >
            <TableCell>
              <Checkbox
                checked={task.completed}
                onCheckedChange={() => toggle(task.id)}
              />
            </TableCell>
            <TableCell className={cn(task.completed && "line-through")}>
              {task.title}
            </TableCell>
            <TableCell>
              {task.dueDate ? dayjs(task.dueDate).format("MMM D") : "—"}
            </TableCell>
            <TableCell className={priorityClass[task.priority]}>
              {task.priority ?? "—"}
            </TableCell>
            <TableCell>
              <Button
                onClick={() => remove(task.id)}
                className="p-1 hover:bg-muted rounded-md"
              >
                <Trash2 size={16} />
              </Button>
            </TableCell>
          </TableRow>
        ))}
        {tasks.length === 0 && (
          <TableRow>
            <TableCell
              colSpan={5}
              className="text-center py-3 text-muted-foreground"
            >
              <p>{emptyMessage}</p>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
