import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Geist, Space_Mono } from "next/font/google";
import "../globals.css";

import { LocaleProvider } from "@/components/site/locale-provider";
import { ThemeProvider } from "@/components/site/theme-provider";
import { person } from "@/content/site";
import { isLocale, locales, localeMeta, t } from "@/lib/i18n";

// The CV sets its text in Neue Montreal. That face is licensed from Pangram
// Pangram and cannot be served from a font CDN, so this is the stand-in until
// the webfont files are in hand. Geist is the closest free neo-grotesque:
// same Swiss skeleton, same tight apertures. The CSS stack in globals.css asks
// for Neue Montreal first, so dropping the woff2 files into src/app/fonts and
// switching this to next/font/local is a two line change.
const grotesk = Geist({
  variable: "--font-grotesk",
  subsets: ["latin"],
  display: "swap",
});

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
    },
    twitter: { card: "summary_large_image", title, description },
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
      className={`${grotesk.variable} ${spaceMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground">
        <ThemeProvider>
          <LocaleProvider locale={locale}>
            <div className="mx-auto w-full max-w-[82rem] px-0 sm:px-6 sm:py-8">
              <div className="sheet flex min-h-[calc(100dvh-4rem)] flex-col">
                {children}
              </div>
            </div>
          </LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
