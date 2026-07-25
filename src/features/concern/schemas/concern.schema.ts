import { z } from "zod";

export const concernCategories = [
  "Food & Shelter",
  "Medical Access",
  "Documents & Entitlements",
  "Education Support",
  "Complaints & Grievances",
  "Emergency Response",
] as const;

export const urgencyLevels = [
  "Immediate — someone is at risk today",
  "This week",
  "No fixed deadline",
] as const;

export const visibilityOptions = [
  { value: "public", label: "Show my name on the case" },
  { value: "private", label: "Keep my name private" },
] as const;

/** Indian mobile numbers, with or without spaces or a +91 prefix. */
const phonePattern = /^(?:\+?91[\s-]?)?[6-9]\d{9}$/;

/**
 * Validation messages are translation keys (see the `validation` namespace),
 * resolved to text at display time in both the client hook and the server
 * action — so errors are localised the same way everywhere.
 */
export const concernSchema = z.object({
  fullName: z.string().min(2, "validation.nameRequired"),
  phone: z
    .string()
    .min(1, "validation.phoneRequiredConcern")
    .refine((value) => phonePattern.test(value.replace(/\s|-/g, "")), {
      message: "validation.phoneInvalid",
    }),
  email: z.union([z.email("validation.emailInvalid"), z.literal("")]),
  category: z.enum(concernCategories, { message: "validation.categoryRequired" }),
  district: z.string().min(2, "validation.districtRequired"),
  locality: z.string().min(2, "validation.localityRequired"),
  title: z.string().min(6, "validation.titleRequired"),
  description: z
    .string()
    .min(30, "validation.descriptionMin")
    .max(2000, "validation.descriptionMax"),
  urgency: z.enum(urgencyLevels, { message: "validation.urgencyRequired" }),
  visibility: z.enum(["public", "private"], { message: "validation.visibilityRequired" }),
  consent: z.literal("on", { message: "validation.consentConcern" }),
});

export type ConcernInput = z.infer<typeof concernSchema>;
