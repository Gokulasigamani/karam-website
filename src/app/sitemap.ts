import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { routes, caseRoute } from "@/constants/routes";
import { cases } from "@/content/cases";

/**
 * Only real pages belong here — the landing-page anchors in `routes` are the
 * home page under another name, and listing them would ask crawlers to index
 * the same document five times.
 */
const pages: { path: string; priority: number; changeFrequency: Frequency }[] = [
  { path: routes.home, priority: 1, changeFrequency: "weekly" },
  { path: routes.cases, priority: 0.9, changeFrequency: "daily" },
  { path: routes.raiseConcern, priority: 0.9, changeFrequency: "monthly" },
  { path: routes.volunteer, priority: 0.8, changeFrequency: "monthly" },
  { path: routes.announcements, priority: 0.7, changeFrequency: "weekly" },
  { path: routes.about, priority: 0.7, changeFrequency: "monthly" },
  { path: routes.contact, priority: 0.6, changeFrequency: "yearly" },
  { path: routes.privacy, priority: 0.3, changeFrequency: "yearly" },
  { path: routes.terms, priority: 0.3, changeFrequency: "yearly" },
  { path: routes.accessibility, priority: 0.3, changeFrequency: "yearly" },
];

type Frequency = NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    ...pages.map((page) => ({
      url: absolute(page.path),
      lastModified,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    })),
    ...cases.map((record) => ({
      url: absolute(caseRoute(record.id)),
      lastModified,
      changeFrequency: "daily" as const,
      priority: 0.7,
    })),
  ];
}

function absolute(path: string): string {
  return new URL(path, siteConfig.url).toString();
}
