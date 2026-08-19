"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { useLocale } from "@/components/site/locale-provider";
import { localeMeta, locales } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/** Swaps the locale segment and keeps the rest of the path, hash included. */
export function LocaleSwitcher() {
  const current = useLocale();
  const pathname = usePathname();

  return (
    <div className="flex h-10 items-center border border-border">
      {locales.map((locale) => {
        const meta = localeMeta[locale];
        const rest = pathname.replace(/^\/(id|en)/, "") || "";
        const active = locale === current;

        return (
          <Link
            key={locale}
            href={`/${locale}${rest}`}
            hrefLang={meta.htmlLang}
            aria-current={active ? "true" : undefined}
            className={cn(
              "flex h-full items-center gap-1.5 px-3 text-xs font-medium outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/50",
              active
                ? "bg-foreground text-background"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            <span aria-hidden="true" className="text-sm leading-none">
              {meta.flag}
            </span>
            {meta.label}
          </Link>
        );
      })}
    </div>
  );
}
