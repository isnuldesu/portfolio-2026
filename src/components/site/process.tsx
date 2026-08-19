"use client";

import { m, useReducedMotion } from "motion/react";

import { processSteps } from "@/content/site";

/** Cards fan out like a loose stack of paper. Middle card sits forward. */
const tilts = ["lg:-rotate-[3deg]", "lg:rotate-[1deg] lg:-translate-y-8", "lg:rotate-[4deg]"];

export function Process() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <p className="font-serif-display text-center text-base text-foreground/50">
        / How the work runs
      </p>
      <h2 className="font-display mt-3 text-center text-3xl font-medium tracking-tight md:text-5xl">
        Here is how it works
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
                  whileHover: { y: -8, rotate: 0 },
                })}
            className={`surface rounded-3xl p-7 transition-shadow hover:shadow-[0_24px_60px_rgba(23,24,28,0.12)] ${tilts[index]}`}
          >
            <p
              className="font-display text-5xl font-medium leading-none"
              style={{ color: "var(--lime-ink)" }}
            >
              {step.number}
            </p>
            <h3 className="mt-8 text-xl font-medium tracking-tight">{step.title}</h3>
            <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
              {step.body}
            </p>
          </m.article>
        ))}
      </div>
    </section>
  );
}
