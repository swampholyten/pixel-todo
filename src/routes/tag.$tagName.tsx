import TaskCard from "@/components/TaskCard";
import { useTasks } from "@/lib/taskContext";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/tag/$tagName")({
  component: TagPage,
});

function TagPage() {
  const { tagName } = Route.useParams();
  const { tasks } = useTasks();
  const filtered = tasks.filter((t) => t.tags?.includes(tagName));
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Tag: {tagName}</h1>
      <div className="flex flex-col gap-2">
        {filtered.map((t) => (
          <TaskCard key={t.id} task={t} />
        ))}
        {filtered.length === 0 && (
          <p className="text-muted-foreground">No tasks with this tag</p>
        )}
      </div>
    </div>
  );
}
