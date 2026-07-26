import "server-only";

import { ObjectId, type WithId } from "mongodb";
import { getDb } from "@/lib/db/mongo";
import type { GeoPoint, Role, SessionUser, Teammate } from "../types";

export type { Role, SessionUser, Teammate };

/** Stored user. `email` is always lowercased; `passwordHash` never leaves the server. */
export interface UserDocument {
  name: string;
  email: string;
  passwordHash: string;
  role: Role;
  district?: string;
  locality?: string;
  ward?: string;
  bio?: string;
  photo?: string;
  location?: GeoPoint;
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
    ward: doc.ward,
    bio: doc.bio,
    photo: doc.photo,
    location: doc.location,
    joinedAt: doc.createdAt ? doc.createdAt.toISOString() : undefined,
  };
}

/** The fields a member can edit about themselves from the profile page. */
export interface ProfileUpdate {
  name: string;
  bio?: string;
  district?: string;
  ward?: string;
  photo?: string;
  location?: GeoPoint;
}

/**
 * Saves the editable profile fields. Empty optional values are `$unset` so a
 * cleared field actually disappears rather than lingering as an empty string.
 */
export async function updateProfile(id: string, update: ProfileUpdate): Promise<void> {
  if (!ObjectId.isValid(id)) return;
  const db = await getDb();

  const set: Record<string, unknown> = { name: update.name };
  const unset: Record<string, ""> = {};
  const optional: (keyof ProfileUpdate)[] = ["bio", "district", "ward", "photo", "location"];
  for (const key of optional) {
    const value = update[key];
    if (value === undefined || value === "") unset[key] = "";
    else set[key] = value;
  }

  await db.collection<UserDocument>(COLLECTION).updateOne(
    { _id: new ObjectId(id) },
    Object.keys(unset).length ? { $set: set, $unset: unset } : { $set: set },
  );
}

/**
 * Volunteers covering the same district, so a member sees who is active around
 * them. Excludes the viewer and caps the list; ordered by most recently joined.
 */
export async function getVolunteersInDistrict(
  district: string,
  excludeId: string,
): Promise<Teammate[]> {
  if (!district) return [];
  const db = await getDb();
  const docs = await db
    .collection<UserDocument>(COLLECTION)
    .find({ role: "volunteer", district })
    .sort({ createdAt: -1 })
    .limit(18)
    .toArray();

  return docs
    .filter((doc) => doc._id.toHexString() !== excludeId)
    .map((doc) => ({
      id: doc._id.toHexString(),
      name: doc.name,
      locality: doc.locality,
      ward: doc.ward,
      photo: doc.photo,
    }));
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
