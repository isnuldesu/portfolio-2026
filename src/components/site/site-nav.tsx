"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { nav, person, primaryCta } from "@/content/site";
import { cn } from "@/lib/utils";

export function SiteNav() {
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
          "sticky top-0 z-50 h-16 w-full transition-colors duration-300",
          scrolled && "glass-panel rounded-none border-x-0 border-t-0 shadow-none",
        )}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-6">
          <a
            href="#top"
            className="font-mono text-xs uppercase tracking-[0.22em] text-foreground outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            {person.name}
          </a>

          <nav className="hidden items-center gap-7 md:flex">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:text-foreground"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <Button
            asChild
            size="sm"
            className="h-9 rounded-full px-4 text-xs uppercase tracking-[0.16em]"
          >
            <a href={primaryCta.href}>{primaryCta.label}</a>
          </Button>
        </div>
      </header>
    </>
  );
}
