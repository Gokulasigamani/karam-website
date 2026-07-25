"use server";

import { revalidatePath } from "next/cache";
import { requireRole } from "@/features/auth/server/session";
import { promoteToVolunteer } from "@/features/auth/server/users.repo";
import { routes } from "@/constants/routes";
import { text } from "@/lib/utils/form";
import { decideApplication } from "./applications.repo";

/**
 * Approves a volunteer application: records the decision and grants the
 * applicant the volunteer role plus the area they cover. Admin-only.
 */
export async function approveApplication(formData: FormData): Promise<void> {
  const admin = await requireRole("admin", routes.admin);
  const applicationId = text(formData, "applicationId");

  const application = await decideApplication(applicationId, "approved", admin.id);
  if (application) {
    await promoteToVolunteer(application.userId, application.district, application.locality);
  }

  revalidatePath(routes.admin);
}

/** Rejects a volunteer application. The applicant stays a member. Admin-only. */
export async function rejectApplication(formData: FormData): Promise<void> {
  const admin = await requireRole("admin", routes.admin);
  const applicationId = text(formData, "applicationId");

  await decideApplication(applicationId, "rejected", admin.id);
  revalidatePath(routes.admin);
}
