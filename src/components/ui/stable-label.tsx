"use client";

import { useLocale } from "@/components/site/locale-provider";
import { locales, t, type L } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/**
 * Renders the label for the active locale, and stacks every other locale's
 * wording in the same grid cell with visibility hidden. The box therefore
 * measures the widest translation, so a button keeps its width when the
 * language changes. Hidden cells leave the accessibility tree, so a screen
 * reader still hears one label.
 */
export function StableLabel({ value, className }: { value: L; className?: string }) {
  const locale = useLocale();

  return (
    <span className={cn("grid justify-items-center text-center", className)}>
      {locales.map((entry) => (
        <span
          key={entry}
          aria-hidden={entry === locale ? undefined : true}
          className={cn(
            "col-start-1 row-start-1 whitespace-nowrap",
            entry === locale ? "" : "invisible",
          )}
        >
          {t(value, entry)}
        </span>
      ))}
    </span>
  );
}
