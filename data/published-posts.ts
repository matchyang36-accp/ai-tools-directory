import type { Review } from "@/data/tools";

// Articles are added here only when their scheduled publication slot arrives.
// Keeping drafts out of this array prevents unpublished URLs from entering the
// static export and sitemap early.
export const publishedPosts: Review[] = [];
