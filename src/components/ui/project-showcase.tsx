"use client";

import Link from "next/link";
import { m, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

import { projects as defaultProjects, type Project } from "@/content/site";

/**
 * Selected work as a two-up card grid. The screenshot carries the weight, the
 * caption underneath names the project and the disciplines it covered.
 */
export function ProjectShowcase({
  items = defaultProjects,
  eyebrow = "/ Selected work",
  heading = "Products people run their day on",
}: {
  items?: Project[];
  eyebrow?: string;
  heading?: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <section id="work" className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <p className="font-serif-display text-center text-base text-foreground/50">
        {eyebrow}
      </p>
      <h2 className="font-display mt-3 text-center text-3xl font-medium tracking-tight md:text-5xl">
        {heading}
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
                href={`/work/${project.slug}`}
                className="block rounded-3xl outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                <div className="surface relative overflow-hidden rounded-3xl">
                  <div className="aspect-[4/3] overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={project.image}
                      alt={`${project.title} interface`}
                      loading={index < 2 ? "eager" : "lazy"}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
                    />
                  </div>

                  <span className="pill-glass absolute right-4 top-4 flex size-10 items-center justify-center rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <ArrowUpRight className="size-4" strokeWidth={2} />
                  </span>
                </div>

                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 px-1">
                  <div>
                    <h3 className="text-base font-medium tracking-tight">
                      {project.title}
                    </h3>
                    <p className="mt-1 max-w-[46ch] text-sm leading-relaxed text-muted-foreground">
                      {project.description}
                    </p>
                  </div>

                  <ul className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full border border-border bg-card px-2.5 py-1 text-[11px] font-medium text-foreground/65"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>

                <p className="mt-2 px-1 font-mono text-xs text-muted-foreground">
                  {project.year}
                  {project.linkLabel ? ` · ${project.linkLabel}` : ""}
                  {" · Read the case study"}
                </p>
              </Link>
            </m.article>
          );
        })}
      </div>
    </section>
  );
}
