import type { Metadata } from "next";

import "./globals.css";
import "./fonts.css";
import { fontVariables } from "./site-fonts";

import { NotFoundContent } from "@/components/site/not-found-content";

export const metadata: Metadata = {
  title: "404 - Muhammad Isnul",
  robots: { index: false },
};

/**
 * URLs that match no route at all. The root layout lives under [locale], so
 * there is no layout to compose a 404 from; Next renders this document
 * directly (experimental.globalNotFound in next.config.ts).
 */
export default function GlobalNotFound() {
  return (
    <html lang="en" className={`${fontVariables} h-full antialiased`}>
      <body className="min-h-full bg-background text-foreground">
        <NotFoundContent />
      </body>
    </html>
  );
}
