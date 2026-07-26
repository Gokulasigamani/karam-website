/**
 * Auth types with no runtime dependencies, so client components can import them
 * without pulling in the server-only session/database modules.
 */
export type Role = "member" | "volunteer" | "admin";

/** The safe view of a user — no password hash, id as a string. */
export interface SessionUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  district?: string;
  locality?: string;
}
