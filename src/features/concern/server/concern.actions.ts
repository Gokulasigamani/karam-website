"use server";

import type { FormState } from "@/types/form";
import { list, text, toFieldErrors } from "@/lib/utils/form";
import { concernSchema } from "../schemas/concern.schema";

/**
 * Validates a raised concern and hands it to the backend.
 *
 * Runs on the server, so the rules here hold even if the browser form is
 * bypassed. Resolves with a `FormState` instead of throwing, which lets the
 * form render field errors in place.
 */
export async function submitConcern(
  _previous: FormState,
  formData: FormData,
): Promise<FormState> {
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
      message: "Please check the highlighted fields and try again.",
      fieldErrors: toFieldErrors(parsed.error),
    };
  }

  // Not yet wired to a backend. When the API exists, this becomes:
  //   await createConcern(parsed.data)   // features/concern/api/concern.api.ts
  // and the catch below turns an ApiError into a user-facing message.
  void list(formData, "attachments");

  return {
    status: "success",
    message:
      "Your concern has been received. Volunteers in your ward will be notified, and you will get an SMS with the case reference shortly.",
  };
}
