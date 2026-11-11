import { NextResponse } from "next/server";
import {
  COOKIE_NAME,
  SESSION_MAX_AGE,
  authConfigured,
  checkPassword,
  createSessionToken,
} from "@/lib/auth";

export const dynamic = "force-dynamic";

// Simple in-memory throttle (per server instance) to slow down password guessing.
const attempts = new Map<string, { count: number; first: number }>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_ATTEMPTS = 8;

export async function POST(req: Request) {
  if (!authConfigured()) {
    return NextResponse.json(
      { error: "Admin is not set up yet. Add ADMIN_PASSWORD and ADMIN_SESSION_SECRET in Vercel." },
      { status: 500 }
    );
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const now = Date.now();
  const entry = attempts.get(ip);
  if (entry && now - entry.first < WINDOW_MS && entry.count >= MAX_ATTEMPTS) {
    return NextResponse.json({ error: "Too many attempts. Try again in a few minutes." }, { status: 429 });
  }

  let password = "";
  try {
    password = String((await req.json()).password ?? "");
  } catch {
    /* ignore */
  }

  if (!(await checkPassword(password))) {
    const fresh = entry && now - entry.first < WINDOW_MS ? entry : { count: 0, first: now };
    fresh.count += 1;
    attempts.set(ip, fresh);
    return NextResponse.json({ error: "Wrong password." }, { status: 401 });
  }

  attempts.delete(ip);
  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_NAME, await createSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
  return res;
}
