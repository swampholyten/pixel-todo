import { Moon, Sun } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/components/ThemeProvider";
import { useEffect, useState } from "react";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [isChecked, setIsChecked] = useState(theme === "dark");

  useEffect(() => {
    setIsChecked(theme === "dark");
  }, [theme]);

  const handleThemeChange = (checked: boolean) => {
    setIsChecked(checked);
    setTheme(checked ? "dark" : "light");
  };

  return (
    <div className="flex items-center gap-2">
      <Sun className="h-[1.2rem] w-[1.2rem] text-foreground/60" />
      <Switch
        id="theme"
        checked={isChecked}
        onCheckedChange={handleThemeChange}
      />
      <Moon className="h-[1.2rem] w-[1.2rem] text-foreground/60" />
      <span className="sr-only">Toggle theme</span>
    </div>
  );
}
