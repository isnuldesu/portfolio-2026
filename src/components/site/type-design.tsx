"use client";

import Image from "next/image";
import { m, useReducedMotion } from "motion/react";

import { typefaces } from "@/content/site";

/**
 * Specimens are wide by nature, so this is a scroll-snap rail rather than a
 * grid: the reader flicks through them instead of scanning a wall of tiles.
 */
export function TypeDesign() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="type" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="font-display max-w-[22ch] text-3xl font-medium tracking-tight text-balance md:text-4xl">
          Four typefaces, drawn character by character.
        </h2>
        <p className="mt-4 max-w-[56ch] text-base leading-relaxed text-muted-foreground">
          Type design started as a personal habit in 2020 and now feeds the brand
          work. Drag or scroll the row.
        </p>
      </div>

      <m.ul
        {...(reduceMotion
          ? {}
          : {
              initial: { opacity: 0, y: 24 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true, amount: 0.2 },
              transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
            })}
        className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 [scrollbar-width:thin]"
      >
        {typefaces.map((face) => (
          <li
            key={face.name}
            className="surface w-[19rem] shrink-0 snap-start overflow-hidden rounded-3xl sm:w-[24rem]"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
              <Image
                src={face.image}
                alt={`${face.name} specimen`}
                fill
                sizes="(max-width: 640px) 304px, 384px"
                quality={90}
                className="object-cover"
              />
            </div>
            <div className="flex items-start justify-between gap-3 p-5">
              <div>
                <h3 className="text-base font-medium tracking-tight">{face.name}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {face.note}
                </p>
              </div>
              {face.year ? (
                <span className="shrink-0 font-mono text-xs tabular-nums text-muted-foreground">
                  {face.year}
                </span>
              ) : null}
            </div>
          </li>
        ))}
      </m.ul>
    </section>
  );
}
