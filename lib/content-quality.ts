/**
 * Batch posts are preserved for readers, but are not part of the reviewed
 * editorial library yet. Keep this rule in one place so page metadata and the
 * sitemap cannot drift apart.
 */
export function isUnreviewedBatchPost(slug: string): boolean {
  return slug.startsWith("batch100-");
}

/**
 * Pricing changes often. A tool is shown on the free-plan page only when its
 * current profile explicitly says that a free option exists.
 */
export function hasFreePlan(pricing: string): boolean {
  return /\bfree\b/i.test(pricing);
}
