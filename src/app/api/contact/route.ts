import { NextResponse } from "next/server";

import { getSupabase } from "@/lib/supabase";

type Payload = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  /** Honeypot. Real people leave it empty. */
  company?: unknown;
};

const asText = (value: unknown, max: number) =>
  typeof value === "string" ? value.trim().slice(0, max) : "";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ code: "unknown" }, { status: 400 });
  }

  // Bots fill every field they find. Accept silently so they stop retrying.
  if (asText(body.company, 200)) {
    return NextResponse.json({ ok: true });
  }

  const name = asText(body.name, 120);
  const email = asText(body.email, 255);
  const message = asText(body.message, 4000);

  if (!name || !email || !message) {
    return NextResponse.json({ code: "required" }, { status: 400 });
  }
  if (!EMAIL.test(email)) {
    return NextResponse.json({ code: "email" }, { status: 400 });
  }
  if (message.length < 20) {
    return NextResponse.json({ code: "short" }, { status: 400 });
  }

  const supabase = getSupabase();
  if (!supabase) {
    return NextResponse.json({ code: "offline" }, { status: 503 });
  }

  const { error } = await supabase.from("contact_messages").insert({
    name,
    email,
    message,
    source: "portfolio-2026",
    user_agent: asText(request.headers.get("user-agent"), 400),
  });

  if (error) {
    console.error("contact insert failed", error.message);
    return NextResponse.json({ code: "failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
