import { MI_PATH, MI_TRANSFORM, MI_VIEWBOX } from "@/components/site/mi-mark-path";
import { cn } from "@/lib/utils";

/**
 * The MI brush monogram, inline so it takes the current text colour or an
 * explicit fill. The artwork comes from scripts/build-logo.mjs.
 */
export function MiMark({ className, title }: { className?: string; title?: string }) {
  return (
    <svg
      viewBox={MI_VIEWBOX}
      className={cn("h-auto", className)}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <path fill="currentColor" transform={MI_TRANSFORM} d={MI_PATH} />
    </svg>
  );
}
