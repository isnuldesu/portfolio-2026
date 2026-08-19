"use client";

import Image from "next/image";
import Link from "next/link";
import { m, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

import { useLocale } from "@/components/site/locale-provider";
import { projects as defaultProjects, type Project } from "@/content/site";
import { ui } from "@/content/ui";
import { t } from "@/lib/i18n";

/**
 * Selected work as a two-up card grid. The screenshot carries the weight, the
 * caption underneath names the project and the disciplines it covered.
 */
export function ProjectShowcase({ items = defaultProjects }: { items?: Project[] }) {
  const locale = useLocale();
  const reduceMotion = useReducedMotion();

  return (
    <section id="work" className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <p className="label-mono text-muted-foreground">
        {t(ui.work.eyebrow, locale)}
      </p>
      <h2 className="font-display mt-3 max-w-[24ch] text-3xl font-medium tracking-tight md:text-5xl">
        {t(ui.work.heading, locale)}
      </h2>

      <div className="mt-14 grid gap-6 sm:grid-cols-2">
        {items.map((project, index) => {
          return (
            <m.article
              key={project.title}
              {...(reduceMotion
                ? {}
                : {
                    initial: { opacity: 0, y: 32 },
                    whileInView: { opacity: 1, y: 0 },
                    viewport: { once: true, amount: 0.2 },
                    transition: {
                      duration: 0.6,
                      delay: (index % 2) * 0.08,
                      ease: [0.16, 1, 0.3, 1] as const,
                    },
                  })}
              className="group"
            >
              <Link
                href={`/${locale}/work/${project.slug}`}
                className="block rounded-none outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                <div className="relative overflow-hidden">
                  <div className="relative aspect-[4/3] overflow-hidden border border-border">
                    <Image
                      src={project.image}
                      alt={`${project.title} title card`}
                      fill
                      priority={index < 2}
                      sizes="(max-width: 640px) 100vw, (max-width: 1152px) 50vw, 564px"
                      quality={90}
                      className="object-contain transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                    />
                  </div>

                  <span className="pill-glass absolute right-4 top-4 flex size-10 items-center justify-center rounded-none opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <ArrowUpRight className="size-4" />
                  </span>
                </div>

                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 px-1">
                  <div>
                    <h3 className="text-base font-medium tracking-tight">
                      {project.title}
                    </h3>
                    <p className="mt-1 max-w-[46ch] text-sm leading-relaxed text-muted-foreground">
                      {t(project.description, locale)}
                    </p>
                  </div>

                  <ul className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-none border border-border bg-card px-2.5 py-1 text-[11px] font-medium text-foreground/65"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>

                <p className="mt-2 px-1 font-mono text-xs text-muted-foreground">
                  {project.year}
                  {project.linkLabel ? ` · ${project.linkLabel}` : ""}
                  {` · ${t(ui.work.readMore, locale)}`}
                </p>
              </Link>
            </m.article>
          );
        })}
      </div>
    </section>
  );
}
