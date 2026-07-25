import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  images: {
    // Placeholder photography. Swap these for your own asset host (or move the
    // images into /public and drop this block) once real photos land.
    remotePatterns: [{ protocol: "https", hostname: "picsum.photos" }],
  },
};

// Reads the active locale + messages from src/i18n/request.ts.
const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
