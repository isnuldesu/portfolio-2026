"use client";

import Link from "next/link";
import { m, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

import { useLocale } from "@/components/site/locale-provider";
import { education, featuredRoles, toolkit } from "@/content/experience";
import { ui } from "@/content/ui";
import { t } from "@/lib/i18n";
import { accentAt } from "@/lib/accents";
import { RoleEntry } from "@/components/site/role-entry";

/**
 * A ledger rather than a timeline: period on the left, the job on the right,
 * hairlines between. It reads the way the CV reads, and it does not repeat the
 * project grids further up the page.
 */
export function Experience() {
  const locale = useLocale();
  const reduceMotion = useReducedMotion();

  return (
    <section id="experience" className="">
      <p className="label-mono text-muted-foreground">
        {t(ui.experience.eyebrow, locale)}
      </p>
      <h2 className="font-display mt-3 max-w-[24ch] text-3xl font-medium tracking-tight md:text-5xl">
        {t(ui.experience.heading, locale)}
      </h2>

      <ol className="mt-14">
        {featuredRoles.map((role, index) => (
          <m.li
            key={role.slug}
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
            className={index > 0 ? "border-t-2 border-border" : ""}
          >
            <RoleEntry role={role} accent={accentAt(index)} />
          </m.li>
        ))}
      </ol>

      <p className="mt-8 border-t-2 border-border pt-6">
        <Link
          href={`/${locale}/experience`}
          className="label-mono inline-flex items-center gap-2 text-foreground underline-offset-4 outline-none hover:underline focus-visible:underline"
        >
          {t(ui.experience.seeAll, locale)}
          <ArrowUpRight className="size-4" />
        </Link>
      </p>

      <div className="mt-6 grid md:grid-cols-3">
        <div
          className="rule-left md:-mr-0.5"
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
          className="rule-left -mt-0.5 md:mt-0 md:-mr-0.5"
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
          className="rule-left -mt-0.5 md:mt-0"
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
