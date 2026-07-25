import "server-only";

import { unstable_cache } from "next/cache";
import { getDb } from "@/lib/db/mongo";
import type { CaseEvent, CaseRecord } from "@/content/cases";

const COLLECTION = "cases";

/** The tag every public case read is cached under; mutations revalidate it. */
export const CASES_TAG = "cases";

/** Pending cases are awaiting verification and are never shown publicly. */
const PUBLIC_FILTER = { status: { $ne: "Pending" as const } };

async function collection() {
  const db = await getDb();
  return db.collection<CaseRecord>(COLLECTION);
}

/* --------------------------------------------------------------- Public reads */

/**
 * The public reads go through Next's data cache (60s, tagged), so browsing and
 * language switching don't re-query MongoDB on every render — which matters most
 * on serverless, where each database round-trip can mean a fresh Atlas
 * connection. Case mutations call `revalidateTag(CASES_TAG)` to refresh it.
 *
 * The cached functions may throw; the exported wrappers catch that and degrade
 * to empty results (a database blip must not take the site down) and, crucially,
 * a thrown error is not what gets cached — the next request retries.
 */
const cachedCases = unstable_cache(
  async (): Promise<CaseRecord[]> =>
    (await collection())
      .find(PUBLIC_FILTER, { projection: { _id: 0 } })
      .sort({ progress: -1 })
      .toArray(),
  ["cases-public-list"],
  { revalidate: 60, tags: [CASES_TAG] },
);

const cachedPublicCaseById = unstable_cache(
  async (id: string): Promise<CaseRecord | null> =>
    (await collection()).findOne({ id, ...PUBLIC_FILTER }, { projection: { _id: 0 } }),
  ["cases-public-by-id"],
  { revalidate: 60, tags: [CASES_TAG] },
);

/** Publicly listable cases, most-progressed first. Cached; empty on read failure. */
export async function getCases(): Promise<CaseRecord[]> {
  try {
    return await cachedCases();
  } catch (error) {
    console.error("getCases: database read failed, returning empty list", error);
    return [];
  }
}

/** A single publicly listable case, or `null` for an unknown/pending id. Cached. */
export async function getPublicCaseById(id: string): Promise<CaseRecord | null> {
  try {
    return await cachedPublicCaseById(id);
  } catch (error) {
    console.error(`getPublicCaseById(${id}): database read failed`, error);
    return null;
  }
}

/* ------------------------------------------------------------- Internal reads */

/** Any case by id, regardless of status. For verify/admin views. */
export async function getCaseByIdAny(id: string): Promise<CaseRecord | null> {
  return (await collection()).findOne({ id }, { projection: { _id: 0 } });
}

/** Every case a member has raised, newest first. */
export async function getCasesRaisedBy(userId: string): Promise<CaseRecord[]> {
  try {
    return await (await collection())
      .find({ raisedByUserId: userId }, { projection: { _id: 0 } })
      .sort({ createdAt: -1 })
      .toArray();
  } catch (error) {
    console.error("getCasesRaisedBy: read failed", error);
    return [];
  }
}

/** Every pending case — the admin can verify from anywhere. */
export async function getPendingCases(): Promise<CaseRecord[]> {
  try {
    return await (await collection())
      .find({ status: "Pending" }, { projection: { _id: 0 } })
      .sort({ createdAt: 1 })
      .toArray();
  } catch (error) {
    console.error("getPendingCases: read failed", error);
    return [];
  }
}

/** Pending cases in a district, for a volunteer's verify queue. */
export async function getPendingCasesInDistrict(district: string): Promise<CaseRecord[]> {
  try {
    return await (await collection())
      .find({ status: "Pending", district }, { projection: { _id: 0 } })
      .sort({ createdAt: 1 })
      .toArray();
  } catch (error) {
    console.error("getPendingCasesInDistrict: read failed", error);
    return [];
  }
}

/** Every case, any status, newest first — for the admin console. */
export async function getAllCases(): Promise<CaseRecord[]> {
  try {
    return await (await collection())
      .find({}, { projection: { _id: 0 } })
      .sort({ createdAt: -1 })
      .toArray();
  } catch (error) {
    console.error("getAllCases: read failed", error);
    return [];
  }
}

/* -------------------------------------------------------------------- Writes */

export async function insertCase(record: CaseRecord): Promise<void> {
  await (await collection()).insertOne({ ...record });
}

/** Plain inputs a raised concern hands to case creation. Intentionally not the
 *  concern schema type — cases must not import the concern feature. */
export interface CaseFromConcern {
  reference: string;
  category: string;
  title: string;
  description: string;
  district: string;
  locality: string;
  raisedByUserId: string;
}

/**
 * Creates the Pending case that a concern becomes. The case id is the lowercased
 * reference, so it is stable and human-traceable. Returns the id.
 */
export async function createCaseFromConcern(input: CaseFromConcern): Promise<string> {
  const id = input.reference.toLowerCase();
  const raisedOn = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const record: CaseRecord = {
    id,
    category: input.category,
    title: input.title,
    summary: input.description.length > 160 ? `${input.description.slice(0, 157)}…` : input.description,
    location: `${input.locality}, ${input.district}`,
    status: "Pending",
    routedTo: "Not yet routed",
    supporters: 0,
    daysOpen: 0,
    progress: 10,
    imageUrl: "",
    imageAlt: "",
    raisedOn,
    background: [input.description],
    needs: [],
    timeline: [
      {
        date: raisedOn,
        title: "Concern raised",
        detail: "Raised by a member. Awaiting verification by two local volunteers.",
        done: true,
      },
    ],
    raisedByUserId: input.raisedByUserId,
    verifications: [],
    district: input.district,
    createdAt: new Date().toISOString(),
  };

  await insertCase(record);
  return id;
}

/**
 * Records a volunteer's verification, but only if they have not already verified
 * this case. Returns whether a new verification was added, so the caller can
 * decide about promotion without a race.
 */
export async function addVerification(
  id: string,
  userId: string,
  at: string,
): Promise<boolean> {
  const result = await (await collection()).updateOne(
    { id, status: "Pending", "verifications.userId": { $ne: userId } },
    { $push: { verifications: { userId, at } } },
  );
  return result.modifiedCount > 0;
}

/** Promotes a pending case to Verified (public). No-op if already promoted. */
export async function promoteToVerified(id: string, event: CaseEvent): Promise<void> {
  await (await collection()).updateOne(
    { id, status: "Pending" },
    { $set: { status: "Verified", progress: 40 }, $push: { timeline: event } },
  );
}

/** Routes a case to a department and marks it Escalated. */
export async function routeCase(
  id: string,
  routedTo: string,
  event: CaseEvent,
): Promise<void> {
  await (await collection()).updateOne(
    { id },
    { $set: { status: "Escalated", routedTo, progress: 65 }, $push: { timeline: event } },
  );
}

/** Appends a dated update to the resolution trail. */
export async function appendTimelineEvent(id: string, event: CaseEvent): Promise<void> {
  await (await collection()).updateOne({ id }, { $push: { timeline: event } });
}

/** Marks a case Resolved. */
export async function resolveCase(id: string, event: CaseEvent): Promise<void> {
  await (await collection()).updateOne(
    { id },
    { $set: { status: "Resolved", progress: 100 }, $push: { timeline: event } },
  );
}
