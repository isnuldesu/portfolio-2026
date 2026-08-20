"use client";

import Image from "next/image";
import Link from "next/link";
import { m, useReducedMotion } from "motion/react";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

import { useLocale } from "@/components/site/locale-provider";
import { Button } from "@/components/ui/button";
import { StableLabel } from "@/components/ui/stable-label";
import {
  availability,
  disciplines,
  hero,
  person,
  primaryCta,
  statement,
  whatsappCta,
} from "@/content/site";
import { BrandIcon } from "@/components/ui/brand-icon";
import { ui } from "@/content/ui";
import { t } from "@/lib/i18n";

const contacts = [
  { label: "@_isnul", href: "https://instagram.com/_isnul" },
  { label: person.email, href: `mailto:${person.email}` },
  { label: "linkedin.com/in/isnul", href: "https://www.linkedin.com/in/isnul/" },
  { label: `+${person.whatsapp}`, href: `https://wa.me/${person.whatsapp}` },
];

/** The CV sets white on coral and ink on the lighter two. */
const statementBlocks = [
  { bg: "var(--teal)", ink: "#2d2d2c" },
  { bg: "var(--sand)", ink: "#2d2d2c" },
  { bg: "var(--coral-block)", ink: "#ffffff" },
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
    <section id="top" className="">
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
            style={{ background: "#546f4c" }}
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

          <div className="-ml-0.5 flex min-w-0 flex-col items-stretch">
            <m.h1
              {...rise(0.06)}
              className="font-display flex items-center border-2 border-border px-3 py-4 text-[1.5rem] font-bold leading-none text-white sm:px-6 sm:py-6 sm:text-[2.25rem] lg:px-10 lg:py-[2.3rem] lg:text-[3.5rem]"
              style={{ background: "var(--coral-block)" }}
            >
              {person.shortName}
            </m.h1>

            <m.p
              {...rise(0.12)}
              className="font-display -mt-0.5 flex items-center border-2 border-border px-3 py-2 text-[0.8rem] font-medium leading-none sm:px-6 sm:py-3 sm:text-base lg:px-10 lg:py-[0.95rem] lg:text-[1.5rem]"
              style={{ background: "var(--sand)", color: "#2d2d2c" }}
            >
              {person.role}
            </m.p>

            <m.p
              {...rise(0.18)}
              className="font-display -mt-0.5 flex items-center border-2 border-border px-3 py-2 text-[0.8rem] leading-none text-foreground sm:px-6 sm:py-3 sm:text-base lg:px-10 lg:py-[0.85rem] lg:text-[1.35rem]"
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

      {/* One introduction, not two: the proposition that had its own section
          now follows the nameplate directly. */}
      <m.h2
        {...rise(0.28)}
        className="font-display mt-12 space-y-2 border-t-2 border-border pt-10 text-xl font-medium leading-[1.3] sm:text-2xl md:text-[2rem]"
      >
        {statement.leadLines[locale].map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
        {statement.blockRows[locale].map((row, rowIndex) => (
          <span key={row.join()} className="flex flex-wrap items-center gap-2">
            {row.map((part, partIndex) => {
              const block = statementBlocks[rowIndex * 2 + partIndex];
              return (
                <span
                  key={part}
                  className="border-2 border-border px-2 py-0.5"
                  style={{ background: block.bg, color: block.ink }}
                >
                  {part}
                </span>
              );
            })}
          </span>
        ))}
      </m.h2>

      {/* Three doors: a recruiter, a client, and a designer all land here. */}
      <m.nav
        {...rise(0.3)}
        aria-label={t(ui.doors.work, locale)}
        className="mt-10 grid border-t-2 border-border sm:grid-cols-3"
      >
        {[
          { href: `/${locale}/work`, label: ui.doors.work, note: ui.doors.workNote, rule: "var(--coral-block)" },
          { href: `/${locale}/experience`, label: ui.doors.experience, note: ui.doors.experienceNote, rule: "var(--teal)" },
          { href: `/${locale}#contact`, label: ui.doors.hire, note: ui.doors.hireNote, rule: "var(--sand)" },
        ].map((door) => (
          <Link
            key={door.href}
            href={door.href}
            className="rule-left group border-b-2 border-border outline-none focus-visible:ring-3 focus-visible:ring-ring/50 sm:not-last:border-r-2"
            style={{ "--rule": door.rule } as React.CSSProperties}
          >
            <span className="font-display flex items-center gap-2 text-base font-medium tracking-tight group-hover:underline">
              {t(door.label, locale)}
              <ArrowRight className="size-4" />
            </span>
            <span className="mt-1.5 block text-sm text-muted-foreground">
              {t(door.note, locale)}
            </span>
          </Link>
        ))}
      </m.nav>

      <m.ul
        {...rise(0.34)}
        className="mt-10 grid border-t-2 border-border sm:grid-cols-2 lg:grid-cols-3"
      >
        {disciplines.map((label, index) => (
          <li
            key={t(label, "en")}
            className="flex items-center gap-2.5 border-b-2 border-border py-3 pr-4 text-sm text-foreground"
          >
            <span
              aria-hidden="true"
              className="size-2.5"
              style={{ background: statementBlocks[index % statementBlocks.length].bg }}
            />
            {t(label, locale)}
          </li>
        ))}
      </m.ul>

      <m.div
        {...rise(0.38)}
        className="mt-12 flex flex-col gap-6 border-t-2 border-border pt-8 md:flex-row md:items-end md:justify-between"
      >
        <div>
          <span className="inline-flex items-center gap-2.5 text-sm text-foreground">
            <span className="relative flex size-2.5">
              {!reduceMotion ? (
                <span
                  className="absolute inline-flex size-full animate-ping rounded-full opacity-70"
                  style={{ background: "#546f4c" }}
                />
              ) : null}
              <span
                className="relative inline-flex size-2.5 rounded-full"
                style={{ background: "#546f4c" }}
              />
            </span>
            {t(availability.label, locale)}
          </span>
          <p className="mt-3 max-w-[46ch] text-sm leading-relaxed text-muted-foreground">
            {t(hero.subtext, locale)}
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button
            asChild
            variant="outline"
            className="h-11 gap-2 border-border px-6 text-sm font-medium"
          >
            <a
              href={t(whatsappCta.href, locale)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <BrandIcon name="siWhatsapp" />
              <StableLabel value={whatsappCta.label} />
            </a>
          </Button>

          <Button
            asChild
            variant="outline"
            className="h-11 gap-2 border-border px-6 text-sm font-medium"
          >
            <a href="/muhammad-isnul-cv-2026.pdf" download>
              <StableLabel value={ui.cv.download} />
            </a>
          </Button>

          <Button asChild className="h-11 gap-2 px-6 text-sm font-medium">
            <a href={primaryCta.href}>
              <ArrowRight className="size-4" />
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
