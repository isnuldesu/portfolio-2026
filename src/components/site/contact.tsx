"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { contact, person, primaryCta } from "@/content/site";

export function Contact() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="contact" className="relative px-6 py-28 md:py-36">
      <motion.div
        {...(reduceMotion
          ? {}
          : {
              initial: { opacity: 0, y: 28 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true, amount: 0.35 },
              transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
            })}
        className="mx-auto max-w-3xl text-center"
      >
        <h2 className="text-3xl font-semibold tracking-tight text-balance md:text-5xl">
          {contact.heading}
        </h2>
        <p className="mx-auto mt-5 max-w-[52ch] text-base leading-relaxed text-foreground/70">
          {contact.body}
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button
            asChild
            className="h-12 w-full gap-2 rounded-full px-8 text-xs uppercase tracking-[0.18em] sm:w-auto"
          >
            <a href={`mailto:${person.email}`}>
              {primaryCta.label}
              <ArrowUpRight className="size-4" strokeWidth={1.75} />
            </a>
          </Button>
          <a
            href={`mailto:${person.email}`}
            className="font-mono text-sm text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
          >
            {person.email}
          </a>
        </div>
      </motion.div>
    </section>
  );
}
