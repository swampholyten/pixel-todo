import TodoTable from "@/components/TodoTable";
import { useTasks } from "@/hooks/useTasks";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/list/$listId")({
  component: ListPage,
});

function ListPage() {
  const { listId } = Route.useParams();
  const { tasks } = useTasks();
  const listTasks = tasks.filter((t) => t.listId === listId && !t.completed);
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">List: {listId}</h1>
      <div className="flex flex-col gap-2">
        <TodoTable tasks={listTasks} emptyMessage="No tasks in this list 🤷" />
      </div>
    </div>
  );
}
