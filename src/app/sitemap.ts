import type { MetadataRoute } from "next";
import { services, localServices } from "@/data/services";
import { cities } from "@/data/locations";
import { articles } from "@/data/articles";
import { absUrl } from "@/lib/seo";

/**
 * Dynamic sitemap covering every indexable route:
 * static pages, service pages, local service×city pages, and articles.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: absUrl("/"), changeFrequency: "weekly", priority: 1.0, lastModified: now },
    { url: absUrl("/quote"), changeFrequency: "monthly", priority: 0.95, lastModified: now },
    { url: absUrl("/about"), changeFrequency: "monthly", priority: 0.7, lastModified: now },
    { url: absUrl("/contact"), changeFrequency: "monthly", priority: 0.7, lastModified: now },
    { url: absUrl("/learn"), changeFrequency: "weekly", priority: 0.8, lastModified: now },
    { url: absUrl("/calculators"), changeFrequency: "monthly", priority: 0.6, lastModified: now },
  ];

  const servicePages: MetadataRoute.Sitemap = services.map((s) => ({
    url: absUrl(`/${s.slug}`),
    changeFrequency: "monthly",
    priority: s.priority <= 4 ? 0.9 : 0.8,
    lastModified: now,
  }));

  const localPages: MetadataRoute.Sitemap = localServices.flatMap((s) =>
    cities.map((c) => ({
      url: absUrl(`/${s.slug}/${c.slug}`),
      changeFrequency: "monthly" as const,
      priority: 0.7,
      lastModified: now,
    })),
  );

  const articlePages: MetadataRoute.Sitemap = articles.map((a) => ({
    url: absUrl(`/learn/${a.slug}`),
    changeFrequency: "monthly",
    priority: 0.65,
    lastModified: new Date(a.dateModified ?? a.datePublished),
  }));

  return [...staticPages, ...servicePages, ...localPages, ...articlePages];
}
