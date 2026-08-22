import type { MetadataRoute } from "next";

import { caseStudies } from "@/content/case-studies";
import { locales } from "@/lib/i18n";

const BASE = "https://isnul.site";

/** Every page, in both languages, each pointing at its counterpart. */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/work", "/experience", ...caseStudies.map((s) => `/work/${s.slug}`)];

  return locales.flatMap((locale) =>
    paths.map((path) => ({
      url: `${BASE}/${locale}${path}`,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : path === "/work" ? 0.8 : 0.6,
      alternates: {
        languages: Object.fromEntries(
          locales.map((other) => [other, `${BASE}/${other}${path}`]),
        ),
      },
    })),
  );
}
