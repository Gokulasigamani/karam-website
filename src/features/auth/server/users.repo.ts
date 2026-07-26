import "server-only";

import { ObjectId, type WithId } from "mongodb";
import { getDb } from "@/lib/db/mongo";
import type { Role, SessionUser } from "../types";

export type { Role, SessionUser };

/** Stored user. `email` is always lowercased; `passwordHash` never leaves the server. */
export interface UserDocument {
  name: string;
  email: string;
  passwordHash: string;
  role: Role;
  district?: string;
  locality?: string;
  phone?: string;
  createdAt: Date;
}

const COLLECTION = "users";

function toSessionUser(doc: WithId<UserDocument>): SessionUser {
  return {
    id: doc._id.toHexString(),
    name: doc.name,
    email: doc.email,
    role: doc.role,
    district: doc.district,
    locality: doc.locality,
  };
}

/** Full document (with hash) — for the login check only. */
export async function findUserByEmail(email: string): Promise<WithId<UserDocument> | null> {
  const db = await getDb();
  return db.collection<UserDocument>(COLLECTION).findOne({ email: email.toLowerCase() });
}

export async function findUserById(id: string): Promise<SessionUser | null> {
  if (!ObjectId.isValid(id)) return null;
  const db = await getDb();
  const doc = await db.collection<UserDocument>(COLLECTION).findOne({ _id: new ObjectId(id) });
  return doc ? toSessionUser(doc) : null;
}

export interface NewUser {
  name: string;
  email: string;
  passwordHash: string;
  role: Role;
  district?: string;
  locality?: string;
  phone?: string;
}

/**
 * Inserts a user. The unique index makes a duplicate email a write error rather
 * than a race, so callers can rely on it even under concurrent signups.
 */
export async function createUser(input: NewUser): Promise<SessionUser> {
  const db = await getDb();
  const collection = db.collection<UserDocument>(COLLECTION);
  await collection.createIndex({ email: 1 }, { unique: true });

  const doc: UserDocument = {
    name: input.name,
    email: input.email.toLowerCase(),
    passwordHash: input.passwordHash,
    role: input.role,
    district: input.district,
    locality: input.locality,
    phone: input.phone,
    createdAt: new Date(),
  };

  const result = await collection.insertOne(doc);
  return toSessionUser({ ...doc, _id: result.insertedId });
}

export async function setUserRole(id: string, role: Role): Promise<void> {
  if (!ObjectId.isValid(id)) return;
  const db = await getDb();
  await db.collection<UserDocument>(COLLECTION).updateOne({ _id: new ObjectId(id) }, { $set: { role } });
}

/** Grants the volunteer role and records the area they cover, so the verify
 *  queue can match them to nearby cases. */
export async function promoteToVolunteer(
  id: string,
  district: string,
  locality: string,
): Promise<void> {
  if (!ObjectId.isValid(id)) return;
  const db = await getDb();
  await db
    .collection<UserDocument>(COLLECTION)
    .updateOne({ _id: new ObjectId(id) }, { $set: { role: "volunteer", district, locality } });
}

export async function updateUserPassword(id: string, passwordHash: string): Promise<void> {
  if (!ObjectId.isValid(id)) return;
  const db = await getDb();
  await db
    .collection<UserDocument>(COLLECTION)
    .updateOne({ _id: new ObjectId(id) }, { $set: { passwordHash } });
}
