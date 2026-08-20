import Link from "next/link";
import { Space_Mono } from "next/font/google";

import "@fontsource/open-sauce-sans/400.css";
import "@fontsource/open-sauce-sans/500.css";
import "./globals.css";
import "./fonts.css";

import { ui } from "@/content/ui";
import { defaultLocale, t } from "@/lib/i18n";

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

/**
 * The root layout lives under [locale], so an unmatched URL has no layout to
 * inherit. This page brings its own document, and answers in the default
 * language because there is no locale segment to read.
 */
export default function NotFound() {
  const locale = defaultLocale;

  return (
    <html lang="en" className={`${spaceMono.variable} h-full antialiased`}>
      <body className="min-h-full bg-background text-foreground">
        <main className="mx-auto w-full max-w-[82rem] px-0 py-0 sm:px-6 sm:py-8">
          <div className="sheet px-5 py-12 sm:px-8 md:px-12 md:py-16">
            <p
              className="font-display text-6xl font-medium leading-none md:text-8xl"
              style={{ color: "var(--coral-block)" }}
            >
              {t(ui.notFound.code, locale)}
            </p>

            <h1 className="font-display mt-8 max-w-[20ch] text-3xl font-medium tracking-tight md:text-5xl">
              {t(ui.notFound.heading, locale)}
            </h1>

            <p className="mt-5 max-w-[52ch] text-base leading-relaxed text-muted-foreground">
              {t(ui.notFound.body, locale)}
            </p>

            <div className="mt-10 flex flex-wrap gap-6 border-t-2 border-border pt-8">
              <Link
                href={`/${locale}#work`}
                className="label-mono text-foreground underline-offset-4 hover:underline"
              >
                {t(ui.notFound.work, locale)}
              </Link>
              <Link
                href={`/${locale}/experience`}
                className="label-mono text-foreground underline-offset-4 hover:underline"
              >
                {t(ui.notFound.experience, locale)}
              </Link>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
