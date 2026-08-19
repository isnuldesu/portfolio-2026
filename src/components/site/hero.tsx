"use client";

import Image from "next/image";
import { m, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";

import { useLocale } from "@/components/site/locale-provider";
import { Button } from "@/components/ui/button";
import { StableLabel } from "@/components/ui/stable-label";
import { availability, hero, person, primaryCta } from "@/content/site";
import { t } from "@/lib/i18n";

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
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as const },
        };

  return (
    <section id="top" className="mx-auto max-w-6xl px-6 pt-10 sm:pt-14">
      {/* Masthead proportions are lifted straight off the reference: a square
          mark, the name knocked out of a coral block, the title on a wider
          sand block, and a 4px gap holding the three together. */}
      {/* Measured off the reference: 2px black rules, blocks flush with no
          vertical gap, each block sized to its own text, and a rule closing
          the masthead on the right with the contacts ranged against it. */}
      <div className="flex flex-col gap-10 lg:flex-row lg:items-stretch lg:justify-between lg:gap-12">
        <div className="flex items-stretch">
          <m.div
            {...rise(0)}
            className="relative aspect-square w-24 shrink-0 overflow-hidden border-2 border-border sm:w-40 lg:w-[13.875rem]"
            style={{ background: "var(--teal)" }}
          >
            <Image
              src={person.portrait}
              alt={`Portrait of ${person.name}`}
              fill
              priority
              sizes="(max-width: 640px) 96px, (max-width: 1024px) 160px, 222px"
              className="object-cover"
            />
          </m.div>

          <div className="-ml-0.5 flex min-w-0 flex-col items-start">
            <m.h1
              {...rise(0.06)}
              className="font-display flex items-center border-2 border-border px-3 py-4 text-[1.5rem] font-bold leading-none text-white sm:px-6 sm:py-6 sm:text-[2.25rem] lg:px-[2.625rem] lg:py-[2.3rem] lg:text-[3.5rem]"
              style={{ background: "var(--coral)" }}
            >
              {person.shortName}
            </m.h1>

            <m.p
              {...rise(0.12)}
              className="font-display -mt-0.5 flex items-center border-2 border-border px-3 py-2 text-[0.8rem] font-medium leading-none sm:px-6 sm:py-3 sm:text-base lg:px-[2.8rem] lg:py-[0.95rem] lg:text-[1.5rem]"
              style={{ background: "var(--sand)", color: "#2d2d2c" }}
            >
              {person.role}
            </m.p>

            <m.p
              {...rise(0.18)}
              className="font-display -mt-0.5 flex items-center border-2 border-border px-3 py-2 text-[0.8rem] leading-none text-foreground sm:px-6 sm:py-3 sm:text-base lg:px-[0.75rem] lg:py-[0.85rem] lg:text-[1.35rem]"
            >
              {person.secondaryRole}
            </m.p>
          </div>
        </div>

        {/* Four flush boxes, right aligned, together exactly as tall as the
            mark square, each hugging its own text. */}
        <m.ul
          {...rise(0.24)}
          className="flex flex-col items-stretch lg:h-[13.875rem] lg:items-end"
        >
          {contacts.map((contact, index) => (
            <li
              key={contact.label}
              className={`flex flex-1 items-center border-2 border-border px-4 py-3 sm:px-5 lg:px-6 ${
                index > 0 ? "-mt-0.5" : ""
              }`}
            >
              <a
                href={contact.href}
                target={contact.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="font-display text-xs text-foreground underline-offset-4 outline-none transition-colors hover:text-muted-foreground hover:underline focus-visible:underline sm:text-sm"
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
          <span className="inline-flex items-center gap-2.5 text-sm text-foreground">
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
          <Button asChild className="h-11 gap-2 px-6 text-sm font-medium">
            <a href={primaryCta.href}>
              <ArrowRight className="size-4" strokeWidth={2} />
              <StableLabel value={primaryCta.label} />
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            className="h-11 border-border px-6 text-sm font-medium"
          >
            <a href={hero.secondaryCta.href}>
              <StableLabel value={hero.secondaryCta.label} />
            </a>
          </Button>
        </div>
      </m.div>
    </section>
  );
}
