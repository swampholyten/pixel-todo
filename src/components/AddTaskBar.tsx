import { useTasks } from "@/hooks/useTasks";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import dayjs from "dayjs";
import type { Priority } from "@/lib/db";
import TagSelect from "./TagSelect";

export default function AddTaskBar() {
  const { add, tags: availableTags } = useTasks();
  const [title, setTitle] = useState("");
  const [date, setDate] = useState<Date | null>(null);
  const [priority, setPriority] = useState<Priority>("low");
  const [taskTags, setTaskTags] = useState<string[]>([]);
  const [openCal, setOpenCal] = useState(false);

  const submit = async () => {
    if (!title.trim()) return;
    await add({
      title: title.trim(),
      dueDate: date ? dayjs(date).startOf("day").toISOString() : undefined,
      priority: priority,
      tags: taskTags,
    });
    setTitle("");
    setDate(null);
    setPriority("low");
    setTaskTags([]);
  };

  return (
    <div className="mt-4 grid gap-2 sm:grid-cols-7">
      <Input
        placeholder="Task title…"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="sm:col-span-2"
        onKeyDown={(e) => e.key === "Enter" && submit()}
      />

      {/* Date picker */}
      <Popover open={openCal} onOpenChange={setOpenCal}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="sm:col-span-1 w-full">
            {date ? dayjs(date).format("MMM D, YYYY") : "Due date"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0">
          <Calendar
            mode="single"
            selected={date ?? undefined}
            onSelect={(d) => setDate(d ?? null)}
          />
        </PopoverContent>
      </Popover>

      <Select
        value={priority}
        onValueChange={(val) => setPriority(val as Priority)}
      >
        <SelectTrigger className="sm:col-span-1 w-full">
          <SelectValue placeholder="Priority" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="low">Low</SelectItem>
          <SelectItem value="medium">Medium</SelectItem>
          <SelectItem value="high">High</SelectItem>
        </SelectContent>
      </Select>

      <div className="sm:col-span-2">
        <TagSelect
          available={availableTags}
          value={taskTags}
          onChange={setTaskTags}
        />
      </div>

      <Button className="sm:col-span-1" onClick={submit}>
        Add
      </Button>
    </div>
  );
}
