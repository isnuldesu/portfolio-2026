"use client";

import { m, useReducedMotion } from "motion/react";

import { useLocale } from "@/components/site/locale-provider";
import { processSteps } from "@/content/site";
import { ui } from "@/content/ui";
import { t } from "@/lib/i18n";
import { accentAt } from "@/lib/accents";

export function Process() {
  const locale = useLocale();
  const reduceMotion = useReducedMotion();

  return (
    <section className="">
      <p className="label-mono text-muted-foreground">
        {t(ui.process.eyebrow, locale)}
      </p>
      <h2 className="font-display mt-3 max-w-[24ch] text-3xl font-medium tracking-tight md:text-5xl">
        {t(ui.process.heading, locale)}
      </h2>

      <div className="mt-14 grid gap-5 md:grid-cols-3 md:gap-4">
        {processSteps.map((step, index) => (
          <m.article
            key={step.number}
            {...(reduceMotion
              ? {}
              : {
                  initial: { opacity: 0, y: 30 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true, amount: 0.3 },
                  transition: {
                    duration: 0.6,
                    delay: index * 0.1,
                    ease: [0.16, 1, 0.3, 1] as const,
                  },
                })}
            className="rule-left py-2"
            style={{ "--rule": accentAt(index) } as React.CSSProperties}
          >
            <p className="label-mono text-muted-foreground">{step.number}</p>
            <h3 className="font-display mt-3 text-2xl font-medium tracking-tight">
              {t(step.title, locale)}
            </h3>
            <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
              {t(step.body, locale)}
            </p>
          </m.article>
        ))}
      </div>
    </section>
  );
}
