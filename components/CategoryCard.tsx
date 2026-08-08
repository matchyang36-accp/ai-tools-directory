import Link from "next/link";
import type { Category } from "@/data/tools";
import { getCategoryCount } from "@/lib/db";

export default async function CategoryCard({ category }: { category: Category }) {
  const count = await getCategoryCount(category.slug);
  return (
    <Link
      href={`/categories/${category.slug}`}
      className="bg-white rounded-lg border border-black/10 p-4 flex items-center justify-between hover:border-brand-400"
    >
      <div className="flex items-center gap-3">
        <span className="w-6 h-6 rounded-full bg-brand-50" />
        <div>
          <p className="font-medium text-[13px] text-ink-900">{category.name}</p>
          <p className="text-[12px] text-ink-400">{category.tagline}</p>
        </div>
      </div>
      <span className="text-[12px] text-ink-400">{count}</span>
    </Link>
  );
}
