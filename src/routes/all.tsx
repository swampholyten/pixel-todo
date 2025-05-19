import AddTaskBar from "@/components/AddTaskBar";
import TodoTable from "@/components/TodoTable";
import { useTasks } from "@/hooks/useTasks";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/all")({
  component: AllTasksPage,
});

export default function AllTasksPage() {
  const { tasks } = useTasks();
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">All Tasks</h1>
      <div className="flex flex-col gap-2">
        <TodoTable tasks={tasks} emptyMessage="Your list is empty 🈳" />
      </div>
      <AddTaskBar />
    </div>
  );
}
