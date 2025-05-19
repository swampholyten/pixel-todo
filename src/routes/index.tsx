import AddTaskBar from "@/components/AddTaskBar";
import TodoTable from "@/components/TodoTable";
import { useTasks } from "@/lib/taskContext";
import { createFileRoute } from "@tanstack/react-router";
import dayjs from "dayjs";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  const { tasks } = useTasks();
  const today = dayjs().startOf("day");
  const upcoming = tasks.filter(
    (t) => t.dueDate && dayjs(t.dueDate).isAfter(today) && !t.completed,
  );
  const todayTasks = tasks.filter(
    (t) => t.dueDate && dayjs(t.dueDate).isSame(today, "day") && !t.completed,
  );

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Today</h1>
      <div className="flex flex-col gap-2">
        <TodoTable tasks={todayTasks} emptyMessage="No tasks for today ✨" />
      </div>

      <h2 className="text-xl font-semibold mt-8 mb-4">Upcoming</h2>
      <div className="flex flex-col gap-2">
        <TodoTable tasks={upcoming} emptyMessage="Nothing upcoming 🎉" />
      </div>

      <AddTaskBar />
    </div>
  );
}
