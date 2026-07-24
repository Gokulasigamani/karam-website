/**
 * Shared return shape for every Server Action behind a form.
 *
 * Actions resolve rather than throw so a form can render field errors in place
 * instead of tripping the nearest error boundary.
 */
export interface FormState {
  status: "idle" | "success" | "error";
  message?: string;
  /** Keyed by field name, so the form can render errors next to their input. */
  fieldErrors?: Record<string, string[]>;
}

export const initialFormState: FormState = { status: "idle" };
