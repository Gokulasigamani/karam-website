import "server-only";

import { randomBytes } from "node:crypto";
import { getDb } from "@/lib/db/mongo";
import type { ConcernInput } from "../schemas/concern.schema";

/** Stored shape of a raised concern. `reference` is the human-facing case id. */
export interface ConcernDocument {
  reference: string;
  fullName: string;
  phone: string;
  email: string | null;
  category: ConcernInput["category"];
  district: string;
  locality: string;
  title: string;
  description: string;
  urgency: ConcernInput["urgency"];
  visibility: ConcernInput["visibility"];
  consent: true;
  status: "received";
  /** The member who raised it, and the case it became. */
  raisedByUserId: string;
  caseId: string;
  createdAt: Date;
}

/** e.g. KRM-7F3K9Q — short enough to read out over the phone. */
export function newReference(): string {
  const code = randomBytes(4).toString("hex").toUpperCase().slice(0, 6);
  return `KRM-${code}`;
}

/**
 * Persists a validated concern, linked to the member who raised it and the case
 * it became.
 *
 * Consent is a literal `"on"` in the form payload; it is stored as a plain
 * boolean so the record reads as data rather than a form artefact.
 */
export async function insertConcern(
  input: ConcernInput,
  meta: { reference: string; raisedByUserId: string; caseId: string },
): Promise<void> {
  const db = await getDb();

  const document: ConcernDocument = {
    reference: meta.reference,
    fullName: input.fullName,
    phone: input.phone,
    email: input.email === "" ? null : input.email,
    category: input.category,
    district: input.district,
    locality: input.locality,
    title: input.title,
    description: input.description,
    urgency: input.urgency,
    visibility: input.visibility,
    consent: true,
    status: "received",
    raisedByUserId: meta.raisedByUserId,
    caseId: meta.caseId,
    createdAt: new Date(),
  };

  await db.collection<ConcernDocument>("concerns").insertOne(document);
}
