"use client";

import Image from "next/image";
import { m, useReducedMotion } from "motion/react";

import { MotionProvider } from "@/components/site/motion-provider";

import type { GalleryItem } from "@/content/case-studies";

/** Deck pages, full bleed inside the reading column, captioned underneath. */
export function CaseStudyGallery({ items }: { items: GalleryItem[] }) {
  const reduceMotion = useReducedMotion();

  return (
    <section className="mx-auto mt-16 max-w-5xl px-3 sm:px-6">
      <MotionProvider>
      <ul className="space-y-6">
        {items.map((item, index) => (
          <m.li
            key={item.src}
            {...(reduceMotion
              ? {}
              : {
                  initial: { opacity: 0, y: 28 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true, amount: 0.15 },
                  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
                })}
          >
            <figure>
              <div className="surface overflow-hidden rounded-3xl">
                <Image
                  src={item.src}
                  alt={item.caption}
                  width={item.width}
                  height={item.height}
                  priority={index === 0}
                  quality={90}
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  className="h-auto w-full"
                />
              </div>
              <figcaption className="mt-3 px-1 text-sm text-muted-foreground">
                {item.caption}
              </figcaption>
            </figure>
          </m.li>
        ))}
      </ul>
      </MotionProvider>
    </section>
  );
}
