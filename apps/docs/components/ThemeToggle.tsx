import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Button } from "@rafty/ui";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const otherTheme = resolvedTheme === "dark" ? "light" : "dark";
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Button
      type="button"
      size="icon"
      variant="ghost"
      aria-label={mounted ? `Switch to ${otherTheme} theme` : "Toggle theme"}
      onClick={() => setTheme(otherTheme)}
    >
      <HiOutlineSun className="stroke-secondary-900 dark:hidden " />
      <HiOutlineMoon className="hidden stroke-white dark:block" />
    </Button>
  );
}
