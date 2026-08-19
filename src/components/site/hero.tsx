"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { availability, hero, person, primaryCta } from "@/content/site";

export function Hero() {
  const reduceMotion = useReducedMotion();
  const rise = (delay: number) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as const },
        };

  return (
    <section
      id="top"
      className="mx-auto grid min-h-[100dvh] max-w-6xl grid-cols-1 items-center gap-12 px-6 pt-20 pb-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:pt-24"
    >
      <div>
        <motion.h1
          {...rise(0.05)}
          className="text-4xl font-semibold leading-[1.05] tracking-tight text-balance md:text-5xl lg:text-6xl"
        >
          {hero.headline[0]}
          <br />
          <span className="text-muted-foreground">{hero.headline[1]}</span>
        </motion.h1>

        <motion.p
          {...rise(0.16)}
          className="mt-6 max-w-[46ch] text-base leading-relaxed text-foreground/70 md:text-lg"
        >
          {hero.subtext}
        </motion.p>

        <motion.div {...rise(0.26)} className="mt-9 flex flex-wrap items-center gap-3">
          <Button
            asChild
            className="h-12 gap-2 rounded-full px-7 text-xs uppercase tracking-[0.18em]"
          >
            <a href={primaryCta.href}>
              {primaryCta.label}
              <ArrowUpRight className="size-4" strokeWidth={1.75} />
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            className="h-12 rounded-full border-border px-7 text-xs uppercase tracking-[0.18em]"
          >
            <a href={hero.secondaryCta.href}>{hero.secondaryCta.label}</a>
          </Button>
        </motion.div>
      </div>

      <motion.div
        {...(reduceMotion
          ? {}
          : {
              initial: { opacity: 0, scale: 0.97 },
              animate: { opacity: 1, scale: 1 },
              transition: { duration: 0.8, delay: 0.12, ease: [0.16, 1, 0.3, 1] as const },
            })}
        className="relative mx-auto w-full max-w-[26rem] lg:mx-0 lg:ml-auto"
      >
        <div className="glass-panel relative overflow-hidden rounded-3xl p-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={person.portrait}
            alt={`Portrait of ${person.name}`}
            width={460}
            height={460}
            fetchPriority="high"
            className="aspect-square w-full rounded-2xl object-cover"
          />
          <div className="absolute inset-x-2 bottom-2 rounded-2xl bg-gradient-to-t from-background/85 to-transparent p-5 pt-16">
            <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-primary">
              {availability.label}
            </p>
            <p className="mt-1.5 text-sm text-foreground/70">{person.location}</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
