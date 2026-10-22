import { NextResponse } from "next/server";

import { createSession, passwordMatches, SESSION_SECONDS } from "@/lib/dashboard-session";
import { clientKey, rateLimit } from "@/lib/rate-limit";

export async function POST(request: Request) {
  const expected = process.env.DASHBOARD_PASSWORD;
  if (!expected) return NextResponse.json({ ok: false }, { status: 503 });

  // Five tries per quarter hour per address.
  const limit = rateLimit(clientKey(request, "dash-login"), 5, 15 * 60 * 1000);
  if (!limit.ok) {
    return NextResponse.json(
      { ok: false },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } },
    );
  }

  let password = "";
  try {
    password = String((await request.json()).password ?? "");
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  if (!passwordMatches(password, expected)) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  // A signed expiry, never the password itself.
  response.cookies.set("dash", createSession(expected), {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    path: "/dashboard",
    maxAge: SESSION_SECONDS,
  });
  return response;
}
