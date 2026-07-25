"use server";

import { getTranslations } from "next-intl/server";
import type { FormState } from "@/types/form";
import { text, toFieldErrors } from "@/lib/utils/form";
import { isHoneypotFilled } from "@/lib/security/honeypot";
import { checkRateLimit } from "@/lib/security/rate-limit";
import { getClientIp } from "@/lib/security/request";
import { contactSchema } from "../schemas/contact.schema";
import { insertContact } from "./contact.repo";

/**
 * Validates a contact message and stores it. Field-error keys are returned raw
 * (the form localises them); everything else is translated server-side.
 */
export async function submitContact(
  _previous: FormState,
  formData: FormData,
): Promise<FormState> {
  const t = await getTranslations("forms");

  // A filled honeypot means a bot. Return the same success it would see for a
  // real send, but store nothing — no signal that the trap was spotted.
  if (isHoneypotFilled(formData)) {
    return { status: "success", message: t("contact.success") };
  }

  const ip = await getClientIp();
  if (!(await checkRateLimit(`contact:${ip}`, { limit: 5, windowMs: 60 * 60 * 1000 }))) {
    return { status: "error", message: t("contact.rateLimited") };
  }

  const parsed = contactSchema.safeParse({
    fullName: text(formData, "fullName"),
    email: text(formData, "email"),
    topic: text(formData, "topic"),
    message: text(formData, "message"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: t("checkFields"),
      fieldErrors: toFieldErrors(parsed.error),
    };
  }

  try {
    await insertContact(parsed.data);
    return { status: "success", message: t("contact.success") };
  } catch (error) {
    console.error("submitContact: failed to store message", error);
    return { status: "error", message: t("contact.storeError") };
  }
}
