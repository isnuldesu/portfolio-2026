"use client";

import { m, useReducedMotion, type Variants } from "motion/react";
import Image from "next/image";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StableLabel } from "@/components/ui/stable-label";
import { BrandIcon } from "@/components/ui/brand-icon";
import { useLocale } from "@/components/site/locale-provider";
import {
  highlights as defaultHighlights,
  socialLinks as defaultSocials,
  person,
  primaryCta,
  type Highlight,
  type SocialLink,
} from "@/content/site";
import { ui } from "@/content/ui";
import { t } from "@/lib/i18n";
import { accentAt } from "@/lib/accents";

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
  const locale = useLocale();
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
    <section id="about" className="relative">
      <div>
        <m.div
          {...(reduceMotion
            ? { initial: false as const }
            : {
                initial: { opacity: 0, y: 40 },
                whileInView: { opacity: 1, y: 0 },
                viewport: { once: true, amount: 0.25 },
                transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
              })}
          className="relative overflow-hidden"
        >
          <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(90% 70% at 100% 0%, var(--blush) 0%, transparent 60%)" }} />

          <div className="relative grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            {/* Left column */}
            <div className="space-y-8">
              <Badge
                variant="outline"
                className="inline-flex items-center gap-2 rounded-none border-border bg-card px-4 py-1.5 text-xs font-medium text-foreground/70"
              >
                {t(ui.about.badge, locale)}
              </Badge>

              <div className="space-y-4">
                <m.h2
                  {...rise(0.1)}
                  className="font-display text-xl font-medium tracking-tight text-pretty break-words text-foreground sm:text-2xl md:text-3xl"
                >
                  {person.name}
                </m.h2>
                <m.p
                  {...rise(0.18)}
                  className="max-w-[58ch] text-base leading-relaxed text-foreground/70"
                >
                  {t(person.intro, locale)}
                </m.p>
              </div>

              <div className="grid gap-4">
                {highlights.map((item, index) => (
                  <m.div
                    key={t(item.title, "en")}
                    {...(reduceMotion
                      ? { initial: false as const }
                      : {
                          initial: { opacity: 0, y: 20 },
                          whileInView: { opacity: 1, y: 0 },
                          viewport: { once: true },
                          transition: { duration: 0.4, delay: 0.08 * index },
                          whileHover: { y: -4 },
                        })}
                    className="rule-left group relative overflow-hidden py-1"
                    style={{ "--rule": accentAt(index) } as React.CSSProperties}
                  >
                    <div className="relative space-y-2">
                      <p className="label-mono text-foreground">
                        {t(item.title, locale)}
                      </p>
                      <p className="text-sm leading-relaxed text-foreground/70">
                        {t(item.description, locale)}
                      </p>
                    </div>
                  </m.div>
                ))}
              </div>

              <m.div {...rise(0.26)}>
                <Button
                  asChild
                  className="h-12 w-full gap-2 rounded-none px-8 text-sm font-medium sm:w-auto"
                >
                  <a href={primaryCta.href}>
                    <StableLabel value={primaryCta.label} />
                    <ArrowUpRight className="size-4" />
                  </a>
                </Button>
              </m.div>
            </div>

            {/* Right column */}
            <div className="relative">
              <div className="pointer-events-none absolute inset-0 rounded-none blur-3xl" style={{ background: "linear-gradient(180deg, var(--blush), transparent 70%)" }} />
              <div className="relative flex h-full flex-col justify-between border border-border p-6 sm:p-8">
                <div className="flex flex-col items-center text-center">
                  <m.div
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
                    <div className="absolute left-1/2 top-1/2 size-32 -translate-x-1/2 -translate-y-1/2 rounded-none blur-2xl" style={{ background: "var(--coral)" }} />
                    <Image
                      src={person.portrait}
                      alt={`Portrait of ${person.name}`}
                      width={1400}
                      height={1400}
                      sizes="128px"
                      className="relative size-32 rounded-none border-4 border-white object-cover shadow-[0_18px_44px_rgba(23,24,28,0.18)]"
                    />
                  </m.div>

                  <m.div {...rise(0.18)} className="space-y-1.5">
                    <h3 className="font-display text-2xl font-medium tracking-tight text-foreground">
                      {person.name}
                    </h3>
                    <p className="text-xs font-medium text-muted-foreground">
                      {person.role} · {person.secondaryRole}
                    </p>
                  </m.div>

                  <m.p
                    {...rise(0.26)}
                    className="mt-4 max-w-sm text-sm leading-relaxed text-foreground/70"
                  >
                    {t(person.location, locale)}. {t(ui.about.contactLine, locale)}
                  </m.p>
                </div>

                <m.ul
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
                    <m.li
                      key={social.label}
                      variants={reduceMotion ? undefined : itemVariants}
                    >
                      <a
                        href={social.href}
                        target={social.href.startsWith("http") ? "_blank" : undefined}
                        rel="noopener noreferrer"
                        className="group flex items-center justify-between rounded-none border border-border bg-card px-4 py-3 text-left outline-none transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(23,24,28,0.08)] focus-visible:ring-3 focus-visible:ring-ring/50"
                      >
                        <span className="flex items-center gap-3">
                          <span className="flex size-10 items-center justify-center rounded-none border border-border bg-secondary text-foreground/80">
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
                          className="size-4 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
                        />
                      </a>
                    </m.li>
                  ))}
                </m.ul>
              </div>
            </div>
          </div>
        </m.div>
      </div>
    </section>
  );
}
