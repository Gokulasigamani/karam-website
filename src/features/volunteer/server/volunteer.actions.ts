"use server";

import type { FormState } from "@/types/form";
import { list, text, toFieldErrors } from "@/lib/utils/form";
import { volunteerSchema } from "../schemas/volunteer.schema";

/**
 * Validates a volunteer signup and hands it to the backend.
 *
 * Resolves with a `FormState` instead of throwing, which lets the form render
 * field errors in place.
 */
export async function submitVolunteer(
  _previous: FormState,
  formData: FormData,
): Promise<FormState> {
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
      message: "Please check the highlighted fields and try again.",
      fieldErrors: toFieldErrors(parsed.error),
    };
  }

  // Not yet wired to a backend. When the API exists, this becomes:
  //   await registerVolunteer(parsed.data)  // features/volunteer/api/volunteer.api.ts

  return {
    status: "success",
    message:
      "You are on the list. Your ward coordinator will call within two days to walk you through your first verification.",
  };
}
