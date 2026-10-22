import { NextResponse, type NextRequest } from "next/server";

/**
 * Every page lives under /id or /en. A path that starts with anything else
 * (an old unprefixed link, a typo) is sent to the same path under /en, where
 * it either resolves or gets the site's own 404 in the site's own layout,
 * instead of Next's bare default.
 */
export function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  url.pathname = `/en${url.pathname}`;
  return NextResponse.redirect(url, 307);
}

export const config = {
  // Skip the locales, the dashboard, the print sheets, API routes, Next internals, and any path
  // with a dot in it (public files, sitemap.xml, robots.txt, icons).
  matcher: ["/((?!en(?:/|$)|id(?:/|$)|dashboard|print|api|_next|.*\\..*).+)"],
};
