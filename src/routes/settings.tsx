import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  const clear = async () => {
    await db.delete();
    window.location.reload();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      <Button variant="destructive" onClick={clear}>
        Clear All Data
      </Button>
    </div>
  );
}
