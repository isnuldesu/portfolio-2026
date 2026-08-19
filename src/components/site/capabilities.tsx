"use client";

import { motion, useReducedMotion } from "framer-motion";

import { capabilities } from "@/content/site";
import { cn } from "@/lib/utils";

/** 4 items, 6 grid slots, filled 2+1 then 1+2. No empty cells by construction. */
const spans = [
  "md:col-span-2",
  "md:col-span-1",
  "md:col-span-1",
  "md:col-span-2",
] as const;

export function Capabilities() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="capabilities" className="mx-auto max-w-6xl px-6 py-24 md:py-32">
      <h2 className="max-w-[22ch] text-3xl font-semibold tracking-tight text-balance md:text-4xl">
        What you actually get when you hire one engineer instead of an agency.
      </h2>

      <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
        {capabilities.map((item, index) => (
          <motion.article
            key={item.title}
            {...(reduceMotion
              ? {}
              : {
                  initial: { opacity: 0, y: 24 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true, amount: 0.25 },
                  transition: {
                    duration: 0.55,
                    delay: index * 0.06,
                    ease: [0.16, 1, 0.3, 1] as const,
                  },
                })}
            className={cn(
              "group relative flex min-h-[15rem] flex-col justify-end overflow-hidden rounded-2xl border border-border/60 p-6 transition-colors hover:border-primary/35",
              item.image ? "bg-secondary/30" : "bg-secondary/20",
              spans[index % spans.length],
            )}
          >
            {item.image ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt=""
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover opacity-25 transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/85 to-background/30" />
              </>
            ) : null}

            <div className="relative">
              <h3 className="text-lg font-medium tracking-tight">{item.title}</h3>
              <p className="mt-2 max-w-[46ch] text-sm leading-relaxed text-muted-foreground">
                {item.body}
              </p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
