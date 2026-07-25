import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** The card social platforms show when a Karam link is shared. Branded, so it
 *  never falls back to a blank preview. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "100px",
          background: "#0b0b0d",
          color: "#f4f4f5",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "30px" }}>
          <svg width="92" height="92" viewBox="0 0 32 32">
            {[0, 45, 90, 135].map((angle) => (
              <ellipse
                key={angle}
                cx="16"
                cy="16"
                rx="4.4"
                ry="13"
                fill="#c3f53c"
                transform={`rotate(${angle} 16 16)`}
              />
            ))}
            <circle cx="16" cy="16" r="4" fill="#0b0b0d" />
          </svg>
          <span style={{ fontSize: 92, fontWeight: 800, letterSpacing: "-0.04em" }}>
            {siteConfig.name}
          </span>
        </div>

        <div style={{ fontSize: 52, fontWeight: 800, marginTop: 56, maxWidth: 940, lineHeight: 1.1 }}>
          {siteConfig.tagline}
        </div>

        <div style={{ fontSize: 28, color: "#a1a1aa", marginTop: 26, maxWidth: 860, lineHeight: 1.45 }}>
          A concern raised by one person reaches the desk that can resolve it.
        </div>
      </div>
    ),
    { ...size },
  );
}
