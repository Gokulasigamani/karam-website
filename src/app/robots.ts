import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

/**
 * Everything is public and everything should be findable — a case that no
 * search engine can reach is a case fewer people can help with.
 *
 * The exception is the membership-card pages. They are reachable without a
 * session because a scanned card has to work for whoever holds it, but "anyone
 * with the link" is not the same as "listed in search results": a crawl would
 * turn them into a directory of members' names and districts. The pages carry
 * `robots: noindex` in their metadata as well, since a disallow only stops
 * well-behaved crawlers from fetching.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/verify/", "/api/"],
    },
    sitemap: new URL("/sitemap.xml", siteConfig.url).toString(),
    host: siteConfig.url,
  };
}
