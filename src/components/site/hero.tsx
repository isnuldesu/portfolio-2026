"use client";

import dynamic from "next/dynamic";
import { m, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";

import { useLocale } from "@/components/site/locale-provider";
import { Button } from "@/components/ui/button";
import { availability, hero, person, primaryCta } from "@/content/site";
import { t } from "@/lib/i18n";

// Fills the mark square. Loads after hydration and only where it is visible.
const HeroScene = dynamic(() => import("@/components/site/hero-scene"), {
  ssr: false,
  loading: () => null,
});

const contacts = [
  { label: "@_isnul", href: "https://instagram.com/_isnul" },
  { label: person.email, href: `mailto:${person.email}` },
  { label: "linkedin.com/in/isnul", href: "https://www.linkedin.com/in/isnul/" },
  { label: `+${person.whatsapp}`, href: `https://wa.me/${person.whatsapp}` },
];

export function Hero() {
  const locale = useLocale();
  const reduceMotion = useReducedMotion();
  const rise = (delay: number) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as const },
        };

  return (
    <section id="top" className="mx-auto max-w-6xl px-6 pt-10 sm:pt-14">
      {/* The CV masthead: a colour square, the name knocked out of a coral
          block, the title on a sand block, and the contacts ranged right. */}
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start lg:gap-12">
        <div className="flex gap-5 sm:gap-7">
          <m.div
            {...rise(0)}
            className="relative aspect-square w-20 shrink-0 overflow-hidden sm:w-28 lg:w-32"
            style={{ background: "var(--teal)" }}
          >
            {!reduceMotion ? (
              <div aria-hidden="true" className="absolute inset-0 opacity-90">
                <HeroScene />
              </div>
            ) : null}
          </m.div>

          <div className="min-w-0">
            <m.h1 {...rise(0.06)}>
              <span
                className="font-display inline-block px-3 py-1.5 text-[2rem] font-semibold leading-none tracking-tight text-white sm:px-4 sm:text-[3rem] lg:text-[3.75rem]"
                style={{ background: "var(--coral)" }}
              >
                {person.shortName}
              </span>
            </m.h1>

            <m.p {...rise(0.12)} className="mt-2.5">
              <span
                className="inline-block px-3 py-1 text-base font-medium leading-snug sm:px-4 sm:text-xl"
                style={{ background: "var(--sand)", color: "#2b2b2c" }}
              >
                {person.role}
              </span>
            </m.p>

            <m.p
              {...rise(0.18)}
              className="mt-2.5 px-3 text-base text-foreground/80 sm:px-4 sm:text-lg"
            >
              {person.secondaryRole}
            </m.p>
          </div>
        </div>

        <m.ul {...rise(0.24)} className="space-y-1.5 lg:text-right">
          {contacts.map((contact) => (
            <li key={contact.label}>
              <a
                href={contact.href}
                target={contact.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="font-mono text-xs text-muted-foreground underline-offset-4 outline-none transition-colors hover:text-foreground hover:underline focus-visible:text-foreground sm:text-sm"
              >
                {contact.label}
              </a>
            </li>
          ))}
        </m.ul>
      </div>

      <m.div
        {...rise(0.3)}
        className="mt-12 flex flex-col gap-6 border-t border-border pt-8 md:flex-row md:items-end md:justify-between"
      >
        <div>
          <span className="inline-flex items-center gap-2.5 text-sm text-foreground/80">
            <span className="relative flex size-2.5">
              {!reduceMotion ? (
                <span
                  className="absolute inline-flex size-full animate-ping rounded-full opacity-70"
                  style={{ background: "var(--teal)" }}
                />
              ) : null}
              <span
                className="relative inline-flex size-2.5 rounded-full"
                style={{ background: "var(--teal)" }}
              />
            </span>
            {t(availability.label, locale)}
          </span>
          <p className="mt-3 max-w-[46ch] text-sm leading-relaxed text-muted-foreground">
            {t(hero.subtext, locale)}
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button asChild className="h-11 gap-2 rounded-none px-6 text-sm font-medium">
            <a href={primaryCta.href}>
              <ArrowRight className="size-4" strokeWidth={2} />
              {t(primaryCta.label, locale)}
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            className="h-11 rounded-none border-border px-6 text-sm font-medium"
          >
            <a href={hero.secondaryCta.href}>{t(hero.secondaryCta.label, locale)}</a>
          </Button>
        </div>
      </m.div>
    </section>
  );
}
