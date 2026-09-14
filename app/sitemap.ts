import type { MetadataRoute } from "next";
import { getTools, getCategories, getComparisons, getReviews } from "@/data/tools";
import { absoluteUrlWithTrailingSlash } from "@/lib/site";
import { isIndexableReview } from "@/lib/content-quality";

export const dynamic = "force-static";

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
    "/editorial-policy",
    "/privacy",
  ].map((p) => ({ url: absoluteUrlWithTrailingSlash(p || "/") }));

  const tools = getTools().map((t) => ({
    url: absoluteUrlWithTrailingSlash(`/tools/${t.slug}`),
  }));

  const categories = getCategories().map((c) => ({
    url: absoluteUrlWithTrailingSlash(`/categories/${c.slug}`),
  }));

  const comparisons = getComparisons().map((c) => ({
    url: absoluteUrlWithTrailingSlash(`/compare/${c.slug}`),
  }));

  const reviews = getReviews().filter(isIndexableReview).map((r) => ({
    url: absoluteUrlWithTrailingSlash(`/blog/${r.slug}`),
    lastModified: r.date,
  }));

  return [...staticRoutes, ...tools, ...categories, ...comparisons, ...reviews];
}
