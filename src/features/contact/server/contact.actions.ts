"use server";

import type { FormState } from "@/types/form";
import { text, toFieldErrors } from "@/lib/utils/form";
import { contactSchema } from "../schemas/contact.schema";

/**
 * Validates a contact message and hands it to the backend.
 *
 * Resolves with a `FormState` instead of throwing, which lets the form render
 * field errors in place.
 */
export async function submitContact(
  _previous: FormState,
  formData: FormData,
): Promise<FormState> {
  const parsed = contactSchema.safeParse({
    fullName: text(formData, "fullName"),
    email: text(formData, "email"),
    topic: text(formData, "topic"),
    message: text(formData, "message"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: "Please check the highlighted fields and try again.",
      fieldErrors: toFieldErrors(parsed.error),
    };
  }

  // Not yet wired to a backend. When the API exists, this becomes:
  //   await sendContactMessage(parsed.data)  // features/contact/api/contact.api.ts

  return {
    status: "success",
    message: "Thanks — your message is with us. We reply to everything within two working days.",
  };
}
