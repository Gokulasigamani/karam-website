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

export const concernSchema = z.object({
  fullName: z.string().min(2, "Please enter your name."),
  phone: z
    .string()
    .min(1, "A phone number is required so volunteers can reach you.")
    .refine((value) => phonePattern.test(value.replace(/\s|-/g, "")), {
      message: "Enter a valid 10-digit mobile number.",
    }),
  email: z.union([z.email("Enter a valid email address."), z.literal("")]),
  category: z.enum(concernCategories, { message: "Choose a category." }),
  district: z.string().min(2, "Choose a district."),
  locality: z.string().min(2, "Add the ward, village or street."),
  title: z.string().min(6, "Give the concern a short title (at least 6 characters)."),
  description: z
    .string()
    .min(30, "Describe the situation in at least 30 characters so volunteers can act on it.")
    .max(2000, "Please keep this under 2000 characters."),
  urgency: z.enum(urgencyLevels, { message: "Choose how urgent this is." }),
  visibility: z.enum(["public", "private"], { message: "Choose a visibility option." }),
  consent: z.literal("on", { message: "Please confirm the details are accurate." }),
});

export type ConcernInput = z.infer<typeof concernSchema>;
