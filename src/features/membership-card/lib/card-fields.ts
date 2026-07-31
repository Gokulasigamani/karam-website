import { siteConfig } from "@/config/site";
import type { CardHolder } from "../types";

/** The fixed text every card carries, regardless of who holds it. */
export const cardBrand = {
  org: "Sunajo",
  slogan: siteConfig.tagline,
  signatureName: "Gokulasigamani",
} as const;

/**
 * The printed membership number.
 *
 * Derived from the tail of the Mongo ObjectId rather than stored as its own
 * field: it is stable for the life of the account, needs no migration, and the
 * counter portion of an ObjectId gives enough spread that two members in the
 * same district will not collide visually. Not a secret — the full id is already
 * in the QR URL — so a short form is fine.
 */
export function membershipNumber(id: string): string {
  const tail = id.replace(/[^a-f0-9]/gi, "").slice(-8).toUpperCase();
  const padded = tail.padStart(8, "0");
  return `KRM ${padded.slice(0, 4)} ${padded.slice(4)}`;
}

/** "Chennai · Ward 12", or just the district, or nothing. */
export function holderLocation(holder: CardHolder): string {
  return [holder.district, holder.ward].filter(Boolean).join(" · ");
}

/**
 * "March 2024" for the since line. Returns null on a missing or unparseable
 * date so callers drop the row instead of printing "Invalid Date" on a card.
 */
export function holderSince(joinedAt: string | undefined, locale: string): string | null {
  if (!joinedAt) return null;
  const date = new Date(joinedAt);
  if (Number.isNaN(date.getTime())) return null;

  return new Intl.DateTimeFormat(locale === "ta" ? "ta-IN" : "en-IN", {
    month: "long",
    year: "numeric",
  }).format(date);
}
