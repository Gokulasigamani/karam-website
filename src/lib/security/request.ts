import "server-only";

import { headers } from "next/headers";

/**
 * Best-effort client IP for rate limiting. Behind a proxy or CDN the real client
 * is the first entry in `x-forwarded-for`. Falls back to a shared bucket when
 * unknown (e.g. local development), which is fine — rate limiting still works,
 * just coarsely.
 */
export async function getClientIp(): Promise<string> {
  const h = await headers();
  const forwarded = h.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return h.get("x-real-ip") ?? "unknown";
}
