import "server-only";

import { ObjectId, type WithId } from "mongodb";
import { getDb } from "@/lib/db/mongo";

export type ApplicationStatus = "pending" | "approved" | "rejected";

export interface ApplicationDocument {
  userId: string;
  name: string;
  email: string;
  phone: string;
  district: string;
  locality: string;
  availability: string;
  interests: string[];
  status: ApplicationStatus;
  createdAt: Date;
  decidedAt?: Date;
  decidedBy?: string;
}

/** The admin-console view of an application. */
export interface ApplicationView extends Omit<ApplicationDocument, "createdAt" | "decidedAt"> {
  id: string;
  createdAt: string;
}

const COLLECTION = "volunteerApplications";

async function collection() {
  const db = await getDb();
  return db.collection<ApplicationDocument>(COLLECTION);
}

function toView(doc: WithId<ApplicationDocument>): ApplicationView {
  return {
    id: doc._id.toHexString(),
    userId: doc.userId,
    name: doc.name,
    email: doc.email,
    phone: doc.phone,
    district: doc.district,
    locality: doc.locality,
    availability: doc.availability,
    interests: doc.interests,
    status: doc.status,
    createdAt: doc.createdAt.toISOString(),
    decidedBy: doc.decidedBy,
  };
}

export type NewApplication = Omit<
  ApplicationDocument,
  "status" | "createdAt" | "decidedAt" | "decidedBy"
>;

export async function createApplication(input: NewApplication): Promise<void> {
  await (await collection()).insertOne({
    ...input,
    status: "pending",
    createdAt: new Date(),
  });
}

/** True when the user already has an application awaiting a decision. */
export async function hasPendingApplication(userId: string): Promise<boolean> {
  const found = await (await collection()).findOne({ userId, status: "pending" });
  return Boolean(found);
}

export async function getPendingApplications(): Promise<ApplicationView[]> {
  try {
    const docs = await (await collection())
      .find({ status: "pending" })
      .sort({ createdAt: 1 })
      .toArray();
    return docs.map(toView);
  } catch (error) {
    console.error("getPendingApplications: read failed", error);
    return [];
  }
}

/**
 * Records a decision and returns the application, so the caller can promote the
 * user on approval. Only acts on a still-pending application.
 */
export async function decideApplication(
  applicationId: string,
  status: "approved" | "rejected",
  decidedBy: string,
): Promise<ApplicationView | null> {
  if (!ObjectId.isValid(applicationId)) return null;
  const col = await collection();
  const doc = await col.findOneAndUpdate(
    { _id: new ObjectId(applicationId), status: "pending" },
    { $set: { status, decidedAt: new Date(), decidedBy } },
    { returnDocument: "after" },
  );
  return doc ? toView(doc) : null;
}
