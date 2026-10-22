import { createHmac, timingSafeEqual } from "node:crypto";

/** Twelve hours, the same lifetime the cookie is given. */
export const SESSION_SECONDS = 60 * 60 * 12;

/**
 * The dashboard cookie carries an expiry and an HMAC of it, never the
 * password itself. The key is DASHBOARD_PASSWORD, so changing the password
 * signs everyone out.
 */
function sign(expiresAt: number, key: string) {
  return createHmac("sha256", key).update(`dash:${expiresAt}`).digest("base64url");
}

export function createSession(key: string, now = Date.now()) {
  const expiresAt = Math.floor(now / 1000) + SESSION_SECONDS;
  return `${expiresAt}.${sign(expiresAt, key)}`;
}

export function verifySession(value: string | undefined, key: string | undefined, now = Date.now()) {
  if (!value || !key) return false;
  const [rawExpiry, signature] = value.split(".");
  const expiresAt = Number(rawExpiry);
  if (!Number.isInteger(expiresAt) || !signature) return false;
  if (expiresAt < Math.floor(now / 1000)) return false;

  const expected = Buffer.from(sign(expiresAt, key));
  const given = Buffer.from(signature);
  return expected.length === given.length && timingSafeEqual(expected, given);
}

/** Constant-time password check: both sides are hashed to the same length first. */
export function passwordMatches(given: string, expected: string) {
  const a = createHmac("sha256", "dash-compare").update(given).digest();
  const b = createHmac("sha256", "dash-compare").update(expected).digest();
  return timingSafeEqual(a, b);
}
