import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/tag/$tagName")({
  component: TagPage,
});

function TagPage() {
  return <div>TODO</div>;
}
