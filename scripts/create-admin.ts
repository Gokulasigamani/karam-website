/**
 * Creates (or promotes) an admin account. Admins have no public signup, so this
 * is how the first one is made.
 *
 *   npm run create-admin -- <email> <password> "<name>"
 *
 * Re-running with an existing email promotes that user to admin and updates the
 * password.
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";

const here = dirname(fileURLToPath(import.meta.url));

function loadEnv(): Record<string, string> {
  const out: Record<string, string> = {};
  for (const line of readFileSync(join(here, "..", ".env.local"), "utf8").split("\n")) {
    const t = line.trim();
    if (!t || t.startsWith("#") || !t.includes("=")) continue;
    const i = t.indexOf("=");
    out[t.slice(0, i).trim()] = t.slice(i + 1).trim();
  }
  return out;
}

async function main() {
  const [email, password, name = "Admin"] = process.argv.slice(2);
  if (!email || !password) {
    console.error('Usage: npm run create-admin -- <email> <password> "<name>"');
    process.exitCode = 1;
    return;
  }
  if (password.length < 8) {
    console.error("Password must be at least 8 characters.");
    process.exitCode = 1;
    return;
  }

  const env = loadEnv();
  const client = new MongoClient(env.MONGODB_URI);

  try {
    await client.connect();
    const users = client.db(env.MONGODB_DB || "karam").collection("users");
    await users.createIndex({ email: 1 }, { unique: true });

    const passwordHash = await bcrypt.hash(password, 12);
    const result = await users.updateOne(
      { email: email.toLowerCase() },
      {
        $set: { role: "admin", passwordHash, name },
        $setOnInsert: { email: email.toLowerCase(), createdAt: new Date() },
      },
      { upsert: true },
    );

    console.log(
      result.upsertedCount > 0
        ? `Created admin ${email}.`
        : `Promoted ${email} to admin and reset the password.`,
    );
  } finally {
    await client.close();
  }
}

main().catch((error) => {
  console.error("create-admin failed:", error);
  process.exitCode = 1;
});
