import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { getTranslations, getLocale } from "next-intl/server";
import { findCardHolderById } from "@/features/auth/server/users.repo";
import { CardImage, type CardImageLabels } from "@/features/membership-card/server/card-image";
import { memberQrDataUrl } from "@/features/membership-card/server/qr";
import { cardPixelSize } from "@/features/membership-card/lib/card-theme";
import { holderSince } from "@/features/membership-card/lib/card-fields";
import type { Role } from "@/features/auth/types";

/**
 * The membership card as a downloadable PNG.
 *
 * Public, like the verify page it mirrors — the QR on a printed card has to work
 * for whoever is holding it, and the image shows nothing the verify page does not.
 * The id is the member's own ObjectId, so this enumerates no more than that page.
 */

/** The signature face. `public/` is copied into the build, so the path holds. */
const SIGNATURE_FONT = join(process.cwd(), "public", "fonts", "dancing-script.ttf");

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const holder = await findCardHolderById(id);
  if (!holder) {
    return new Response("Not found", { status: 404 });
  }

  const [t, locale] = await Promise.all([getTranslations(), getLocale()]);

  const roleLabel: Record<Role, string> = {
    member: t("auth.roleMember"),
    volunteer: t("auth.roleVolunteer"),
    admin: t("auth.roleAdmin"),
  };
  const since = holderSince(holder.joinedAt, locale);

  const labels: CardImageLabels = {
    role: roleLabel[holder.role],
    cardLabel: t("card.cardLabel"),
    holderLabel: t("card.holderLabel"),
    since: since ? t("card.since", { date: since }) : null,
    scanToVerify: t("card.scanToVerify"),
    cofounder: t("card.cofounder"),
  };

  try {
    const [qrDataUrl, signatureFont] = await Promise.all([
      memberQrDataUrl(holder.id),
      readFile(SIGNATURE_FONT),
    ]);

    return new ImageResponse(
      <CardImage holder={holder} qrDataUrl={qrDataUrl} labels={labels} />,
      {
        ...cardPixelSize,
        fonts: [
          {
            name: "Dancing Script",
            data: signatureFont,
            style: "normal",
            weight: 600,
          },
        ],
        headers: {
          // `attachment` is why this is a route handler and not an
          // `opengraph-image` convention: it makes a phone save the file
          // instead of opening it in a tab the member then has to long-press.
          "Content-Disposition": `attachment; filename="${downloadName(holder.name)}"`,
          // Private: the card carries a person's name, so no shared CDN copy.
          "Cache-Control": "private, max-age=0, must-revalidate",
        },
      },
    );
  } catch (error) {
    console.error("membership-card: failed to render PNG", error);
    return new Response("Could not generate the card image", { status: 500 });
  }
}

/**
 * "karam-card-anand-kumar.png". Strips anything a `filename="…"` header or a
 * filesystem would choke on, and never returns an empty stem.
 */
function downloadName(name: string): string {
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);

  return `karam-card${slug ? `-${slug}` : ""}.png`;
}
