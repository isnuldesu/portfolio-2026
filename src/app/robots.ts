import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // The dashboard is behind a password; it has no business in an index.
      disallow: ["/dashboard", "/api/"],
    },
    sitemap: "https://isnul.site/sitemap.xml",
  };
}
