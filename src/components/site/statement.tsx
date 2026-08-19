"use client";

import { m, useReducedMotion } from "motion/react";

import { useLocale } from "@/components/site/locale-provider";
import { disciplines, statement } from "@/content/site";
import { t } from "@/lib/i18n";

/** The CV sets white on coral and ink on the lighter two. Same here. */
const blocks = [
  { bg: "var(--teal)", ink: "#2d2d2c" },
  { bg: "var(--sand)", ink: "#2d2d2c" },
  { bg: "var(--coral)", ink: "#ffffff" },
];

export function Statement() {
  const locale = useLocale();
  const reduceMotion = useReducedMotion();

  return (
    <section>
      <p className="label-mono text-muted-foreground">{t(statement.eyebrow, locale)}</p>

      <m.h2
        {...(reduceMotion
          ? {}
          : {
              initial: { opacity: 0, y: 20 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true, amount: 0.4 },
              transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
            })}
        className="font-display mt-6 max-w-[26ch] text-2xl font-medium leading-[1.35] sm:text-3xl md:text-[2.4rem]"
      >
        {t(statement.lead, locale)}{" "}
        {statement.tailParts[locale].map((part, index) => (
          <span
            key={part}
            className="box-decoration-clone border-2 border-border px-2 py-0.5"
            style={{ background: blocks[index].bg, color: blocks[index].ink }}
          >
            {part}
          </span>
        ))}
      </m.h2>

      {/* A ruled strip rather than tags floating off the column. */}
      <ul className="mt-12 flex flex-wrap">
        {disciplines.map((label, index) => (
          <m.li
            key={t(label, "en")}
            {...(reduceMotion
              ? {}
              : {
                  initial: { opacity: 0, y: 10 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true, amount: 0.4 },
                  transition: {
                    duration: 0.4,
                    delay: 0.04 * index,
                    ease: [0.16, 1, 0.3, 1] as const,
                  },
                })}
            className="-ml-0.5 -mt-0.5 flex items-center gap-2.5 border-2 border-border px-4 py-3 text-sm text-foreground"
          >
            <span
              aria-hidden="true"
              className="size-2.5"
              style={{ background: blocks[index % blocks.length].bg }}
            />
            {t(label, locale)}
          </m.li>
        ))}
      </ul>
    </section>
  );
}
