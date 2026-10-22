"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowDown } from "@phosphor-icons/react/dist/ssr";

import { useLocale } from "@/components/site/locale-provider";
import { LocaleSwitcher } from "@/components/site/locale-switcher";
import { MiMark } from "@/components/site/mi-logo";
import { MobileMenu } from "@/components/site/mobile-menu";
import { SoundToggle } from "@/components/site/sound-toggle";
import { ThemeToggle } from "@/components/site/theme-toggle";
import { Button } from "@/components/ui/button";
import { StableLabel } from "@/components/ui/stable-label";
import { nav, person, primaryCta } from "@/content/site";
import { ui } from "@/content/ui";
import { t } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function SiteNav() {
  const locale = useLocale();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const sentinel = document.getElementById("nav-sentinel");
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div id="nav-sentinel" className="absolute inset-x-0 top-0 h-px" />
      <header
        className={cn(
          "sticky top-0 z-50 h-16 w-full border-b border-border transition-colors duration-300",
          scrolled
            ? "bg-[color-mix(in_oklab,var(--sheet)_88%,transparent)] backdrop-blur-md"
            : "bg-[var(--sheet)]",
        )}
      >
        <div className="mx-auto flex h-16 w-full max-w-[90rem] items-center justify-between gap-5 px-5 sm:px-8">
          <Link
            href={`/${locale}`}
            className="group/logo flex shrink-0 items-center gap-2.5 whitespace-nowrap font-display text-base font-bold tracking-tight text-foreground outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <MiMark className="w-11 text-[var(--coral)] transition-transform duration-500 group-hover/logo:-rotate-6 group-hover/logo:scale-105" />
            <span>{person.name}</span>
          </Link>

          <nav className="hidden items-center gap-1 xl:flex">
            {nav.map((item) => (
              <a
                key={item.href}
                href={`/${locale}${item.href}`}
                className="press inline-flex h-9 items-center rounded-full px-3 text-sm font-medium text-foreground/70 outline-none transition-colors hover:bg-muted hover:text-foreground focus-visible:bg-muted focus-visible:text-foreground"
              >
                {t(item.label, locale)}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <SoundToggle
              label={t(ui.nav.audio, locale)}
              on={t(ui.nav.audioOn, locale)}
              off={t(ui.nav.audioOff, locale)}
              className="hidden xl:inline-flex"
            />
            {/* Below sm these two move into the menu sheet. */}
            <div className="hidden items-center gap-2 sm:flex">
              <LocaleSwitcher />
              <ThemeToggle label={t(ui.nav.themeToggle, locale)} />
            </div>
            <a
              href={`/downloads/muhammad-isnul-resume-2026-${locale}.pdf`}
              download
              className="press hidden h-10 items-center gap-1.5 rounded-full bg-muted px-4 text-sm font-medium outline-none transition-colors hover:bg-primary hover:text-primary-foreground focus-visible:ring-3 focus-visible:ring-ring xl:inline-flex"
            >
              {t(ui.reach.resume, locale)}
              <ArrowDown className="size-4" />
            </a>
            <Button asChild variant="sq-primary" size="sq-sm" className="hidden sm:inline-flex">
              <a href={`/${locale}${primaryCta.href}`}>
                <StableLabel value={primaryCta.label} />
              </a>
            </Button>
            <MobileMenu />
          </div>
        </div>
      </header>
    </>
  );
}
