"use client";

import { useRef } from "react";
import Link from "next/link";
import { m, useReducedMotion, useScroll, useSpring } from "motion/react";
import { ArrowUpRight } from "lucide-react";

import { useLocale } from "@/components/site/locale-provider";
import { caseStudies } from "@/content/case-studies";
import { ui } from "@/content/ui";
import { t } from "@/lib/i18n";

/** Group projects by the year they started, newest first. */
const groups = Object.entries(
  caseStudies.reduce<Record<string, typeof caseStudies>>((acc, study) => {
    const year = study.year.slice(0, 4);
    (acc[year] ??= []).push(study);
    return acc;
  }, {}),
).sort(([a], [b]) => Number(b) - Number(a));

export function Timeline() {
  const locale = useLocale();
  const reduceMotion = useReducedMotion();
  const railRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ["start 70%", "end 90%"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section id="timeline" className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <p className="font-serif-display text-center text-base text-foreground/50">
        {t(ui.timeline.eyebrow, locale)}
      </p>
      <h2 className="font-display mt-3 text-center text-3xl font-medium tracking-tight md:text-5xl">
        {t(ui.timeline.heading, locale)}
      </h2>

      <div ref={railRef} className="relative mx-auto mt-14 max-w-3xl">
        <span
          aria-hidden="true"
          className="absolute bottom-2 left-[7px] top-2 w-px bg-border"
        />
        <m.span
          aria-hidden="true"
          className="absolute bottom-2 left-[7px] top-2 w-px origin-top"
          style={{
            background: "var(--lime-ink)",
            scaleY: reduceMotion ? 1 : progress,
          }}
        />

        <ol className="space-y-10">
          {groups.map(([year, studies], groupIndex) => (
            <m.li
              key={year}
              {...(reduceMotion
                ? {}
                : {
                    initial: { opacity: 0, y: 20 },
                    whileInView: { opacity: 1, y: 0 },
                    viewport: { once: true, amount: 0.4 },
                    transition: {
                      duration: 0.5,
                      delay: Math.min(groupIndex, 3) * 0.05,
                      ease: [0.16, 1, 0.3, 1] as const,
                    },
                  })}
              className="relative pl-12"
            >
              <span
                aria-hidden="true"
                className="absolute left-0 top-1 flex size-4 items-center justify-center rounded-full border border-border bg-card"
              >
                <span
                  className="size-1.5 rounded-full"
                  style={{ background: "var(--lime-ink)" }}
                />
              </span>

              <p className="font-display text-2xl font-medium leading-none tracking-tight">
                {year}
              </p>

              <ul className="mt-4 space-y-2">
                {studies.map((study) => (
                  <li key={study.slug}>
                    <Link
                      href={`/${locale}/work/${study.slug}`}
                      className="group flex flex-wrap items-baseline gap-x-3 gap-y-1 rounded-xl outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                    >
                      <span className="text-base font-medium text-foreground group-hover:underline">
                        {study.title}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {t(study.discipline, locale)}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {t(study.role, locale)}
                      </span>
                      <ArrowUpRight
                        className="size-3.5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
                        strokeWidth={2}
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </m.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
