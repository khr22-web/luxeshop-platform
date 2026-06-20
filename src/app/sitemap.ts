import { MetadataRoute } from "next";
import { CATEGORIES } from "@/lib/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://luxeshoplondon.co.uk";
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: "daily", priority: 1.0 },
    { url: `${baseUrl}/search`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/cart`, lastModified: now, changeFrequency: "weekly", priority: 0.5 },
    { url: `${baseUrl}/checkout`, lastModified: now, changeFrequency: "weekly", priority: 0.5 },
    { url: `${baseUrl}/wishlist`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${baseUrl}/login`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${baseUrl}/register`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/shipping`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${baseUrl}/deals`, lastModified: now, changeFrequency: "daily", priority: 0.95 },
    { url: `${baseUrl}/under20`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/privacy`, lastModified: now, changeFrequency: "monthly", priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: now, changeFrequency: "monthly", priority: 0.3 },
  ];

  const categoryPages: MetadataRoute.Sitemap = CATEGORIES.map((cat) => ({
    url: `${baseUrl}/category/${cat.slug}`,
    lastModified: now,
    changeFrequency: "daily" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...categoryPages];
}
