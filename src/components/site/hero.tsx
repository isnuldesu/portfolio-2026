"use client";

import dynamic from "next/dynamic";
import { m, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { availability, hero, person, primaryCta } from "@/content/site";

// The 3D layer never blocks first paint: three and fiber load after hydration
// and only on viewports wide enough to be worth the GPU work.
const HeroScene = dynamic(() => import("@/components/site/hero-scene"), {
  ssr: false,
  loading: () => null,
});

export function Hero() {
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
        {/* Lime ground: strongest at the base, gone by the headline. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[78%]"
          style={{
            background:
              "radial-gradient(130% 100% at 50% 108%, var(--lime) 0%, var(--lime-soft) 44%, transparent 76%)",
          }}
        />

        {!reduceMotion ? (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-[-20%] hidden h-[86%] opacity-60 blur-[34px] md:block"
          >
            <HeroScene />
          </div>
        ) : null}

        <div className="relative mx-auto flex min-h-[86vh] max-w-6xl flex-col px-6 pb-10 pt-24 sm:pt-28">
          <div className="text-center">
            <m.p
              {...rise(0.02)}
              className="font-mono text-[11px] uppercase tracking-[0.24em] text-foreground/50"
            >
              Portfolio 2026
            </m.p>

            <m.h1
              {...rise(0.08)}
              className="font-display mt-6 text-[2.6rem] font-medium leading-[0.95] text-foreground sm:text-6xl lg:text-[5.2rem]"
            >
              Hi, I&rsquo;m {person.name.split(" ")[1]}
              <span className="font-serif-display mt-1 block pb-4 text-[2.9rem] font-normal leading-[1.08] sm:text-[4.4rem] lg:text-[6rem]">
                {person.role}
              </span>
            </m.h1>
          </div>

          <m.div
            {...(reduceMotion
              ? {}
              : {
                  initial: { opacity: 0, scale: 0.94 },
                  animate: { opacity: 1, scale: 1 },
                  transition: { duration: 0.9, delay: 0.16, ease: [0.16, 1, 0.3, 1] as const },
                })}
            className="relative z-10 mx-auto mt-2"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={person.portrait}
              alt={`Portrait of ${person.name}`}
              width={460}
              height={460}
              fetchPriority="high"
              className="size-40 rounded-full border-4 border-white object-cover shadow-[0_24px_60px_rgba(23,24,28,0.22)] sm:size-52 lg:size-60"
            />
          </m.div>

          <div className="relative z-10 mt-auto grid gap-8 pt-10 lg:grid-cols-[auto_1fr_auto] lg:items-end">
            <m.div {...rise(0.3)} className="flex justify-center lg:justify-start">
              <span className="pill-glass inline-flex items-center gap-2.5 rounded-full px-4 py-2.5 text-sm text-foreground/80">
                <span className="relative flex size-2.5">
                  {!reduceMotion ? (
                    <span
                      className="absolute inline-flex size-full animate-ping rounded-full opacity-70"
                      style={{ background: "var(--lime-ink)" }}
                    />
                  ) : null}
                  <span
                    className="relative inline-flex size-2.5 rounded-full"
                    style={{ background: "var(--lime-ink)" }}
                  />
                </span>
                {availability.label}
              </span>
            </m.div>

            <div className="hidden lg:block" />

            <m.div
              {...rise(0.36)}
              className="flex flex-col items-center gap-5 lg:items-end"
            >
              <p className="max-w-[34ch] text-center text-sm leading-relaxed text-foreground/70 lg:text-right">
                {hero.subtext}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Button
                  asChild
                  className="h-12 gap-2 rounded-full px-7 text-sm font-medium"
                >
                  <a href={primaryCta.href}>
                    <ArrowRight className="size-4" strokeWidth={2} />
                    {primaryCta.label}
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="h-12 rounded-full border-foreground/15 bg-white/70 px-7 text-sm font-medium backdrop-blur"
                >
                  <a href={hero.secondaryCta.href}>{hero.secondaryCta.label}</a>
                </Button>
              </div>
            </m.div>
          </div>
        </div>
      </div>
    </section>
  );
}
