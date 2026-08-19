"use client";

import Image from "next/image";
import Link from "next/link";
import { m, useReducedMotion } from "motion/react";

import { useLocale } from "@/components/site/locale-provider";
import { typefaces } from "@/content/site";
import { ui } from "@/content/ui";
import { t } from "@/lib/i18n";

/**
 * Specimens are wide by nature, so this is a scroll-snap rail rather than a
 * grid: the reader flicks through them instead of scanning a wall of tiles.
 */
export function TypeDesign() {
  const locale = useLocale();
  const reduceMotion = useReducedMotion();

  return (
    <section id="type" className="">
      <div>
        <h2 className="font-display max-w-[22ch] text-3xl font-medium tracking-tight text-balance md:text-4xl">
          {t(ui.type.heading, locale)}
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
        className="mt-10 flex snap-x snap-mandatory gap-0 overflow-x-auto pb-4 [scrollbar-width:thin]"
      >
        {typefaces.map((face) => (
          <li key={face.name} className="-ml-0.5 w-[19rem] shrink-0 snap-start sm:w-[24rem]">
            <Link
              href={`/${locale}/work/${face.slug}`}
              className="group block border-2 border-border p-5 outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
            >
            <div className="relative aspect-[4/3] overflow-hidden border-2 border-border">
              <Image
                src={face.image}
                alt={`${face.name} specimen`}
                fill
                sizes="(max-width: 640px) 304px, 384px"
                quality={90}
                className="object-cover"
              />
            </div>
            <div className="mt-4 flex items-start justify-between gap-3">
              <div>
                {/* Each name is set in its own face. */}
                <h3
                  className="text-2xl leading-none group-hover:underline"
                  style={{ fontFamily: `"${face.family}"` }}
                >
                  {face.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {t(face.note, locale)}
                </p>
              </div>
              {face.year ? (
                <span className="shrink-0 font-mono text-xs tabular-nums text-muted-foreground">
                  {face.year}
                </span>
              ) : null}
            </div>
            </Link>
          </li>
        ))}
      </m.ul>
    </section>
  );
}
