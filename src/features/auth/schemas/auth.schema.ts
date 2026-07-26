import { z } from "zod";
import { districts } from "@/constants/routes";

const optionalText = (max: number, message: string) =>
  z.string().max(max, message).optional().or(z.literal(""));

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

export const profileSchema = z.object({
  name: z.string().min(2, "validation.nameRequired").max(80, "validation.nameMax"),
  bio: optionalText(280, "validation.bioMax"),
  ward: optionalText(80, "validation.wardMax"),
  district: z
    .string()
    .refine((value) => value === "" || (districts as readonly string[]).includes(value), {
      message: "validation.districtInvalid",
    }),
});

export type ProfileInput = z.infer<typeof profileSchema>;

export type SignupInput = z.infer<typeof signupSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
