// Minimal password auth using a signed, expiring cookie.
// Uses Web Crypto so it works in both Next.js middleware (edge) and route handlers (node).

export const COOKIE_NAME = "daya_admin";
const SESSION_SECONDS = 60 * 60 * 12; // 12 hours

const encoder = new TextEncoder();

function secret() {
  return process.env.ADMIN_SESSION_SECRET || "";
}

function toHex(buf: ArrayBuffer) {
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function sign(payload: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  return toHex(await crypto.subtle.sign("HMAC", key, encoder.encode(payload)));
}

/** Constant-time string comparison. */
function safeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export function authConfigured() {
  return Boolean(process.env.ADMIN_PASSWORD && secret().length >= 16);
}

export async function checkPassword(input: string) {
  const expected = process.env.ADMIN_PASSWORD || "";
  if (!expected) return false;
  // Compare HMACs of both values so lengths don't leak
  const [a, b] = await Promise.all([sign("pw:" + input), sign("pw:" + expected)]);
  return safeEqual(a, b);
}

export async function createSessionToken() {
  const expires = Math.floor(Date.now() / 1000) + SESSION_SECONDS;
  const payload = String(expires);
  return `${payload}.${await sign(payload)}`;
}

export async function verifySessionToken(token: string | undefined | null) {
  if (!token || !authConfigured()) return false;
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return false;
  const expected = await sign(payload);
  if (!safeEqual(sig, expected)) return false;
  return Number(payload) > Math.floor(Date.now() / 1000);
}

export const SESSION_MAX_AGE = SESSION_SECONDS;
