import type { MetadataRoute } from "next";
import { getTools, getCategories, getComparisons, getReviews } from "@/data/tools";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/categories",
    "/categories/free",
    "/compare",
    "/blog",
    "/search",
    "/submit",
    "/about",
    "/contact",
    "/affiliate-disclosure",
    "/privacy",
  ].map((p) => ({
    url: absoluteUrl(p || "/"),
    lastModified: new Date(),
  }));

  const tools = getTools().map((t) => ({
    url: absoluteUrl(`/tools/${t.slug}`),
    lastModified: new Date(),
  }));

  const categories = getCategories().map((c) => ({
    url: absoluteUrl(`/categories/${c.slug}`),
    lastModified: new Date(),
  }));

  const comparisons = getComparisons().map((c) => ({
    url: absoluteUrl(`/compare/${c.slug}`),
    lastModified: new Date(),
  }));

  const reviews = getReviews().map((r) => ({
    url: absoluteUrl(`/blog/${r.slug}`),
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...tools, ...categories, ...comparisons, ...reviews];
}
