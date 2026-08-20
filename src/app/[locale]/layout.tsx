import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Space_Mono } from "next/font/google";
// Open Sauce Sans carries body copy. Self-hosted from the OFL release rather
// than pulled from a third party at runtime.
import "@fontsource/open-sauce-sans/400.css";
import "@fontsource/open-sauce-sans/500.css";
import "@fontsource/open-sauce-sans/700.css";
import "../globals.css";
import "../fonts.css";

import { Analytics } from "@vercel/analytics/next";

import { LocaleProvider } from "@/components/site/locale-provider";
import { SiteNav } from "@/components/site/site-nav";
import { ThemeProvider } from "@/components/site/theme-provider";
import { person } from "@/content/site";
import { isLocale, locales, localeMeta, t } from "@/lib/i18n";



const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const title = `${person.name} - ${t(person.role, locale)}`;
  const description = t(person.tagline, locale);

  return {
    metadataBase: new URL("https://isnul-portfolio-2026.vercel.app"),
    title: { default: title, template: `%s - ${person.name}` },
    description,
    alternates: {
      canonical: `/${locale}`,
      languages: { id: "/id", en: "/en" },
    },
    openGraph: {
      title,
      description,
      type: "website",
      locale: localeMeta[locale].htmlLang,
      images: [{ url: "/og.png", width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og.png"],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <html
      lang={localeMeta[locale].htmlLang}
      suppressHydrationWarning
      className={`${spaceMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground">
        <ThemeProvider>
          <LocaleProvider locale={locale}>
            <a
              href="#content"
              className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:border-2 focus:border-border focus:bg-[var(--sheet)] focus:px-4 focus:py-2 focus:text-sm"
            >
              {locale === "id" ? "Lompat ke konten" : "Skip to content"}
            </a>
            <SiteNav />
            <main
              id="content"
              className="flex min-h-dvh flex-col gap-4 px-0 py-0 sm:gap-6 sm:px-6 sm:py-8"
            >
              {children}
            </main>
          </LocaleProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
