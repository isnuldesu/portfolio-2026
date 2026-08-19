"use client";

import Image from "next/image";
import { m, useReducedMotion } from "motion/react";

import { MotionProvider } from "@/components/site/motion-provider";
import type { GalleryItem } from "@/content/case-studies";

/**
 * Plates run down the right, and each one's note sticks alongside it on the
 * left until the next plate arrives. Keeps the reading order obvious without
 * hanging a caption under every image.
 */
export function CaseStudyGallery({ items }: { items: GalleryItem[] }) {
  const reduceMotion = useReducedMotion();

  return (
    <section className="mx-auto mt-20 max-w-6xl px-6">
      <div className="flex items-baseline justify-between gap-6 border-b border-border pb-5">
        <h2 className="font-display text-2xl font-medium tracking-tight md:text-3xl">
          Inside the project
        </h2>
        <p className="font-mono text-xs text-muted-foreground">
          {String(items.length).padStart(2, "0")} plates
        </p>
      </div>

      <MotionProvider>
        <ol className="mt-12 space-y-16 lg:space-y-24">
          {items.map((item, index) => (
            <li
              key={item.src}
              className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.3fr)] lg:gap-12"
            >
              <div className="lg:sticky lg:top-24 lg:self-start">
                <p
                  className="font-display text-4xl font-medium leading-none"
                  style={{ color: "var(--lime-ink)" }}
                >
                  {String(index + 1).padStart(2, "0")}
                </p>
                <p className="mt-4 max-w-[30ch] text-base leading-relaxed text-foreground/75">
                  {item.caption}
                </p>
              </div>

              <m.figure
                {...(reduceMotion
                  ? {}
                  : {
                      initial: { opacity: 0, y: 26 },
                      whileInView: { opacity: 1, y: 0 },
                      viewport: { once: true, amount: 0.15 },
                      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
                    })}
                className="surface overflow-hidden rounded-3xl"
              >
                <Image
                  src={item.src}
                  alt={item.caption}
                  width={item.width}
                  height={item.height}
                  priority={index === 0}
                  quality={90}
                  sizes="(max-width: 1024px) 100vw, 760px"
                  className="h-auto w-full"
                />
              </m.figure>
            </li>
          ))}
        </ol>
      </MotionProvider>
    </section>
  );
}
