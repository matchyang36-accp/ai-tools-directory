// Static content data-access layer.
//
// Public pages are exported at build time and read from the checked-in data
// module. Runtime D1 access belongs to Cloudflare Pages Functions under
// functions/api/*, where the DB binding is available.

import type { Category, Tool, Review, Comparison } from "@/data/tools";
import * as local from "@/data/tools";

export async function getTools(): Promise<Tool[]> {
  return local.getTools();
}

export async function getToolBySlug(slug: string): Promise<Tool | undefined> {
  return local.getToolBySlug(slug);
}

export async function getCategories(): Promise<Category[]> {
  return local.getCategories();
}

export async function getCategoryBySlug(slug: string): Promise<Category | undefined> {
  return local.getCategoryBySlug(slug);
}

export async function getToolsByCategory(slug: string): Promise<Tool[]> {
  return local.getToolsByCategory(slug);
}

export async function getFeaturedTools(): Promise<Tool[]> {
  return local.getFeaturedTools();
}

export async function getPrimaryTools(): Promise<Tool[]> {
  const allTools = await getTools();
  const bySlug = new Map(allTools.map((tool) => [tool.slug, tool]));
  return local.primaryToolSlugs
    .map((slug) => bySlug.get(slug))
    .filter((tool): tool is Tool => Boolean(tool));
}

export async function getComparisons(): Promise<Comparison[]> {
  return local.getComparisons();
}

export async function getComparisonBySlug(slug: string): Promise<Comparison | undefined> {
  return local.getComparisonBySlug(slug);
}

export async function getReviews(): Promise<Review[]> {
  return local.getReviews();
}

export async function getReviewBySlug(slug: string): Promise<Review | undefined> {
  return local.getReviewBySlug(slug);
}

export async function getCategoryCount(slug: string): Promise<number> {
  return local.getCategoryCount(slug);
}

export async function searchTools(query: string): Promise<Tool[]> {
  const q = query.trim();
  return local.searchTools(q);
}
