/**
 * A honeypot is a form field hidden from people but visible to naive bots, which
 * fill every field they find. A real submission always leaves it empty.
 *
 * The name is deliberately plausible ("company") so bots take the bait.
 */
export const HONEYPOT_NAME = "company";

/** True when the honeypot was filled — treat the submission as a bot. */
export function isHoneypotFilled(formData: FormData): boolean {
  const value = formData.get(HONEYPOT_NAME);
  return typeof value === "string" && value.trim() !== "";
}
