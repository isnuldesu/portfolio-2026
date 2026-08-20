import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const expected = process.env.DASHBOARD_PASSWORD;
  if (!expected) return NextResponse.json({ ok: false }, { status: 503 });

  let password = "";
  try {
    password = (await request.json()).password ?? "";
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  // Compare every character so the reply time says nothing about the answer.
  let mismatch = password.length === expected.length ? 0 : 1;
  for (let i = 0; i < expected.length; i++) {
    mismatch |= password.charCodeAt(i) ^ expected.charCodeAt(i);
  }
  if (mismatch !== 0) return NextResponse.json({ ok: false }, { status: 401 });

  const response = NextResponse.json({ ok: true });
  response.cookies.set("dash", expected, {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    path: "/dashboard",
    maxAge: 60 * 60 * 12,
  });
  return response;
}
