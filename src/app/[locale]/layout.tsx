import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "../globals.css";
import "../fonts.css";
import { fontVariables } from "../site-fonts";

import { Analytics } from "@vercel/analytics/next";

import { LocaleProvider } from "@/components/site/locale-provider";
import { PageView } from "@/components/site/page-view";
import { PressSound } from "@/components/site/press-sound";
import { SiteNav } from "@/components/site/site-nav";
import { SmoothScroll } from "@/components/site/smooth-scroll";
import { WhatsappFab } from "@/components/site/whatsapp-fab";
import { ThemeProvider } from "@/components/site/theme-provider";
import { person } from "@/content/site";
import { isLocale, locales, localeMeta, t } from "@/lib/i18n";
import { INTRO_ARM_SCRIPT } from "@/lib/intro";


// Only /id and /en exist. Any other first segment is an unmatched route, so it
// gets app/global-not-found.tsx rather than the bare default 404.
export const dynamicParams = false;

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
    metadataBase: new URL("https://isnul.site"),
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
      className={`${fontVariables} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground">
        <script dangerouslySetInnerHTML={{ __html: INTRO_ARM_SCRIPT }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: person.name,
              alternateName: person.shortName,
              jobTitle: [person.role, person.secondaryRole],
              email: `mailto:${person.email}`,
              url: "https://isnul.site",
              image: "https://isnul.site/portrait.webp",
              sameAs: [
                "https://www.linkedin.com/in/isnul/",
                "https://github.com/isnuldesu",
                `https://wa.me/${person.whatsapp}`,
              ],
              knowsLanguage: ["id", "en"],
            }),
          }}
        />
        <ThemeProvider>
          <LocaleProvider locale={locale}>
            <a
              href="#content"
              className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:border focus:border-border focus:bg-[var(--sheet)] focus:px-4 focus:py-2 focus:text-sm"
            >
              {locale === "id" ? "Lompat ke konten" : "Skip to content"}
            </a>
            <SiteNav />
            <main
              id="content"
              className="flex min-h-dvh flex-col"
            >
              {children}
            </main>
            <WhatsappFab />
            <SmoothScroll />
            <PressSound />
          </LocaleProvider>
        </ThemeProvider>
        <PageView />
        <Analytics />
      </body>
    </html>
  );
}
