"use server";

import { revalidatePath } from "next/cache";
import { requireRole } from "@/features/auth/server/session";
import { routes } from "@/constants/routes";
import { text } from "@/lib/utils/form";
import {
  addVerification,
  appendTimelineEvent,
  getCaseByIdAny,
  promoteToVerified,
  resolveCase,
  routeCase,
} from "./cases.repo";

const VERIFICATIONS_REQUIRED = 2;

function today(): string {
  return new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/**
 * A volunteer confirms they saw a pending case on the ground. Two distinct
 * volunteers — never the person who raised it — move the case to Verified and
 * public. Every rule is enforced here on the server, not in the UI.
 */
export async function verifyCase(formData: FormData): Promise<void> {
  const user = await requireRole(["volunteer", "admin"], routes.verifyQueue);
  const caseId = text(formData, "caseId");

  const record = await getCaseByIdAny(caseId);
  if (record && record.status === "Pending" && record.raisedByUserId !== user.id) {
    const added = await addVerification(caseId, user.id, new Date().toISOString());
    if (added) {
      const updated = await getCaseByIdAny(caseId);
      const count = updated?.verifications?.length ?? 0;
      if (count >= VERIFICATIONS_REQUIRED) {
        await promoteToVerified(caseId, {
          date: today(),
          title: "Verified on the ground",
          detail:
            "Two local volunteers confirmed this case in person. It is now public and ready for escalation.",
          done: true,
        });
      }
    }
  }

  revalidatePath(routes.verifyQueue);
  revalidatePath(`${routes.cases}/${caseId}`);
}

/** Admin routes a verified case to the department that can resolve it. */
export async function routeCaseAction(formData: FormData): Promise<void> {
  await requireRole("admin", routes.admin);
  const caseId = text(formData, "caseId");
  const department = text(formData, "department");
  if (!department) return;

  await routeCase(caseId, department, {
    date: today(),
    title: "Routed to a department",
    detail: `Case escalated to ${department} for action.`,
    done: true,
  });

  revalidatePath(routes.admin);
  revalidatePath(`${routes.cases}/${caseId}`);
}

/** Admin posts an update to a case's resolution trail. */
export async function addUpdateAction(formData: FormData): Promise<void> {
  await requireRole("admin", routes.admin);
  const caseId = text(formData, "caseId");
  const detail = text(formData, "detail");
  if (!detail) return;

  await appendTimelineEvent(caseId, {
    date: today(),
    title: "Update",
    detail,
    done: true,
  });

  revalidatePath(routes.admin);
  revalidatePath(`${routes.cases}/${caseId}`);
}

/** Admin marks a case resolved. */
export async function resolveCaseAction(formData: FormData): Promise<void> {
  await requireRole("admin", routes.admin);
  const caseId = text(formData, "caseId");

  await resolveCase(caseId, {
    date: today(),
    title: "Resolved",
    detail: "The department acted and the case has been closed.",
    done: true,
  });

  revalidatePath(routes.admin);
  revalidatePath(`${routes.cases}/${caseId}`);
}
