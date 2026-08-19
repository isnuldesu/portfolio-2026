"use client";

import { m, useReducedMotion } from "motion/react";

import { useLocale } from "@/components/site/locale-provider";
import { disciplines, statement } from "@/content/site";
import { t } from "@/lib/i18n";

/** The CV sets white on coral and ink on the lighter two. Same here. */
const blocks = [
  { bg: "var(--teal)", ink: "#2d2d2c" },
  { bg: "var(--sand)", ink: "#2d2d2c" },
  { bg: "var(--coral-block)", ink: "#ffffff" },
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
        className="font-display mt-6 space-y-2 text-xl font-medium leading-[1.25] sm:text-2xl md:text-[2rem]"
      >
        {statement.leadLines[locale].map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}

        {statement.blockRows[locale].map((row, rowIndex) => (
          <span key={row.join()} className="flex flex-wrap items-center gap-2">
            {row.map((part, partIndex) => {
              const block = blocks[rowIndex * 2 + partIndex];
              return (
                <span
                  key={part}
                  className="border-2 border-border px-2 py-0.5"
                  style={{ background: block.bg, color: block.ink }}
                >
                  {part}
                </span>
              );
            })}
          </span>
        ))}
      </m.h2>

      {/* A ruled strip rather than tags floating off the column. */}
      <ul className="mt-12 flex flex-wrap border-t-2 border-border">
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
            className="flex items-center gap-2.5 border-b-2 border-border px-4 py-3 pl-0 text-sm text-foreground sm:pl-4"
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
