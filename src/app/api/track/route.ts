import { NextResponse } from "next/server";

import { clientKey, rateLimit } from "@/lib/rate-limit";
import { getSupabase } from "@/lib/supabase";

/**
 * A page view, recorded server side. No cookie, no identifier, nothing that
 * follows a person between visits: just the path, the language, where the
 * click came from, and the country the CDN already knows.
 */
export async function POST(request: Request) {
  // A reader does not open sixty pages a minute. Drop the excess quietly.
  if (!rateLimit(clientKey(request, "track"), 60, 60 * 1000).ok) {
    return NextResponse.json({ ok: true });
  }

  let body: { path?: unknown; locale?: unknown; referrer?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const clip = (value: unknown, max: number) =>
    typeof value === "string" && value.trim() ? value.trim().slice(0, max) : null;

  const path = clip(body.path, 300);
  if (!path) return NextResponse.json({ ok: false }, { status: 400 });

  const supabase = getSupabase();
  if (!supabase) return NextResponse.json({ ok: true });

  // Only keep the referring host, never the full URL someone came from.
  const raw = clip(body.referrer, 300);
  let referrer: string | null = null;
  if (raw) {
    try {
      referrer = new URL(raw).host || null;
    } catch {
      referrer = null;
    }
  }

  await supabase.from("page_views").insert({
    path,
    locale: clip(body.locale, 8),
    referrer,
    country: request.headers.get("x-vercel-ip-country")?.slice(0, 8) ?? null,
  });

  return NextResponse.json({ ok: true });
}
