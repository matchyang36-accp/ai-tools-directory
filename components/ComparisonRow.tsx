import Link from "next/link";
import { getComparisonBySlug } from "@/lib/db";

export default async function ComparisonRow({ slug }: { slug: string }) {
  const c = await getComparisonBySlug(slug);
  if (!c) return null;
  return (
    <Link
      href={`/compare/${slug}`}
      className="block bg-white rounded-lg border border-black/10 px-4 py-3 flex items-center justify-between hover:border-brand-400"
    >
      <span className="text-[13px] text-ink-900">{c.title}</span>
      <span className="text-[12px] text-brand-600">Compare</span>
    </Link>
  );
}
