import "server-only";

import { getDb } from "@/lib/db/mongo";

/**
 * A fixed-window rate limiter backed by MongoDB, so it works across serverless
 * instances (an in-memory limiter would reset on every cold start and not share
 * state between instances).
 *
 * Each window is one counter document keyed by `key:windowStart`, with a TTL
 * index that lets the database expire old windows on its own.
 */
interface RateLimitDoc {
  _id: string;
  count: number;
  expiresAt: Date;
}

export interface RateLimit {
  /** Maximum allowed hits within the window. */
  limit: number;
  /** Window length in milliseconds. */
  windowMs: number;
}

/** Returns true if the hit is allowed, false if the caller is over the limit. */
export async function checkRateLimit(key: string, { limit, windowMs }: RateLimit): Promise<boolean> {
  try {
    const db = await getDb();
    const col = db.collection<RateLimitDoc>("rateLimits");
    await col.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 });

    const now = Date.now();
    const windowStart = now - (now % windowMs);
    const id = `${key}:${windowStart}`;

    const doc = await col.findOneAndUpdate(
      { _id: id },
      { $inc: { count: 1 }, $setOnInsert: { expiresAt: new Date(windowStart + windowMs) } },
      { upsert: true, returnDocument: "after" },
    );

    return (doc?.count ?? 1) <= limit;
  } catch (error) {
    // Fail open: a database blip should not lock legitimate users out.
    console.error("checkRateLimit failed, allowing request", error);
    return true;
  }
}
