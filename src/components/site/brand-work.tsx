"use client";

import Image from "next/image";
import Link from "next/link";
import { m, useReducedMotion } from "motion/react";

import { useLocale } from "@/components/site/locale-provider";
import { brandProjects } from "@/content/site";
import { ui } from "@/content/ui";
import { t } from "@/lib/i18n";

/**
 * Identity work reads through the artwork, so the image is the tile and the
 * caption sits underneath it. Large tiles take two columns on desktop, which
 * gives the grid rhythm without leaving an empty cell: 2 + 1 + 1 + 2 + 1.
 */
export function BrandWork() {
  const locale = useLocale();
  const reduceMotion = useReducedMotion();

  return (
    <section id="brand" className="">
      <h2 className="font-display max-w-[20ch] text-3xl font-medium tracking-tight text-balance md:text-4xl">
        {t(ui.brand.heading, locale)}
      </h2>
      <p className="mt-4 max-w-[56ch] text-base leading-relaxed text-muted-foreground">
        {t(ui.brand.body, locale)}
      </p>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2">
        {brandProjects.map((project, index) => (
          <m.article
            key={project.title}
            {...(reduceMotion
              ? {}
              : {
                  initial: { opacity: 0, y: 28 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true, amount: 0.2 },
                  transition: {
                    duration: 0.6,
                    delay: (index % 3) * 0.08,
                    ease: [0.16, 1, 0.3, 1] as const,
                  },
                  whileHover: { y: -6 },
                })}
            className="group -ml-0.5 -mt-0.5 border-2 border-border p-5"
          >
            <Link href={`/${locale}/work/${project.slug}`} className="block outline-none focus-visible:ring-3 focus-visible:ring-ring/50">
            <div className="relative aspect-[4/3] overflow-hidden border-2 border-border">
              <Image
                src={project.image}
                alt={`${project.title} title card`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1152px) 66vw, 760px"
                quality={90}
                className="object-contain p-3 transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
            </div>

            <div className="mt-4 flex items-start justify-between gap-4">
              <div>
                <h3 className="text-base font-medium tracking-tight">{project.title}</h3>
                <p className="label-mono mt-1 text-foreground">{t(project.discipline, locale)}</p>
                <p className="mt-2 max-w-[48ch] text-sm leading-relaxed text-muted-foreground">
                  {t(project.description, locale)}
                </p>
              </div>
              {project.year ? (
                <span className="shrink-0 font-mono text-xs tabular-nums text-muted-foreground">
                  {project.year}
                </span>
              ) : null}
            </div>
            </Link>
          </m.article>
        ))}
      </div>
    </section>
  );
}
