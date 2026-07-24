/**
 * Site-wide identity. Metadata, header, footer and OG tags all read from here,
 * so the name/description/URL is written once.
 */
export const siteConfig = {
  name: "Karam",
  tagline: "Together For Those Who Need It",
  description:
    "Karam connects neighbours, volunteers and government officials across the state — so a concern raised by one person reaches the desk that can actually resolve it.",
  url: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  ogImage: "/opengraph-image.png",
  locale: "en",
  links: {
    instagram: "#",
    facebook: "#",
    twitter: "#",
    linkedin: "#",
  },
} as const;

export type SiteConfig = typeof siteConfig;
