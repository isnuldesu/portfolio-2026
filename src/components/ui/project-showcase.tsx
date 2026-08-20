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
    <section id="work" className="">
      <p className="label-mono text-muted-foreground">
        {t(ui.work.eyebrow, locale)}
      </p>
      <h2 className="font-display mt-3 max-w-[24ch] text-3xl font-medium tracking-tight md:text-5xl">
        {t(ui.work.heading, locale)}
      </h2>

      {/* The negative offset lives on the container, so the outer edges stay
          on the section's line and only the shared inner borders collapse. */}
      <div className="mt-12 grid border-t-2 border-border sm:grid-cols-2">
        {items.map((project, index) => (
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
            className="group border-b-2 border-border sm:odd:border-r-2"
          >
            <Link
              href={`/${locale}/work/${project.slug}`}
              className="block outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
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

              <div className="p-6">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-lg font-medium tracking-tight">
                    {project.title}
                  </h3>
                  {project.year ? (
                    <span className="label-mono shrink-0 text-muted-foreground">
                      {project.year}
                    </span>
                  ) : null}
                </div>

                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {t(project.description, locale)}
                </p>

                <p className="label-mono mt-4 text-muted-foreground">
                  {project.tags.join(" / ")}
                </p>

                <p className="mt-5 flex items-center justify-between gap-4">
                  <span className="label-mono text-muted-foreground">
                    {project.linkLabel ?? "\u00a0"}
                  </span>
                  <span className="label-mono inline-flex items-center gap-2 text-foreground">
                    {t(ui.work.readMore, locale)}
                    <ArrowUpRight className="size-4" />
                  </span>
                </p>
              </div>
            </Link>
          </m.article>
        ))}
      </div>
    </section>
  );
}
