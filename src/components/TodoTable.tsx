import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2, Filter } from "lucide-react";
import dayjs from "dayjs";
import type { Task } from "@/lib/db";
import { useTasks } from "../hooks/useTasks";
import { cn } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import TagSelect from "./TagSelect";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

interface Props {
  tasks: Task[];
  emptyMessage?: string;
}

const priorityClass: Record<Task["priority"], string> = {
  low: "text-green-600",
  medium: "text-yellow-600",
  high: "text-red-600",
};

const EMPTY_HEIGHT = 220; // maintains height when table empty

export default function TodoTable({
  tasks,
  emptyMessage = "No tasks yet",
}: Props) {
  const { toggle, remove, tags: availableTags } = useTasks();
  const [filterTags, setFilterTags] = useState<string[]>([]);

  const visible = filterTags.length
    ? tasks.filter((t) => t.tags?.some((tg) => filterTags.includes(tg)))
    : tasks;

  return (
    <div className="border rounded-xl flex flex-col">
      {/* Filter bar */}
      <div className="flex items-center justify-between px-4 py-1 border-b bg-muted/40">
        <span className="flex items-center gap-2 text-sm text-muted-foreground">
          <Filter size={14} /> Filter by tags
        </span>
        <div className="w-64">
          <TagSelect
            available={availableTags}
            value={filterTags}
            onChange={setFilterTags}
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table
          className={cn(
            "table-fixed w-full",
            visible.length === 0 && `min-h-[${EMPTY_HEIGHT}px]`,
          )}
        >
          <TableHeader>
            <TableRow>
              <TableHead className="w-10" />
              <TableHead className="min-w-[220px]">Title</TableHead>
              <TableHead className="w-28 whitespace-nowrap">Due</TableHead>
              <TableHead className="w-24 whitespace-nowrap">Priority</TableHead>
              <TableHead className="min-w-[180px]">Tags</TableHead>
              <TableHead className="w-10" />
            </TableRow>
          </TableHeader>

          <TableBody>
            {visible.map((task) => (
              <TableRow
                key={task.id}
                className={task.completed ? "opacity-50" : ""}
              >
                <TableCell className="w-10">
                  <Checkbox
                    checked={task.completed}
                    onCheckedChange={() => toggle(task.id)}
                  />
                </TableCell>

                <TableCell
                  className={cn(
                    "break-words",
                    task.completed && "line-through",
                  )}
                >
                  {task.title}
                </TableCell>

                <TableCell className="whitespace-nowrap">
                  {task.dueDate ? dayjs(task.dueDate).format("MMM D") : "—"}
                </TableCell>

                <TableCell
                  className={cn(
                    "whitespace-nowrap",
                    priorityClass[task.priority],
                  )}
                >
                  {task.priority ?? "—"}
                </TableCell>

                <TableCell>
                  {task.tags?.length ? (
                    <div className="flex flex-wrap gap-1">
                      {task.tags.map((tag) => (
                        <Badge key={tag}>{tag}</Badge>
                      ))}
                    </div>
                  ) : (
                    "—"
                  )}
                </TableCell>

                <TableCell className="w-10">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="hover:bg-muted rounded-md"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete task?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This will permanently remove "{task.title}". You can’t
                          undo this.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => remove(task.id)}>
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))}

            {visible.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-6 text-muted-foreground"
                >
                  {emptyMessage}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
