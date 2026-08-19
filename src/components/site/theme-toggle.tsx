"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "@phosphor-icons/react/dist/ssr";

/**
 * No mount gate and no hydration guard: both icons are rendered and CSS picks
 * which one shows, so the server output is already correct in either theme.
 */
export function ThemeToggle({ label }: { label: string }) {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      aria-label={label}
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="flex size-10 shrink-0 items-center justify-center border border-border text-foreground/70 outline-none transition-colors hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
    >
      <Moon className="size-4 dark:hidden" />
      <Sun className="hidden size-4 dark:block" />
    </button>
  );
}
