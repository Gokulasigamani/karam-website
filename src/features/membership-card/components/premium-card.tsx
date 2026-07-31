"use client";

import { useTranslations } from "next-intl";
import { Logo } from "@/components/ui/icons";
import type { Role } from "@/features/auth/types";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils/cn";
import { cardAspect } from "../lib/card-theme";
import { cardBrand, holderLocation, membershipNumber } from "../lib/card-fields";
import type { CardHolder } from "../types";

/**
 * The membership card as it appears in the browser.
 *
 * Every dimension is in `cqw` against the card's own inline size, so the card is
 * one fixed design that scales as a unit — the same proportions at 320px as at
 * 1400px, and the same proportions as the downloadable PNG. Type does not reflow
 * inside a card the way it would in a paragraph, which is the point: this is a
 * graphic, not a layout. The plain-text copy of the same details lives beside it
 * on both pages that render this, so nothing here is the only route to the
 * information.
 *
 * Dark in both themes on purpose — a card that inverted with the site theme
 * would not read as the same object as the file the member downloaded.
 */
export function PremiumCard({
  holder,
  qrDataUrl,
  since,
  className,
}: {
  holder: CardHolder;
  /** PNG data URL from `server/qr.ts`. */
  qrDataUrl: string;
  /** Pre-formatted "March 2024", or null to drop the row. */
  since: string | null;
  className?: string;
}) {
  const t = useTranslations();
  const location = holderLocation(holder);

  const roleLabel: Record<Role, string> = {
    member: t("auth.roleMember"),
    volunteer: t("auth.roleVolunteer"),
    admin: t("auth.roleAdmin"),
  };

  return (
    <div
      className={cn(
        "@container relative isolate w-full overflow-hidden rounded-[var(--radius-block)]",
        "bg-[#0b0a09] text-[#faf9f7] shadow-[var(--shadow-pop)]",
        className,
      )}
      style={{ aspectRatio: cardAspect }}
    >
      {/* Foil wash — a diagonal sweep, brightest at the top-left corner */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(118deg,#1b1917_0%,#0b0a09_46%,#100e0c_72%,#1a1613_100%)]"
      />
      {/* Gold bloom behind the name */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-[18%] -left-[8%] -z-10 size-[46%] rounded-full bg-foil-500/18 blur-[10cqw]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-[10%] -bottom-[24%] -z-10 size-[40%] rounded-full bg-foil-700/22 blur-[9cqw]"
      />
      {/* Engine-turned guilloche: fine gold rules, the anti-counterfeit look */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.09] [background-image:repeating-linear-gradient(72deg,#d4af37_0,#d4af37_0.1cqw,transparent_0.1cqw,transparent_1.1cqw)]"
      />
      {/* Inner foil hairline, inset from the edge like a real card's border */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-[1.6cqw] rounded-[calc(var(--radius-block)-1cqw)] ring-[0.1cqw] ring-foil-500/28 ring-inset"
      />

      <div className="relative flex h-full flex-col justify-between p-[4cqw]">
        {/* Header — brand on the left, tier on the right */}
        <header className="flex items-start justify-between gap-[3cqw]">
          <div className="flex items-center gap-[1.5cqw]">
            <Logo className="size-[3.2cqw] text-foil-500" />
            <div>
              <p className="text-[2.7cqw] leading-none font-extrabold tracking-[-0.04em]">
                {siteConfig.name}
              </p>
              <p className="mt-[0.7cqw] text-[1.15cqw] leading-none font-semibold tracking-[0.22em] text-foil-300/70 uppercase">
                {cardBrand.org}
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className="inline-flex items-center rounded-full bg-[linear-gradient(100deg,#f7ecc9,#d4af37_52%,#9a7420)] px-[2cqw] py-[0.75cqw] text-[1.25cqw] leading-none font-bold tracking-[0.16em] text-[#0b0a09] uppercase">
              {roleLabel[holder.role]}
            </span>
            <p className="mt-[1.1cqw] text-[1.1cqw] leading-none font-semibold tracking-[0.2em] text-[#a8a29a] uppercase">
              {t("card.cardLabel")}
            </p>
          </div>
        </header>

        {/* Holder — the reason the card exists, so it gets the most room */}
        <div className="flex items-end justify-between gap-[3cqw]">
          <div className="min-w-0">
            <p className="text-[1.15cqw] leading-none font-semibold tracking-[0.24em] text-foil-300/75 uppercase">
              {t("card.holderLabel")}
            </p>
            <p className="mt-[1.4cqw] text-[5cqw] leading-[1.05] font-extrabold tracking-[-0.035em]">
              {holder.name}
            </p>
            <div className="mt-[1.4cqw] flex flex-wrap items-center gap-x-[2cqw] gap-y-[0.6cqw] text-[1.45cqw] text-[#a8a29a]">
              {location && <span>{location}</span>}
              {since && <span>{t("card.since", { date: since })}</span>}
            </div>
            <p className="mt-[1.6cqw] text-[1.6cqw] leading-none font-bold tracking-[0.12em] text-foil-300 tabular-nums">
              {membershipNumber(holder.id)}
            </p>
          </div>

          {/* QR — light plate so a phone camera gets the contrast it needs */}
          <div className="shrink-0 text-center">
            <div className="rounded-[1.4cqw] bg-foil-100 p-[0.9cqw]">
              {/* Plain <img>: a data URL has nothing for next/image to optimise */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={qrDataUrl}
                alt={t("card.qrAlt", { name: holder.name })}
                className="block size-[13cqw]"
              />
            </div>
            <p className="mt-[1cqw] text-[1.05cqw] leading-none font-semibold tracking-[0.14em] text-[#a8a29a] uppercase">
              {t("card.scanToVerify")}
            </p>
          </div>
        </div>

        {/* Footer — slogan, then the signature that authorises the card */}
        <footer className="flex items-end justify-between gap-[3cqw] border-t-[0.1cqw] border-foil-500/22 pt-[2.2cqw]">
          <p className="max-w-[52%] text-[1.5cqw] leading-[1.35] font-semibold text-foil-300/85 italic">
            “{cardBrand.slogan}”
          </p>

          <div className="shrink-0 text-right">
            <p className="font-signature text-[3.4cqw] leading-none text-foil-100">
              {cardBrand.signatureName}
            </p>
            <p className="mt-[0.9cqw] text-[1.1cqw] leading-none font-semibold tracking-[0.18em] text-[#a8a29a] uppercase">
              {t("card.cofounder")}
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
