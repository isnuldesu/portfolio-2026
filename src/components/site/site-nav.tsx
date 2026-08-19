"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { useLocale } from "@/components/site/locale-provider";
import { LocaleSwitcher } from "@/components/site/locale-switcher";
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
      <div id="nav-sentinel" className="absolute top-0 h-px w-full" />
      <header
        className={cn(
          "sticky top-0 z-50 mx-auto h-16 w-full max-w-[82rem] transition-all duration-300",
          scrolled ? "pill-glass" : "sheet",
        )}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-5 px-6">
          <Link
            href={`/${locale}`}
            className="font-display text-base font-bold tracking-tight text-foreground outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            {person.name}
          </Link>

          <nav className="hidden items-center gap-6 lg:flex">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:text-foreground"
              >
                {t(item.label, locale)}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <LocaleSwitcher />
            <ThemeToggle label={t(ui.nav.themeToggle, locale)} />
            <Button
              asChild
              className="hidden h-10 px-5 text-sm font-medium sm:inline-flex"
            >
              <a href={primaryCta.href}>
              <StableLabel value={primaryCta.label} />
            </a>
            </Button>
          </div>
        </div>
      </header>
    </>
  );
}
