"use client";

import { useLocale } from "@/components/site/locale-provider";
import { BrandIcon } from "@/components/ui/brand-icon";
import { nav, person, socialLinks } from "@/content/site";
import { t } from "@/lib/i18n";

export function SiteFooter() {
  const locale = useLocale();

  return (
    <footer className="px-6 py-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        {/* The header hides these below lg, so the footer carries them on phones. */}
        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-3 border-b border-border pb-8 lg:hidden">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {t(item.label, locale)}
            </a>
          ))}
        </nav>

        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <p className="font-serif-display text-lg text-foreground/70">{person.name}</p>

          <ul className="flex items-center gap-2">
            {socialLinks.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex size-10 items-center justify-center rounded-full border border-border bg-card text-foreground/60 outline-none transition-colors hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                  <BrandIcon name={social.icon} />
                </a>
              </li>
            ))}
          </ul>

          <p className="font-mono text-[11px] text-muted-foreground">
            {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}
