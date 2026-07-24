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

export const volunteerSchema = z.object({
  fullName: z.string().min(2, "Please enter your name."),
  phone: z
    .string()
    .min(1, "A phone number is required so your ward team can reach you.")
    .refine((value) => phonePattern.test(value.replace(/\s|-/g, "")), {
      message: "Enter a valid 10-digit mobile number.",
    }),
  email: z.union([z.email("Enter a valid email address."), z.literal("")]),
  district: z.string().min(2, "Choose a district."),
  locality: z.string().min(2, "Add the ward, village or street you can cover."),
  availability: z.enum(availabilityOptions, { message: "Choose your availability." }),
  interests: z
    .array(z.enum(volunteerInterests))
    .min(1, "Choose at least one way you can help."),
  consent: z.literal("on", { message: "Please agree to the volunteer conduct terms." }),
});

export type VolunteerInput = z.infer<typeof volunteerSchema>;
