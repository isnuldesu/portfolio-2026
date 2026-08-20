"use client";

import { m, useReducedMotion } from "motion/react";

import { useLocale } from "@/components/site/locale-provider";
import { PageSheet } from "@/components/site/page-sheet";
import { testimonials } from "@/content/testimonials";
import { ui } from "@/content/ui";
import { accentAt } from "@/lib/accents";
import { t } from "@/lib/i18n";

export function Testimonials() {
  const locale = useLocale();
  const reduceMotion = useReducedMotion();

  if (!testimonials.length) return null;

  return (
    <PageSheet>
      <section>
      <p className="label-mono text-muted-foreground">{t(ui.testimonials.eyebrow, locale)}</p>
      <h2 className="font-display mt-3 max-w-[24ch] text-3xl font-medium tracking-tight md:text-5xl">
        {t(ui.testimonials.heading, locale)}
      </h2>

      <ul className="mt-12 grid border-t-2 border-border sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((item, index) => (
          <m.li
            key={item.name + item.company}
            {...(reduceMotion
              ? {}
              : {
                  initial: { opacity: 0, y: 18 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true, amount: 0.3 },
                  transition: {
                    duration: 0.5,
                    delay: Math.min(index, 3) * 0.06,
                    ease: [0.16, 1, 0.3, 1] as const,
                  },
                })}
            className="rule-left border-b-2 border-border lg:not-last:border-r-2"
            style={{ "--rule": accentAt(index) } as React.CSSProperties}
          >
            <p className="text-base leading-relaxed text-foreground">
              {t(item.quote, locale)}
            </p>
            <p className="mt-5 text-sm font-medium">{item.name}</p>
            <p className="text-sm text-muted-foreground">
              {t(item.role, locale)}, {item.company}
            </p>
          </m.li>
        ))}
      </ul>
      </section>
    </PageSheet>
  );
}
