import { siteConfig } from "@/config/site";
import { cardInk, cardPixelSize, foil } from "../lib/card-theme";
import { cardBrand, holderLocation, membershipNumber } from "../lib/card-fields";
import type { CardHolder } from "../types";

/**
 * The same card as `components/premium-card.tsx`, rebuilt for Satori (the
 * renderer behind `next/og`).
 *
 * It is a deliberate second copy rather than a shared component. Satori supports
 * no Tailwind, no CSS variables, no `cqw` units, no `ring`/`mask`/`filter`, and
 * only flexbox — so the two renderers cannot share markup without crippling the
 * browser version. Both read their colours from `lib/card-theme.ts` and their
 * text from `lib/card-fields.ts`, which is where the two are actually kept in
 * step; the pixel values below are the `cqw` figures resolved against a 1400px
 * card (1cqw = 14px).
 *
 * Anything changed here should be changed there, and the reverse.
 */

/** Labels the caller resolves through next-intl, since Satori runs outside React context. */
export interface CardImageLabels {
  role: string;
  cardLabel: string;
  holderLabel: string;
  since: string | null;
  scanToVerify: string;
  cofounder: string;
}

const { width, height } = cardPixelSize;

export function CardImage({
  holder,
  qrDataUrl,
  labels,
}: {
  holder: CardHolder;
  qrDataUrl: string;
  labels: CardImageLabels;
}) {
  const location = holderLocation(holder);
  const inset = 22;

  return (
    <div
      style={{
        width,
        height,
        display: "flex",
        position: "relative",
        color: cardInk.bright,
        backgroundImage: `linear-gradient(118deg, ${cardInk.raised} 0%, ${cardInk.base} 46%, #100e0c 72%, #1a1613 100%)`,
      }}
    >
      {/* Foil blooms. Satori has no `filter: blur`, so these are soft radial
          gradients instead — same effect, different mechanism. */}
      <div
        style={{
          position: "absolute",
          top: -160,
          left: -110,
          width: 900,
          height: 900,
          backgroundImage: `radial-gradient(circle, ${foil[500]}33 0%, ${foil[500]}00 62%)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          right: -170,
          bottom: -230,
          width: 820,
          height: 820,
          backgroundImage: `radial-gradient(circle, ${foil[700]}3d 0%, ${foil[700]}00 60%)`,
        }}
      />
      {/* Engine-turned rules */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.09,
          backgroundImage: `repeating-linear-gradient(72deg, ${foil[500]} 0px, ${foil[500]} 1.4px, transparent 1.4px, transparent 15.4px)`,
        }}
      />
      {/* Inner foil hairline */}
      <div
        style={{
          position: "absolute",
          top: inset,
          right: inset,
          bottom: inset,
          left: inset,
          borderRadius: 20,
          border: `1.4px solid ${foil[500]}47`,
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          padding: 56,
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 21 }}>
            <svg width="45" height="45" viewBox="0 0 32 32">
              {[0, 45, 90, 135].map((angle) => (
                <ellipse
                  key={angle}
                  cx="16"
                  cy="16"
                  rx="4.4"
                  ry="13"
                  fill={foil[500]}
                  transform={`rotate(${angle} 16 16)`}
                />
              ))}
              <circle cx="16" cy="16" r="4" fill={cardInk.base} />
            </svg>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: 38, fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1 }}>
                {siteConfig.name}
              </div>
              <div
                style={{
                  fontSize: 16,
                  fontWeight: 600,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: `${foil[300]}b3`,
                  marginTop: 10,
                  lineHeight: 1,
                }}
              >
                {cardBrand.org}
              </div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
            <div
              style={{
                display: "flex",
                borderRadius: 999,
                padding: "11px 28px",
                fontSize: 17,
                fontWeight: 700,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: cardInk.base,
                backgroundImage: `linear-gradient(100deg, ${foil[100]}, ${foil[500]} 52%, ${foil[700]})`,
              }}
            >
              {labels.role}
            </div>
            <div
              style={{
                fontSize: 15,
                fontWeight: 600,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: cardInk.dim,
                marginTop: 15,
              }}
            >
              {labels.cardLabel}
            </div>
          </div>
        </div>

        {/* Holder */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontSize: 16,
                fontWeight: 600,
                letterSpacing: "0.24em",
                textTransform: "uppercase",
                color: `${foil[300]}bf`,
              }}
            >
              {labels.holderLabel}
            </div>
            <div
              style={{
                fontSize: 70,
                fontWeight: 800,
                letterSpacing: "-0.035em",
                lineHeight: 1.05,
                marginTop: 18,
                maxWidth: 880,
              }}
            >
              {holder.name}
            </div>
            <div
              style={{
                display: "flex",
                gap: 28,
                fontSize: 20,
                color: cardInk.dim,
                marginTop: 18,
              }}
            >
              {location ? <span>{location}</span> : null}
              {labels.since ? <span>{labels.since}</span> : null}
            </div>
            <div
              style={{
                fontSize: 22,
                fontWeight: 700,
                letterSpacing: "0.12em",
                color: foil[300],
                marginTop: 22,
              }}
            >
              {membershipNumber(holder.id)}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ display: "flex", borderRadius: 20, padding: 13, background: foil[100] }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={qrDataUrl} alt="" width={182} height={182} />
            </div>
            <div
              style={{
                fontSize: 15,
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: cardInk.dim,
                marginTop: 14,
              }}
            >
              {labels.scanToVerify}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            borderTop: `1.4px solid ${foil[500]}38`,
            paddingTop: 31,
          }}
        >
          <div
            style={{
              fontSize: 21,
              fontWeight: 600,
              fontStyle: "italic",
              lineHeight: 1.35,
              color: `${foil[300]}d9`,
              maxWidth: 680,
            }}
          >
            {`“${cardBrand.slogan}”`}
          </div>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
            <div
              style={{
                fontFamily: "Dancing Script",
                fontSize: 52,
                lineHeight: 1,
                color: foil[100],
              }}
            >
              {cardBrand.signatureName}
            </div>
            <div
              style={{
                fontSize: 15,
                fontWeight: 600,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: cardInk.dim,
                marginTop: 13,
              }}
            >
              {labels.cofounder}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
