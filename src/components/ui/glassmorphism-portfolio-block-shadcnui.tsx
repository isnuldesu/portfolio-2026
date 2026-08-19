"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BrandIcon } from "@/components/ui/brand-icon";
import {
  highlights as defaultHighlights,
  socialLinks as defaultSocials,
  person,
  primaryCta,
  type Highlight,
  type SocialLink,
} from "@/content/site";

const listVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, staggerChildren: 0.08 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

export function GlassmorphismPortfolioBlock({
  highlights = defaultHighlights,
  socialLinks = defaultSocials,
}: {
  highlights?: Highlight[];
  socialLinks?: SocialLink[];
}) {
  const reduceMotion = useReducedMotion();
  const rise = (delay = 0) =>
    reduceMotion
      ? { initial: false as const }
      : {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.5, delay },
        };

  return (
    <section id="about" className="relative overflow-hidden px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          {...(reduceMotion
            ? { initial: false as const }
            : {
                initial: { opacity: 0, y: 40 },
                whileInView: { opacity: 1, y: 0 },
                viewport: { once: true, amount: 0.25 },
                transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
              })}
          className="glass-panel relative overflow-hidden rounded-3xl p-8 md:p-12"
        >
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-foreground/[0.05] via-transparent to-transparent" />

          <div className="relative grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            {/* Left column */}
            <div className="space-y-8">
              <Badge
                variant="outline"
                className="inline-flex items-center gap-2 rounded-full border-border/60 bg-background/50 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.28em] text-foreground/70 backdrop-blur"
              >
                About
              </Badge>

              <div className="space-y-4">
                <motion.h2
                  {...rise(0.1)}
                  className="text-2xl font-semibold tracking-tight text-balance text-foreground md:text-3xl"
                >
                  {person.name}, {person.role} and {person.secondaryRole}
                </motion.h2>
                <motion.p
                  {...rise(0.18)}
                  className="max-w-[58ch] text-base leading-relaxed text-foreground/70"
                >
                  {person.intro}
                </motion.p>
              </div>

              <div className="grid gap-4">
                {highlights.map((item, index) => (
                  <motion.div
                    key={item.title}
                    {...(reduceMotion
                      ? { initial: false as const }
                      : {
                          initial: { opacity: 0, y: 20 },
                          whileInView: { opacity: 1, y: 0 },
                          viewport: { once: true },
                          transition: { duration: 0.4, delay: 0.08 * index },
                          whileHover: { y: -4 },
                        })}
                    className="group relative overflow-hidden rounded-2xl border border-border/50 bg-background/40 p-5 backdrop-blur transition-colors hover:border-primary/30"
                  >
                    <div className="relative space-y-2">
                      <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-primary/80">
                        {item.title}
                      </p>
                      <p className="text-sm leading-relaxed text-foreground/70">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div {...rise(0.26)}>
                <Button
                  asChild
                  className="h-12 w-full gap-2 rounded-full px-8 text-xs uppercase tracking-[0.2em] sm:w-auto"
                >
                  <a href={primaryCta.href}>
                    {primaryCta.label}
                    <ArrowUpRight className="size-4" strokeWidth={1.75} />
                  </a>
                </Button>
              </motion.div>
            </div>

            {/* Right column */}
            <div className="relative">
              <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-b from-primary/15 via-transparent to-transparent blur-3xl" />
              <div className="glass-panel relative flex h-full flex-col justify-between rounded-3xl p-8">
                <div className="flex flex-col items-center text-center">
                  <motion.div
                    {...(reduceMotion
                      ? { initial: false as const }
                      : {
                          initial: { opacity: 0, scale: 0.9 },
                          whileInView: { opacity: 1, scale: 1 },
                          viewport: { once: true },
                          transition: { duration: 0.5 },
                        })}
                    className="relative mb-6"
                  >
                    <div className="absolute left-1/2 top-1/2 size-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-2xl" />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={person.portrait}
                      alt={`Portrait of ${person.name}`}
                      width={128}
                      height={128}
                      className="relative size-32 rounded-full border border-border/50 object-cover shadow-[0_25px_60px_rgba(0,0,0,0.55)]"
                    />
                  </motion.div>

                  <motion.div {...rise(0.18)} className="space-y-1.5">
                    <h3 className="text-2xl font-semibold tracking-tight text-foreground">
                      {person.name}
                    </h3>
                    <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
                      {person.role} / {person.secondaryRole}
                    </p>
                  </motion.div>

                  <motion.p
                    {...rise(0.26)}
                    className="mt-4 max-w-sm text-sm leading-relaxed text-foreground/70"
                  >
                    {person.location}. Reachable in one message, and I answer with a
                    plan rather than a brochure.
                  </motion.p>
                </div>

                <motion.ul
                  {...(reduceMotion
                    ? { initial: false as const }
                    : {
                        variants: listVariants,
                        initial: "hidden" as const,
                        whileInView: "visible" as const,
                        viewport: { once: true, margin: "-80px" },
                      })}
                  className="mt-8 flex flex-col gap-3"
                >
                  {socialLinks.map((social) => (
                    <motion.li
                      key={social.label}
                      variants={reduceMotion ? undefined : itemVariants}
                    >
                      <a
                        href={social.href}
                        target={social.href.startsWith("http") ? "_blank" : undefined}
                        rel="noopener noreferrer"
                        className="group flex items-center justify-between rounded-2xl border border-border/50 bg-background/50 px-4 py-3 text-left outline-none transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:bg-background/70 focus-visible:ring-3 focus-visible:ring-ring/50"
                      >
                        <span className="flex items-center gap-3">
                          <span className="flex size-10 items-center justify-center rounded-full border border-border/50 bg-background/60 text-foreground/80 transition-colors group-hover:text-primary">
                            <BrandIcon name={social.icon} />
                          </span>
                          <span className="block">
                            <span className="block text-sm font-medium text-foreground">
                              {social.label}
                            </span>
                            <span className="block text-xs text-muted-foreground">
                              {social.handle}
                            </span>
                          </span>
                        </span>
                        <ArrowUpRight
                          strokeWidth={1.5}
                          className="size-4 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
                        />
                      </a>
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
