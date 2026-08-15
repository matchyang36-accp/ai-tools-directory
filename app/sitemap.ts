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
    "/submit",
    "/about",
    "/contact",
    "/affiliate-disclosure",
    "/privacy",
  ].map((p) => ({ url: absoluteUrl(p || "/") }));

  const tools = getTools().map((t) => ({
    url: absoluteUrl(`/tools/${t.slug}`),
  }));

  const categories = getCategories().map((c) => ({
    url: absoluteUrl(`/categories/${c.slug}`),
  }));

  const comparisons = getComparisons().map((c) => ({
    url: absoluteUrl(`/compare/${c.slug}`),
  }));

  const reviews = getReviews().map((r) => ({
    url: absoluteUrl(`/blog/${r.slug}`),
    lastModified: r.date,
  }));

  return [...staticRoutes, ...tools, ...categories, ...comparisons, ...reviews];
}
