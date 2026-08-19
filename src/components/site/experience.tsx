"use client";

import { m, useReducedMotion } from "motion/react";

import { useLocale } from "@/components/site/locale-provider";
import { education, roles, toolkit } from "@/content/experience";
import { ui } from "@/content/ui";
import { t } from "@/lib/i18n";
import { accentAt } from "@/lib/accents";

/**
 * A ledger rather than a timeline: period on the left, the job on the right,
 * hairlines between. It reads the way the CV reads, and it does not repeat the
 * project grids further up the page.
 */
export function Experience() {
  const locale = useLocale();
  const reduceMotion = useReducedMotion();

  return (
    <section id="experience" className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <p className="label-mono text-muted-foreground">
        {t(ui.experience.eyebrow, locale)}
      </p>
      <h2 className="font-display mt-3 max-w-[24ch] text-3xl font-medium tracking-tight md:text-5xl">
        {t(ui.experience.heading, locale)}
      </h2>

      <ol className="mx-auto mt-14 max-w-4xl space-y-6">
        {roles.map((role, index) => (
          <m.li
            key={`${role.company}-${role.period}`}
            {...(reduceMotion
              ? {}
              : {
                  initial: { opacity: 0, y: 18 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true, amount: 0.3 },
                  transition: {
                    duration: 0.5,
                    delay: Math.min(index, 3) * 0.05,
                    ease: [0.16, 1, 0.3, 1] as const,
                  },
                })}
            className="rule-left grid gap-4 py-8 md:grid-cols-[12rem_minmax(0,1fr)] md:gap-10"
            style={{ "--rule": accentAt(index) } as React.CSSProperties}
          >
            <div>
              <p className="label-mono text-foreground">{role.period}</p>
              <p className="mt-2 text-sm text-muted-foreground">
                {t(role.arrangement, locale)}
              </p>
              <p className="text-sm text-muted-foreground">{t(role.location, locale)}</p>
            </div>

            <div>
              <h3 className="font-display text-xl font-medium tracking-tight">
                {role.title}
              </h3>
              <p className="mt-1 text-sm font-medium" style={{ color: accentAt(index) }}>
                {role.company}
              </p>
              <ul className="mt-4 space-y-2">
                {role.points.map((point) => (
                  <li
                    key={t(point, "en")}
                    className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                  >
                    <span aria-hidden="true" className="mt-2 shrink-0 text-muted-foreground">
                      &bull;
                    </span>
                    {t(point, locale)}
                  </li>
                ))}
              </ul>
            </div>
          </m.li>
        ))}
      </ol>

      <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-3">
        <div
          className="rule-left"
          style={{ "--rule": accentAt(1) } as React.CSSProperties}
        >
          <p className="label-mono text-muted-foreground">
            {t(ui.experience.software, locale)}
          </p>
          <ul className="mt-3 space-y-1.5 text-sm text-foreground/80">
            {toolkit.software.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div
          className="rule-left"
          style={{ "--rule": accentAt(0) } as React.CSSProperties}
        >
          <p className="label-mono text-muted-foreground">
            {t(ui.experience.expertise, locale)}
          </p>
          <ul className="mt-3 space-y-1.5 text-sm text-foreground/80">
            {toolkit.expertise.map((item) => (
              <li key={t(item, "en")}>{t(item, locale)}</li>
            ))}
          </ul>
        </div>

        <div
          className="rule-left"
          style={{ "--rule": accentAt(3) } as React.CSSProperties}
        >
          <p className="label-mono text-muted-foreground">
            {t(ui.experience.education, locale)}
          </p>
          <p className="mt-3 text-sm text-foreground/80">
            {t(education.programme, locale)}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">{education.school}</p>
          <p className="mt-1 font-mono text-xs text-muted-foreground">
            {education.graduated}
          </p>
        </div>
      </div>
    </section>
  );
}
