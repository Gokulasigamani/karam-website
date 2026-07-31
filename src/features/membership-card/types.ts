import type { Role } from "@/features/auth/types";

/**
 * Everything the card prints, and nothing else.
 *
 * Deliberately narrower than `SessionUser`: the card is reachable by anyone who
 * scans the QR, so email, phone, bio and the map pin must not be in this shape
 * at all. If a field is not here, it cannot leak onto the public page.
 */
export interface CardHolder {
  id: string;
  name: string;
  role: Role;
  district?: string;
  ward?: string;
  /** ISO date the account was created — printed as the "since" line. */
  joinedAt?: string;
}
