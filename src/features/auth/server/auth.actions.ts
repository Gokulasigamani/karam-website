"use server";

import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import type { FormState } from "@/types/form";
import { text, toFieldErrors } from "@/lib/utils/form";
import { isHoneypotFilled } from "@/lib/security/honeypot";
import { checkRateLimit } from "@/lib/security/rate-limit";
import { getClientIp } from "@/lib/security/request";
import { changePasswordSchema, loginSchema, signupSchema } from "../schemas/auth.schema";
import { createUser, findUserByEmail, updateUserPassword } from "./users.repo";
import { hashPassword, verifyPassword } from "./password";
import { createSession, deleteSession } from "./sessions.repo";
import {
  SESSION_COOKIE,
  clearSessionCookie,
  getCurrentUser,
  setSessionCookie,
} from "./session";
import { cookies } from "next/headers";

/** Only same-origin absolute paths are allowed as a post-auth destination. */
function safeNext(value: string): string {
  return value.startsWith("/") && !value.startsWith("//") ? value : "/account";
}

export async function signup(_previous: FormState, formData: FormData): Promise<FormState> {
  const t = await getTranslations();
  if (isHoneypotFilled(formData)) {
    return { status: "error", message: t("forms.genericError") };
  }

  const ip = await getClientIp();
  if (!(await checkRateLimit(`signup:${ip}`, { limit: 5, windowMs: 60 * 60 * 1000 }))) {
    return { status: "error", message: t("auth.tooManySignup") };
  }

  const next = safeNext(text(formData, "next"));
  const parsed = signupSchema.safeParse({
    name: text(formData, "name"),
    email: text(formData, "email"),
    password: text(formData, "password"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: t("forms.checkFields"),
      fieldErrors: toFieldErrors(parsed.error),
    };
  }

  const existing = await findUserByEmail(parsed.data.email);
  if (existing) {
    return {
      status: "error",
      message: t("auth.emailExists"),
      fieldErrors: { email: ["auth.emailExistsField"] },
    };
  }

  try {
    const passwordHash = await hashPassword(parsed.data.password);
    const user = await createUser({
      name: parsed.data.name,
      email: parsed.data.email,
      passwordHash,
      role: "member",
    });
    const token = await createSession(user.id);
    await setSessionCookie(token);
  } catch (error) {
    console.error("signup failed", error);
    return { status: "error", message: t("auth.signupError") };
  }

  redirect(next);
}

export async function login(_previous: FormState, formData: FormData): Promise<FormState> {
  const t = await getTranslations();
  // Throttle attempts per IP so the login form can't be used for brute force.
  const ip = await getClientIp();
  if (!(await checkRateLimit(`login:${ip}`, { limit: 10, windowMs: 15 * 60 * 1000 }))) {
    return { status: "error", message: t("auth.tooManyLogin") };
  }

  const next = safeNext(text(formData, "next"));
  const parsed = loginSchema.safeParse({
    email: text(formData, "email"),
    password: text(formData, "password"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: t("forms.checkFields"),
      fieldErrors: toFieldErrors(parsed.error),
    };
  }

  // One generic message for both cases, so the form never reveals which emails
  // are registered.
  const invalid: FormState = { status: "error", message: t("auth.invalidCredentials") };

  try {
    const user = await findUserByEmail(parsed.data.email);
    if (!user) return invalid;

    const ok = await verifyPassword(parsed.data.password, user.passwordHash);
    if (!ok) return invalid;

    const token = await createSession(user._id.toHexString());
    await setSessionCookie(token);
  } catch (error) {
    console.error("login failed", error);
    return { status: "error", message: t("auth.loginError") };
  }

  redirect(next);
}

export async function logout(): Promise<void> {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (token) await deleteSession(token);
  await clearSessionCookie();
  redirect("/");
}

export async function changePassword(
  _previous: FormState,
  formData: FormData,
): Promise<FormState> {
  const t = await getTranslations();
  const current = await getCurrentUser();
  if (!current) return { status: "error", message: t("auth.loginAgain") };

  const parsed = changePasswordSchema.safeParse({
    currentPassword: text(formData, "currentPassword"),
    newPassword: text(formData, "newPassword"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: t("forms.checkFields"),
      fieldErrors: toFieldErrors(parsed.error),
    };
  }

  try {
    const full = await findUserByEmail(current.email);
    if (!full) return { status: "error", message: t("auth.loginAgain") };

    const ok = await verifyPassword(parsed.data.currentPassword, full.passwordHash);
    if (!ok) {
      return {
        status: "error",
        message: t("auth.currentPasswordWrong"),
        fieldErrors: { currentPassword: ["auth.incorrectPassword"] },
      };
    }

    const passwordHash = await hashPassword(parsed.data.newPassword);
    await updateUserPassword(current.id, passwordHash);
  } catch (error) {
    console.error("changePassword failed", error);
    return { status: "error", message: t("auth.loginError") };
  }

  return { status: "success", message: t("auth.passwordUpdated") };
}
