import { z } from "zod";

export const contactTopics = [
  "General question",
  "Help with a case I raised",
  "Volunteering",
  "Government or department enquiry",
  "Press and media",
  "Report a problem with the site",
] as const;

/** Validation messages are translation keys — see `concern.schema` for why. */
export const contactSchema = z.object({
  fullName: z.string().min(2, "validation.nameRequired"),
  email: z.email("validation.emailInvalidReply"),
  topic: z.enum(contactTopics, { message: "validation.topicRequired" }),
  message: z
    .string()
    .min(20, "validation.messageMin")
    .max(2000, "validation.messageMax"),
});

export type ContactInput = z.infer<typeof contactSchema>;
