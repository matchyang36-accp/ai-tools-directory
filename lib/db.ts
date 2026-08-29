// Unified data-access layer.
//
// In the Cloudflare Workers runtime (deployed via @cloudflare/next-on-pages)
// data is read from the D1 binding `DB`. Locally (next dev / next build / next start)
// no binding is present, so we transparently fall back to the static seed module
// (data/tools.ts). Pages and the /api/search route only ever call the async getters
// exported below — that is the only contract they depend on.

import type { Category, Tool, Review, Comparison } from "@/data/tools";
import * as local from "@/data/tools";

// Loose D1 typing so we don't have to pull in @cloudflare/workers-types.
interface D1Stmt {
  bind(...params: any[]): D1Stmt;
  all(): Promise<{ results: any[] }>;
  first(): Promise<any>;
  run(): Promise<any>;
}
interface D1DB {
  prepare(query: string): D1Stmt;
}

let dbCache: D1DB | null | undefined;

async function getDB(): Promise<D1DB | null> {
  if (dbCache !== undefined) return dbCache;
  dbCache = null;
  try {
    const mod: any = await import("@cloudflare/next-on-pages");
    const ctx: any = mod.getRequestContext();
    if (ctx?.env?.DB) dbCache = ctx.env.DB as D1DB;
  } catch {
    // Not in a Workers runtime (local dev / build) — fall back to static data.
  }
  return dbCache;
}

function safeJson(v: any, fallback: any) {
  try {
    return typeof v === "string" ? JSON.parse(v) : v ?? fallback;
  } catch {
    return fallback;
  }
}

function rowToTool(r: any): Tool {
  return {
    slug: r.slug,
    name: r.name,
    category: r.category,
    tagline: r.tagline,
    description: r.description,
    pricing: r.pricing,
    rating: Number(r.rating),
    pros: safeJson(r.pros, []),
    cons: safeJson(r.cons, []),
    website: r.website,
    featured: !!r.featured,
    bestFor: r.bestFor,
  };
}

// ---- Getters (the contract pages depend on) ----

export async function getTools(): Promise<Tool[]> {
  const db = await getDB();
  if (!db) return local.getTools();
  const { results } = await db.prepare("SELECT * FROM tools ORDER BY name").all();
  return results.map(rowToTool);
}

export async function getToolBySlug(slug: string): Promise<Tool | undefined> {
  const db = await getDB();
  if (!db) return local.getToolBySlug(slug);
  const row = await db.prepare("SELECT * FROM tools WHERE slug = ?").bind(slug).first();
  return row ? rowToTool(row) : undefined;
}

export async function getCategories(): Promise<Category[]> {
  const db = await getDB();
  if (!db) return local.getCategories();
  const { results } = await db.prepare("SELECT * FROM categories ORDER BY name").all();
  return results as Category[];
}

export async function getCategoryBySlug(slug: string): Promise<Category | undefined> {
  const db = await getDB();
  if (!db) return local.getCategoryBySlug(slug);
  return db.prepare("SELECT * FROM categories WHERE slug = ?").bind(slug).first();
}

export async function getToolsByCategory(slug: string): Promise<Tool[]> {
  const db = await getDB();
  if (!db) return local.getToolsByCategory(slug);
  const { results } = await db
    .prepare("SELECT * FROM tools WHERE category = ? ORDER BY name")
    .bind(slug)
    .all();
  return results.map(rowToTool);
}

export async function getFeaturedTools(): Promise<Tool[]> {
  const db = await getDB();
  if (!db) return local.getFeaturedTools();
  const { results } = await db.prepare("SELECT * FROM tools WHERE featured = 1 ORDER BY name").all();
  return results.map(rowToTool);
}

export async function getPrimaryTools(): Promise<Tool[]> {
  const allTools = await getTools();
  const bySlug = new Map(allTools.map((tool) => [tool.slug, tool]));
  return local.primaryToolSlugs
    .map((slug) => bySlug.get(slug))
    .filter((tool): tool is Tool => Boolean(tool));
}

export async function getComparisons(): Promise<Comparison[]> {
  const db = await getDB();
  if (!db) return local.getComparisons();
  const { results } = await db.prepare("SELECT * FROM comparisons ORDER BY title").all();
  return results as Comparison[];
}

export async function getComparisonBySlug(slug: string): Promise<Comparison | undefined> {
  const db = await getDB();
  if (!db) return local.getComparisonBySlug(slug);
  return db.prepare("SELECT * FROM comparisons WHERE slug = ?").bind(slug).first();
}

export async function getReviews(): Promise<Review[]> {
  const db = await getDB();
  if (!db) return local.getReviews();
  const { results } = await db.prepare("SELECT * FROM reviews ORDER BY date DESC").all();
  return results as Review[];
}

export async function getReviewBySlug(slug: string): Promise<Review | undefined> {
  const db = await getDB();
  if (!db) return local.getReviewBySlug(slug);
  return db.prepare("SELECT * FROM reviews WHERE slug = ?").bind(slug).first();
}

export async function getCategoryCount(slug: string): Promise<number> {
  const db = await getDB();
  if (!db) return local.getCategoryCount(slug);
  const row = await db
    .prepare("SELECT COUNT(*) AS c FROM tools WHERE category = ?")
    .bind(slug)
    .first();
  return Number(row?.c ?? 0);
}

export async function searchTools(query: string): Promise<Tool[]> {
  const q = query.trim();
  const db = await getDB();
  if (!db) return local.searchTools(q);
  if (!q) return [];
  const like = `%${q.toLowerCase()}%`;
  const { results } = await db
    .prepare(
      "SELECT * FROM tools WHERE lower(name) LIKE ? OR lower(tagline) LIKE ? OR lower(description) LIKE ? OR lower(category) LIKE ? ORDER BY name"
    )
    .bind(like, like, like, like)
    .all();
  return results.map(rowToTool);
}
