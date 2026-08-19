import type { Metadata } from "next";
import { Geist_Mono, Inter, Lexend, Playfair_Display } from "next/font/google";
import "./globals.css";

import { person } from "@/content/site";

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

const title = `${person.name} - ${person.role}`;

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio-2026.vercel.app"),
  title: {
    default: title,
    template: `%s - ${person.name}`,
  },
  description: person.tagline,
  openGraph: {
    title,
    description: person.tagline,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: person.tagline,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${lexend.variable} ${inter.variable} ${playfair.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
