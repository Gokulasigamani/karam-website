/**
 * Auth types with no runtime dependencies, so client components can import them
 * without pulling in the server-only session/database modules.
 */
export type Role = "member" | "volunteer" | "admin";

/** A pinned map location a user set for themselves. */
export interface GeoPoint {
  lat: number;
  lng: number;
}

/** A teammate as shown on the profile — no contact details, just who and where. */
export interface Teammate {
  id: string;
  name: string;
  locality?: string;
  ward?: string;
  photo?: string;
}

/** The safe view of a user — no password hash, id as a string. */
export interface SessionUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  district?: string;
  locality?: string;
  /** Neighbourhood / ward, free text. */
  ward?: string;
  /** Short self-description shown on the profile. */
  bio?: string;
  /** Small resized data-URL avatar stored on the user record. */
  photo?: string;
  /** Pin dropped on the map. */
  location?: GeoPoint;
  /** ISO date the account was created — shown as "member since". */
  joinedAt?: string;
}
