import "server-only";

import { MongoClient, type Db } from "mongodb";
import { serverEnv } from "@/lib/config/env";

/**
 * The single MongoDB connection for the whole app.
 *
 * The `server-only` import above makes this a build error the moment a Client
 * Component imports it — the driver and the connection string can never reach
 * the browser bundle.
 *
 * In development Next.js reloads modules on every save, so a plain module-level
 * client would open a new connection pool each time and quickly exhaust the
 * cluster's limit. Caching the promise on `globalThis` keeps one pool alive
 * across reloads. In production the module is evaluated once, so the global is
 * only a safety net.
 */
declare global {
  var __mongoClientPromise: Promise<MongoClient> | undefined;
}

function clientPromise(): Promise<MongoClient> {
  if (!globalThis.__mongoClientPromise) {
    const client = new MongoClient(serverEnv.mongoUri);
    globalThis.__mongoClientPromise = client.connect();
  }
  return globalThis.__mongoClientPromise;
}

/** The application database. Await it wherever a collection is needed. */
export async function getDb(): Promise<Db> {
  const client = await clientPromise();
  return client.db(serverEnv.mongoDb);
}
