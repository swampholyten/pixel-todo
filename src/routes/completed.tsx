import TodoTable from "@/components/TodoTable";
import { useTasks } from "@/lib/taskContext";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/completed")({
  component: CompletedPage,
});

function CompletedPage() {
  const { tasks } = useTasks();
  const done = tasks.filter((t) => t.completed);
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Completed</h1>
      <div className="flex flex-col gap-2">
        <TodoTable tasks={done} emptyMessage="No completed tasks yet 🫥" />
      </div>
    </div>
  );
}
