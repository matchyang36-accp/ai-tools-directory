import Link from "next/link";
import CategoryCard from "@/components/CategoryCard";
import { getCategories } from "@/lib/db";

export const metadata = {
  title: "All categories",
  description:
    "Browse AI tools by category — copywriting, SEO, ads, social, email, design, video, chatbots and productivity.",
};

export default async function CategoriesPage() {
  const categories = await getCategories();
  return (
    <div className="mx-auto max-w-6xl px-4 mt-8">
      <h1 className="text-[20px] font-medium text-ink-900 mb-1">Categories</h1>
      <p className="text-[13px] text-ink-600 mb-6">
        Pick a category to see hand-picked AI tools with reviews and pricing.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {categories.map((c) => (
          <CategoryCard key={c.slug} category={c} />
        ))}
        <Link
          href="/categories/free"
          className="bg-white rounded-lg border border-dashed border-brand-400 p-4 flex items-center justify-between hover:bg-brand-50"
        >
          <div className="flex items-center gap-3">
            <span className="w-6 h-6 rounded-full bg-brand-50" />
            <div>
              <p className="font-medium text-[13px] text-ink-900">Free tools</p>
              <p className="text-[12px] text-ink-400">No-cost AI tools</p>
            </div>
          </div>
          <span className="text-[12px] text-ink-400">→</span>
        </Link>
      </div>
    </div>
  );
}
