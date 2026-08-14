import Link from "next/link";
import ToolCard from "@/components/ToolCard";
import CategoryCard from "@/components/CategoryCard";
import ComparisonRow from "@/components/ComparisonRow";
import ReviewCard from "@/components/ReviewCard";
import {
  getCategories,
  getFeaturedTools,
  getComparisons,
  getReviews,
  getTools,
} from "@/lib/db";

export default async function HomePage() {
  const [categories, featured, comparisons, reviews, tools] = await Promise.all([
    getCategories(),
    getFeaturedTools(),
    getComparisons(),
    getReviews(),
    getTools(),
  ]);

  return (
    <div className="mx-auto max-w-6xl px-4">
      {/* Hero */}
      <section className="bg-white rounded-xl border border-black/10 mt-6 px-6 py-10 text-center">
        <h1 className="text-[22px] font-medium text-ink-900">
          Find the right AI tool for your marketing
        </h1>
        <p className="text-[13px] text-ink-600 mt-2">
          Hands-on reviews, honest comparisons, and free alternatives
        </p>
        <form
          action="/search"
          method="get"
          className="mt-6 flex justify-center"
        >
          <input
            type="search"
            name="q"
            placeholder={`Search ${tools.length} curated AI tools`}
            className="w-full max-w-[420px] h-[40px] px-4 rounded-full border border-black/15 text-[13px] outline-none focus:border-brand-400"
          />
        </form>
        <div className="mt-4 flex justify-center gap-3">
          <Link
            href="/categories"
            className="h-[32px] px-5 rounded-full border border-brand-600 text-brand-600 text-[13px] font-medium flex items-center hover:bg-brand-50"
          >
            Browse all
          </Link>
          <Link
            href="/categories/free"
            className="h-[32px] px-5 rounded-full bg-brand-600 text-white text-[13px] font-medium flex items-center hover:bg-brand-800"
          >
            Free tools
          </Link>
        </div>
      </section>

      {/* Editor's picks */}
      <section className="mt-8">
        <h2 className="text-[15px] font-medium text-ink-900 mb-3">
          Editor&apos;s picks
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featured.map((t) => (
            <ToolCard key={t.slug} tool={t} />
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="mt-8">
        <h2 className="text-[15px] font-medium text-ink-900 mb-3">
          Browse by category
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {categories.map((c) => (
            <CategoryCard key={c.slug} category={c} />
          ))}
        </div>
      </section>

      {/* Comparisons */}
      <section className="mt-8">
        <h2 className="text-[15px] font-medium text-ink-900 mb-3">
          Popular comparisons
        </h2>
        <div className="space-y-2">
          {comparisons.map((c) => (
            <ComparisonRow key={c.slug} slug={c.slug} />
          ))}
        </div>
      </section>

      {/* Latest reviews */}
      <section className="mt-8">
        <h2 className="text-[15px] font-medium text-ink-900 mb-3">
          Latest reviews
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {reviews.map((r) => (
            <ReviewCard key={r.slug} review={r} />
          ))}
        </div>
      </section>

    </div>
  );
}
