import Image from "next/image";

import { cn } from "@/lib/utils";

/**
 * A project's preview, staged the way a product portfolio stages it: a flat
 * filled ground, and the work set into it as a single slab that runs off the
 * bottom edge. A raw interface screenshot gets a browser frame; a finished
 * cover slide is set in as it is. Flat, hairline-bordered, no shadow, so it
 * reads as Square rather than as a device render.
 */
export function ProjectVisual({
  cover,
  screen,
  sizes,
  priority = false,
  className,
}: {
  cover: string;
  screen?: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("relative overflow-hidden rounded-2xl bg-muted", className)}>
      {screen ? (
        <div className="absolute inset-x-[7%] bottom-0 top-[9%] overflow-hidden rounded-t-xl border border-b-0 border-border bg-background">
          <div className="flex h-7 items-center gap-1.5 border-b border-border px-3" aria-hidden="true">
            <span className="size-2 rounded-full bg-[color-mix(in_oklab,var(--foreground)_18%,transparent)]" />
            <span className="size-2 rounded-full bg-[color-mix(in_oklab,var(--foreground)_18%,transparent)]" />
            <span className="size-2 rounded-full bg-[color-mix(in_oklab,var(--foreground)_18%,transparent)]" />
          </div>
          <div className="relative h-[calc(100%-1.75rem)]">
            <Image
              src={screen}
              alt=""
              fill
              sizes={sizes}
              priority={priority}
              quality={90}
              className="object-cover object-left-top"
            />
          </div>
        </div>
      ) : (
        // Covers are landscape slides at about 1.41:1. The slab keeps that
        // ratio so no text is cropped, and sinks 6% below the stage edge.
        <div className="absolute inset-x-[5%] -bottom-[6%] aspect-[1.41] overflow-hidden rounded-xl border border-border bg-background">
          <Image
            src={cover}
            alt=""
            fill
            sizes={sizes}
            priority={priority}
            quality={90}
            className="object-cover object-top"
          />
        </div>
      )}
    </div>
  );
}
