/**
 * The premium membership card a member gets on logging in: rendered on the
 * account page, downloadable as a PNG, and verifiable by anyone who scans its
 * QR code.
 *
 * Server-only modules (`server/qr.ts`, `server/card-image.tsx`) are imported
 * directly by the pages and the image route rather than re-exported here, so
 * pulling the card component into a client bundle cannot drag the PNG encoder
 * along with it.
 */
export { PremiumCard } from "./components/premium-card";
export { cardBrand, holderSince, membershipNumber, holderLocation } from "./lib/card-fields";
export { cardAspect, cardPixelSize } from "./lib/card-theme";
export type { CardHolder } from "./types";
