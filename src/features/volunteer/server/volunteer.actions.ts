"use server";

import { getTranslations } from "next-intl/server";
import type { FormState } from "@/types/form";
import { list, text, toFieldErrors } from "@/lib/utils/form";
import { getCurrentUser } from "@/features/auth/server/session";
import { checkRateLimit } from "@/lib/security/rate-limit";
import { volunteerSchema } from "../schemas/volunteer.schema";
import { createApplication, hasPendingApplication } from "./applications.repo";

/**
 * Validates a volunteer application and files it for admin review.
 *
 * Requires a signed-in member — the application is tied to their account, and an
 * admin's approval is what actually grants the volunteer role. Resolves with a
 * `FormState` instead of throwing so the form can render errors in place.
 */
export async function submitVolunteer(
  _previous: FormState,
  formData: FormData,
): Promise<FormState> {
  const t = await getTranslations("forms");
  const user = await getCurrentUser();
  if (!user) {
    return { status: "error", message: t("volunteer.loginRequired") };
  }
  if (user.role === "volunteer" || user.role === "admin") {
    return { status: "error", message: t("volunteer.alreadyVolunteer") };
  }

  if (!(await checkRateLimit(`volunteer:${user.id}`, { limit: 5, windowMs: 60 * 60 * 1000 }))) {
    return { status: "error", message: t("volunteer.rateLimited") };
  }

  const parsed = volunteerSchema.safeParse({
    fullName: text(formData, "fullName"),
    phone: text(formData, "phone"),
    email: text(formData, "email"),
    district: text(formData, "district"),
    locality: text(formData, "locality"),
    availability: text(formData, "availability"),
    interests: list(formData, "interests"),
    consent: text(formData, "consent"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: t("checkFields"),
      fieldErrors: toFieldErrors(parsed.error),
    };
  }

  try {
    if (await hasPendingApplication(user.id)) {
      return { status: "error", message: t("volunteer.pendingExists") };
    }

    await createApplication({
      userId: user.id,
      name: parsed.data.fullName,
      email: parsed.data.email || user.email,
      phone: parsed.data.phone,
      district: parsed.data.district,
      locality: parsed.data.locality,
      availability: parsed.data.availability,
      interests: parsed.data.interests,
    });

    return { status: "success", message: t("volunteer.success") };
  } catch (error) {
    console.error("submitVolunteer: failed to store application", error);
    return { status: "error", message: t("volunteer.storeError") };
  }
}
