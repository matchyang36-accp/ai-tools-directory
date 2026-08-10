import type { MetadataRoute } from "next";
import { getTools, getCategories, getComparisons, getReviews } from "@/data/tools";

// Replace with your real domain before going live.
const BASE_URL = "https://marketai.example.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/categories",
    "/compare",
    "/blog",
    "/search",
    "/submit",
    "/about",
    "/contact",
    "/affiliate-disclosure",
    "/privacy",
  ].map((p) => ({
    url: `${BASE_URL}${p}`,
    lastModified: new Date(),
  }));

  const tools = getTools().map((t) => ({
    url: `${BASE_URL}/tools/${t.slug}`,
    lastModified: new Date(),
  }));

  const categories = getCategories().map((c) => ({
    url: `${BASE_URL}/categories/${c.slug}`,
    lastModified: new Date(),
  }));

  const comparisons = getComparisons().map((c) => ({
    url: `${BASE_URL}/compare/${c.slug}`,
    lastModified: new Date(),
  }));

  const reviews = getReviews().map((r) => ({
    url: `${BASE_URL}/blog/${r.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...tools, ...categories, ...comparisons, ...reviews];
}
