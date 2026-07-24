import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Placeholder photography. Swap these for your own asset host (or move the
    // images into /public and drop this block) once real photos land.
    remotePatterns: [{ protocol: "https", hostname: "picsum.photos" }],
  },
};

export default nextConfig;
