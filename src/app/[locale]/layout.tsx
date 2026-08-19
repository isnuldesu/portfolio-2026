import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Geist_Mono, Inter, Lexend, Playfair_Display } from "next/font/google";
import "../globals.css";

import { LocaleProvider } from "@/components/site/locale-provider";
import { ThemeProvider } from "@/components/site/theme-provider";
import { person } from "@/content/site";
import { isLocale, locales, localeMeta, t } from "@/lib/i18n";

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Used for exactly one line: the italic display half of the hero headline.
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["italic"],
  weight: ["400", "500"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
      className={`${lexend.variable} ${inter.variable} ${playfair.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <ThemeProvider>
          <LocaleProvider locale={locale}>{children}</LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
