"use server";

import { getTranslations } from "next-intl/server";
import type { FormState } from "@/types/form";
import { text, toFieldErrors } from "@/lib/utils/form";
import { getCurrentUser } from "@/features/auth/server/session";
import { checkRateLimit } from "@/lib/security/rate-limit";
import { createCaseFromConcern } from "@/features/cases/server/cases.repo";
import { concernSchema } from "../schemas/concern.schema";
import { insertConcern, newReference } from "./concern.repo";

/**
 * Validates a raised concern and stores it.
 *
 * Runs on the server, so the rules here hold even if the browser form is
 * bypassed. Resolves with a `FormState` instead of throwing, which lets the
 * form render field errors in place.
 */
export async function submitConcern(
  _previous: FormState,
  formData: FormData,
): Promise<FormState> {
  const t = await getTranslations("forms");
  const user = await getCurrentUser();
  if (!user) {
    return { status: "error", message: t("concern.loginRequired") };
  }

  if (!(await checkRateLimit(`concern:${user.id}`, { limit: 10, windowMs: 60 * 60 * 1000 }))) {
    return { status: "error", message: t("concern.rateLimited") };
  }

  const parsed = concernSchema.safeParse({
    fullName: text(formData, "fullName"),
    phone: text(formData, "phone"),
    email: text(formData, "email"),
    category: text(formData, "category"),
    district: text(formData, "district"),
    locality: text(formData, "locality"),
    title: text(formData, "title"),
    description: text(formData, "description"),
    urgency: text(formData, "urgency"),
    visibility: text(formData, "visibility"),
    consent: text(formData, "consent"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: t("checkFields"),
      fieldErrors: toFieldErrors(parsed.error),
    };
  }

  // Attachments are collected by the form but not yet stored — file upload to
  // object storage is a separate piece of work.
  try {
    const reference = newReference();
    const caseId = await createCaseFromConcern({
      reference,
      category: parsed.data.category,
      title: parsed.data.title,
      description: parsed.data.description,
      district: parsed.data.district,
      locality: parsed.data.locality,
      raisedByUserId: user.id,
    });
    await insertConcern(parsed.data, { reference, raisedByUserId: user.id, caseId });

    return { status: "success", message: t("concern.success", { reference }) };
  } catch (error) {
    console.error("submitConcern: failed to store concern", error);
    return { status: "error", message: t("concern.storeError") };
  }
}
