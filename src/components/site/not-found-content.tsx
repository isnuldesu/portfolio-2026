"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useLocale } from "@/components/site/locale-provider";
import { Mascot } from "@/components/site/mascot";
import { ui } from "@/content/ui";
import { isLocale, localeMeta, t } from "@/lib/i18n";

/**
 * The 404 body. Shared by app/global-not-found.tsx (URLs that match no route,
 * rendered outside any layout, so it falls back to the default locale) and
 * app/[locale]/not-found.tsx (a page that called notFound(), rendered inside
 * the locale layout, so it answers in the reader's language).
 */
export function NotFoundContent() {
  // The global 404 renders outside the locale layout, so there is no provider
  // to ask. The first path segment still says which language the reader is in.
  const fromPath = usePathname()?.split("/")[1];
  const fromContext = useLocale();
  const locale = fromPath && isLocale(fromPath) ? fromPath : fromContext;

  // The global 404 document is served with lang="en"; correct it for /id so
  // screen readers pick the right voice.
  useEffect(() => {
    document.documentElement.lang = localeMeta[locale].htmlLang;
  }, [locale]);

  return (
    <div className="mx-auto grid min-h-[calc(100dvh-4rem)] w-full max-w-[76rem] items-center gap-10 px-5 py-16 sm:px-8 md:grid-cols-12">
      <div className="md:col-span-7">
        <p className="label-mono text-muted-foreground">{t(ui.notFound.code, locale)}</p>
        <h1 className="font-display mt-3 max-w-[18ch] text-4xl font-bold md:text-6xl">
          {t(ui.notFound.heading, locale)}
        </h1>
        <p className="mt-5 max-w-[52ch] text-base leading-relaxed text-muted-foreground">
          {t(ui.notFound.body, locale)}
        </p>

        <div className="mt-8 flex flex-wrap gap-2">
          <Link
            href={`/${locale}/work`}
            className="inline-flex h-10 items-center rounded-full bg-primary px-4 text-sm font-medium text-primary-foreground outline-none transition-opacity hover:opacity-85 focus-visible:ring-3 focus-visible:ring-ring"
          >
            {t(ui.notFound.work, locale)}
          </Link>
          <Link
            href={`/${locale}/experience`}
            className="inline-flex h-10 items-center rounded-full bg-secondary px-4 text-sm font-medium outline-none transition-colors hover:bg-primary hover:text-primary-foreground focus-visible:ring-3 focus-visible:ring-ring"
          >
            {t(ui.notFound.experience, locale)}
          </Link>
        </div>
      </div>

      <div className="md:col-span-5">
        <div className="rounded-2xl bg-muted p-8">
          <Mascot className="mx-auto h-auto w-full max-w-[10rem]" priority expression="surprised" />
        </div>
      </div>
    </div>
  );
}
