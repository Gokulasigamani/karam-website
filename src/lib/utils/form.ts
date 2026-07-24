import type { ZodError } from "zod";

/**
 * Turns a Zod error into the `fieldErrors` shape our forms render.
 *
 * Built from `issues` directly rather than a version-specific helper, so a Zod
 * major bump doesn't quietly change the output.
 */
export function toFieldErrors(error: ZodError): Record<string, string[]> {
  const fieldErrors: Record<string, string[]> = {};

  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    (fieldErrors[key] ??= []).push(issue.message);
  }

  return fieldErrors;
}

/** Reads a single text value from `FormData`, trimmed. */
export function text(formData: FormData, name: string): string {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim() : "";
}

/** Reads a repeated field (checkbox group) from `FormData`. */
export function list(formData: FormData, name: string): string[] {
  return formData.getAll(name).filter((value): value is string => typeof value === "string");
}
