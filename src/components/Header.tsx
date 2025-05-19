import { Home, ListChecks, CheckCircle, Settings } from "lucide-react";
import { Link } from "@tanstack/react-router";

const links = [
  { to: "/", label: "Today", icon: Home },
  { to: "/all", label: "All", icon: ListChecks },
  { to: "/completed", label: "Completed", icon: CheckCircle },
  { to: "/settings", label: "Settings", icon: Settings },
];

export default function Navbar() {
  return (
    <aside className="bg-muted/50 border-r flex flex-col p-2 gap-2 w-full md:w-48">
      {links.map(({ to, label, icon: Icon }) => (
        <Link
          key={to}
          to={to}
          className="flex items-center gap-2 rounded-xl p-2 hover:bg-muted transition [&.active]:bg-muted"
        >
          <Icon size={18} />
          <span>{label}</span>
        </Link>
      ))}
    </aside>
  );
}
