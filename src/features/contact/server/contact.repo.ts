import "server-only";

import { getDb } from "@/lib/db/mongo";
import type { ContactInput } from "../schemas/contact.schema";

/** Stored shape of a contact message. */
export interface ContactDocument {
  fullName: string;
  email: string;
  topic: ContactInput["topic"];
  message: string;
  status: "new";
  createdAt: Date;
}

/** Persists a validated contact message. */
export async function insertContact(input: ContactInput): Promise<void> {
  const db = await getDb();

  const document: ContactDocument = {
    fullName: input.fullName,
    email: input.email,
    topic: input.topic,
    message: input.message,
    status: "new",
    createdAt: new Date(),
  };

  await db.collection<ContactDocument>("messages").insertOne(document);
}
