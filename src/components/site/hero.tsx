"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { m, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";

import { useLocale } from "@/components/site/locale-provider";
import { Button } from "@/components/ui/button";
import { availability, hero, person, primaryCta } from "@/content/site";
import { ui } from "@/content/ui";
import { t } from "@/lib/i18n";

// The 3D layer never blocks first paint: three and fiber load after hydration
// and only on viewports wide enough to be worth the GPU work.
const HeroScene = dynamic(() => import("@/components/site/hero-scene"), {
  ssr: false,
  loading: () => null,
});

export function Hero() {
  const locale = useLocale();
  const reduceMotion = useReducedMotion();
  const rise = (delay: number) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 22 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as const },
        };

  return (
    <section id="top" className="px-3 pt-3 sm:px-4 sm:pt-4">
      <div className="surface relative overflow-hidden rounded-[28px] sm:rounded-[36px]">
        {/* A wash, not a field. The CV keeps colour to small marks, so this
            stays faint enough that the page still reads as paper. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[62%] opacity-70"
          style={{
            background:
              "radial-gradient(120% 100% at 50% 112%, var(--blush) 0%, color-mix(in oklab, var(--sage) 45%, transparent) 42%, transparent 74%)",
          }}
        />

        {!reduceMotion ? (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-[-22%] hidden h-[72%] opacity-40 blur-[46px] md:block"
          >
            <HeroScene />
          </div>
        ) : null}

        <div className="relative mx-auto flex min-h-[84vh] max-w-6xl flex-col px-6 pb-10 pt-24 sm:pt-28">
          <div className="text-center">
            <m.p {...rise(0.02)} className="label-mono text-muted-foreground">
              {t(ui.hero.eyebrow, locale)}
            </m.p>

            <m.h1
              {...rise(0.08)}
              className="font-display mt-6 text-[3rem] font-semibold leading-[0.92] text-foreground sm:text-7xl lg:text-[7rem]"
            >
              {person.shortName}
            </m.h1>

            <m.div {...rise(0.14)} className="mt-5 space-y-1">
              <p className="font-display text-lg font-medium tracking-tight text-foreground sm:text-2xl">
                {person.role}
              </p>
              <p className="text-base text-muted-foreground sm:text-lg">
                {person.secondaryRole}
              </p>
            </m.div>
          </div>

          <m.div
            {...(reduceMotion
              ? {}
              : {
                  initial: { opacity: 0, scale: 0.94 },
                  animate: { opacity: 1, scale: 1 },
                  transition: { duration: 0.9, delay: 0.18, ease: [0.16, 1, 0.3, 1] as const },
                })}
            className="relative z-10 mx-auto mt-8"
          >
            <Image
              src={person.portrait}
              alt={`Portrait of ${person.name}`}
              width={1400}
              height={1400}
              priority
              sizes="(max-width: 640px) 160px, (max-width: 1024px) 208px, 240px"
              className="size-40 rounded-full border-4 border-card object-cover sm:size-52 lg:size-60"
            />
          </m.div>

          <div className="relative z-10 mt-auto grid gap-8 pt-10 lg:grid-cols-[auto_1fr_auto] lg:items-end">
            <m.div {...rise(0.3)} className="flex justify-center lg:justify-start">
              <span className="pill-glass inline-flex items-center gap-2.5 rounded-full px-4 py-2.5 text-sm text-foreground/80">
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
            </m.div>

            <div className="hidden lg:block" />

            <m.div {...rise(0.36)} className="flex flex-col items-center gap-5 lg:items-end">
              <p className="max-w-[34ch] text-center text-sm leading-relaxed text-muted-foreground lg:text-right">
                {t(hero.subtext, locale)}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Button asChild className="h-12 gap-2 rounded-full px-7 text-sm font-medium">
                  <a href={primaryCta.href}>
                    <ArrowRight className="size-4" strokeWidth={2} />
                    {t(primaryCta.label, locale)}
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="h-12 rounded-full border-border bg-card px-7 text-sm font-medium"
                >
                  <a href={hero.secondaryCta.href}>{t(hero.secondaryCta.label, locale)}</a>
                </Button>
              </div>
            </m.div>
          </div>
        </div>
      </div>
    </section>
  );
}
