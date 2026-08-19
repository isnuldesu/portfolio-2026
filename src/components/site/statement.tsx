"use client";

import { m, useReducedMotion } from "motion/react";

import { useLocale } from "@/components/site/locale-provider";
import { disciplines, statement } from "@/content/site";
import { t } from "@/lib/i18n";

/** Tag placement, clockwise from top-left. Percentages, so it scales cleanly. */
const positions = [
  "left-0 top-[6%]",
  "left-[3%] top-[38%]",
  "left-0 top-[70%]",
  "right-0 top-[6%]",
  "right-[3%] top-[38%]",
  "right-0 top-[70%]",
];

export function Statement() {
  const locale = useLocale();
  const reduceMotion = useReducedMotion();

  return (
    <section className="mx-auto max-w-6xl px-6 py-24 md:py-32">
      <p className="label-mono text-center text-muted-foreground">
        {t(statement.eyebrow, locale)}
      </p>

      <div className="relative mx-auto mt-8 max-w-3xl">
        {/* Tags float beside the statement on desktop and stack under it on mobile. */}
        <div className="pointer-events-none absolute inset-0 hidden lg:block">
          {disciplines.map((label, index) => (
            <m.span
              key={t(label, "en")}
              {...(reduceMotion
                ? {}
                : {
                    initial: { opacity: 0, y: 12, scale: 0.9 },
                    whileInView: { opacity: 1, y: 0, scale: 1 },
                    viewport: { once: true, amount: 0.4 },
                    transition: {
                      duration: 0.5,
                      delay: 0.06 * index,
                      ease: [0.16, 1, 0.3, 1] as const,
                    },
                  })}
              className={`pill-glass absolute inline-flex items-center gap-2 whitespace-nowrap rounded-full px-3.5 py-2 text-xs font-medium text-foreground/75 ${positions[index]} -mx-[9rem] xl:-mx-[12rem]`}
            >
              <span
                className="size-2 rounded-full"
                style={{ background: "var(--coral)" }}
              />
              {t(label, locale)}
            </m.span>
          ))}
        </div>

        <m.h2
          {...(reduceMotion
            ? {}
            : {
                initial: { opacity: 0, y: 20 },
                whileInView: { opacity: 1, y: 0 },
                viewport: { once: true, amount: 0.4 },
                transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
              })}
          className="font-display text-center text-2xl font-medium leading-snug text-balance sm:text-3xl md:text-[2.6rem] md:leading-[1.2]"
        >
          {t(statement.lead, locale)}{" "}
          <span className="text-foreground/40">{t(statement.tail, locale)}</span>
        </m.h2>

        <ul className="mt-9 flex flex-wrap justify-center gap-2 lg:hidden">
          {disciplines.map((label) => (
            <li
              key={t(label, "en")}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-2 text-xs font-medium text-foreground/75"
            >
              <span
                className="size-2 rounded-full"
                style={{ background: "var(--coral)" }}
              />
              {t(label, locale)}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
