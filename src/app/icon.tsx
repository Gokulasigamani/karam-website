import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/** The browser-tab favicon: the Karam mark on lime. Replaces the framework default. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#c3f53c",
          borderRadius: 14,
        }}
      >
        <svg width="44" height="44" viewBox="0 0 32 32">
          {[0, 45, 90, 135].map((angle) => (
            <ellipse
              key={angle}
              cx="16"
              cy="16"
              rx="4.4"
              ry="13"
              fill="#0a0a0a"
              transform={`rotate(${angle} 16 16)`}
            />
          ))}
          <circle cx="16" cy="16" r="4" fill="#c3f53c" />
        </svg>
      </div>
    ),
    { ...size },
  );
}
