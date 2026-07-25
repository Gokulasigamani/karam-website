import { z } from "zod";

export const volunteerInterests = [
  "Verifying cases on the ground",
  "Helping with documents and applications",
  "Hospital and medical support",
  "Emergency and disaster response",
  "Transport and delivery",
  "Translation and paperwork",
] as const;

export const availabilityOptions = [
  "A few hours a week",
  "Weekends only",
  "On call for emergencies",
] as const;

const phonePattern = /^(?:\+?91[\s-]?)?[6-9]\d{9}$/;

/** Validation messages are translation keys — see `concern.schema` for why. */
export const volunteerSchema = z.object({
  fullName: z.string().min(2, "validation.nameRequired"),
  phone: z
    .string()
    .min(1, "validation.phoneRequiredVolunteer")
    .refine((value) => phonePattern.test(value.replace(/\s|-/g, "")), {
      message: "validation.phoneInvalid",
    }),
  email: z.union([z.email("validation.emailInvalid"), z.literal("")]),
  district: z.string().min(2, "validation.districtRequired"),
  locality: z.string().min(2, "validation.localityRequiredCover"),
  availability: z.enum(availabilityOptions, { message: "validation.availabilityRequired" }),
  interests: z.array(z.enum(volunteerInterests)).min(1, "validation.interestsRequired"),
  consent: z.literal("on", { message: "validation.consentVolunteer" }),
});

export type VolunteerInput = z.infer<typeof volunteerSchema>;
