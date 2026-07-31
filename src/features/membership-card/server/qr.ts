import "server-only";

import QRCode from "qrcode";
import { siteConfig } from "@/config/site";
import { memberVerifyRoute } from "@/constants/routes";
import { cardInk, foil } from "../lib/card-theme";

/**
 * Server-side only: `qrcode` pulls in a PNG encoder that has no business in a
 * client bundle, and every caller (the account page, the verify page, the image
 * route) already renders on the server.
 */

/** The absolute URL the QR encodes — must be absolute to survive a phone scan. */
export function verifyUrl(id: string): string {
  return new URL(memberVerifyRoute(id), siteConfig.url).toString();
}

/**
 * A PNG data URL of the member's verification link.
 *
 * A data URL rather than a file because both consumers want it inline: the card
 * component drops it straight into an `<img>`, and Satori (the PNG generator)
 * cannot fetch a relative URL during render.
 *
 * Error correction is set to "M" — the card's QR is printed small, and the
 * higher levels add modules that make it denser rather than more readable at
 * that size.
 */
export async function memberQrDataUrl(id: string): Promise<string> {
  return QRCode.toDataURL(verifyUrl(id), {
    errorCorrectionLevel: "M",
    margin: 1,
    // Rendered at 4x the on-card size so it stays crisp in the 1400px PNG.
    width: 480,
    color: { dark: cardInk.base, light: foil[100] },
  });
}
