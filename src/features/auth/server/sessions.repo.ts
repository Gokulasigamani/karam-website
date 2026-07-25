import "server-only";

import { createHash, randomBytes } from "node:crypto";
import { getDb } from "@/lib/db/mongo";

const COLLECTION = "sessions";
const LIFETIME_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

export const SESSION_MAX_AGE_SECONDS = LIFETIME_MS / 1000;

interface SessionDocument {
  tokenHash: string;
  userId: string;
  createdAt: Date;
  expiresAt: Date;
}

/** The cookie carries the raw token; the database only ever sees its hash, so a
 *  leaked database dump cannot be replayed as a live session. */
function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

/** Creates a session and returns the raw token to put in the cookie. */
export async function createSession(userId: string): Promise<string> {
  const token = randomBytes(32).toString("hex");
  const db = await getDb();
  const collection = db.collection<SessionDocument>(COLLECTION);
  // Every request looks a session up by its token hash; keep that indexed.
  await collection.createIndex({ tokenHash: 1 }, { unique: true });
  await collection.insertOne({
    tokenHash: hashToken(token),
    userId,
    createdAt: new Date(),
    expiresAt: new Date(Date.now() + LIFETIME_MS),
  });
  return token;
}

/** Resolves a raw token to its user id, clearing the row if it has expired. */
export async function userIdForToken(token: string): Promise<string | null> {
  const db = await getDb();
  const collection = db.collection<SessionDocument>(COLLECTION);
  const session = await collection.findOne({ tokenHash: hashToken(token) });
  if (!session) return null;

  if (session.expiresAt.getTime() < Date.now()) {
    await collection.deleteOne({ tokenHash: session.tokenHash });
    return null;
  }
  return session.userId;
}

export async function deleteSession(token: string): Promise<void> {
  const db = await getDb();
  await db.collection<SessionDocument>(COLLECTION).deleteOne({ tokenHash: hashToken(token) });
}
