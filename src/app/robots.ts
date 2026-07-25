import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

/**
 * Everything is public and everything should be findable — a case that no
 * search engine can reach is a case fewer people can help with.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: new URL("/sitemap.xml", siteConfig.url).toString(),
    host: siteConfig.url,
  };
}
