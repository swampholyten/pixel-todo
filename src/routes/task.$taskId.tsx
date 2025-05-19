import { useTasks } from "@/hooks/useTasks";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/task/$taskId")({
  component: TaskDetailPage,
});

function TaskDetailPage() {
  const { taskId } = Route.useParams();
  const { tasks } = useTasks();
  const task = tasks.find((t) => t.id === taskId);

  if (!task) return <p>Task not found</p>;
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{task.title}</h1>
      <pre className="whitespace-pre-wrap">{JSON.stringify(task, null, 2)}</pre>
    </div>
  );
}
