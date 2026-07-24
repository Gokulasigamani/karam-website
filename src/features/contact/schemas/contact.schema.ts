import { z } from "zod";

export const contactTopics = [
  "General question",
  "Help with a case I raised",
  "Volunteering",
  "Government or department enquiry",
  "Press and media",
  "Report a problem with the site",
] as const;

export const contactSchema = z.object({
  fullName: z.string().min(2, "Please enter your name."),
  email: z.email("Enter a valid email address so we can reply."),
  topic: z.enum(contactTopics, { message: "Choose what this is about." }),
  message: z
    .string()
    .min(20, "Please give us at least 20 characters to work with.")
    .max(2000, "Please keep this under 2000 characters."),
});

export type ContactInput = z.infer<typeof contactSchema>;
