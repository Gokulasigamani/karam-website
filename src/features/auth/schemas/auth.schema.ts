import { z } from "zod";

/** Validation messages are translation keys — see `concern.schema` for why. */
const password = z
  .string()
  .min(8, "validation.passwordMin")
  .max(200, "validation.passwordMax");

export const signupSchema = z.object({
  name: z.string().min(2, "validation.nameRequired"),
  email: z.email("validation.emailInvalid"),
  password,
});

export const loginSchema = z.object({
  email: z.email("validation.emailInvalid"),
  password: z.string().min(1, "validation.passwordRequired"),
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, "validation.currentPasswordRequired"),
  newPassword: password,
});

export type SignupInput = z.infer<typeof signupSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
