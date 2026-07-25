/**
 * Seeds the `cases` collection from the seed array in `src/content/cases.ts`.
 *
 * Upserts by the business `id`, so it is safe to run repeatedly — it refreshes
 * existing cases and adds any new ones without creating duplicates. It never
 * deletes, so a case added directly in the database survives a re-seed.
 *
 * Run with:  npm run seed:cases
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { MongoClient } from "mongodb";
import { cases } from "../src/content/cases";

const here = dirname(fileURLToPath(import.meta.url));

/** Minimal `.env.local` reader — the script runs outside Next, which loads it. */
function loadEnv(): Record<string, string> {
  const path = join(here, "..", ".env.local");
  const out: Record<string, string> = {};
  for (const line of readFileSync(path, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) continue;
    const i = trimmed.indexOf("=");
    out[trimmed.slice(0, i).trim()] = trimmed.slice(i + 1).trim();
  }
  return out;
}

async function main() {
  const env = loadEnv();
  const uri = env.MONGODB_URI;
  const dbName = env.MONGODB_DB || "karam";

  if (!uri) throw new Error("MONGODB_URI is missing from .env.local");

  const client = new MongoClient(uri);

  try {
    await client.connect();
    const collection = client.db(dbName).collection("cases");

    let upserted = 0;
    let updated = 0;
    for (const record of cases) {
      const result = await collection.updateOne(
        { id: record.id },
        { $set: record },
        { upsert: true },
      );
      if (result.upsertedCount > 0) upserted += 1;
      else if (result.matchedCount > 0) updated += 1;
    }

    const total = await collection.countDocuments();
    console.log(
      `Seed complete: ${upserted} inserted, ${updated} updated. ` +
        `Collection now holds ${total} case(s).`,
    );
  } finally {
    await client.close();
  }
}

main().catch((error) => {
  console.error("Seed failed:", error);
  process.exitCode = 1;
});
