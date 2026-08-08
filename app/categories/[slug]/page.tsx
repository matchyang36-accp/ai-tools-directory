import Link from "next/link";
import { notFound } from "next/navigation";
import ToolCard from "@/components/ToolCard";
import AdSlot from "@/components/AdSlot";
import {
  getCategoryBySlug,
  getToolsByCategory,
  getCategoryCount,
} from "@/lib/db";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  if (params.slug === "free") {
    return {
      title: "Free AI tools",
      description: "No-cost AI tools for marketing, SEO and small business.",
    };
  }
  const cat = await getCategoryBySlug(params.slug);
  if (!cat) return { title: "Category not found" };
  return { title: `${cat.name} AI tools`, description: cat.description };
}

export default async function CategoryPage({
  params,
}: {
  params: { slug: string };
}) {
  if (params.slug === "free") {
    return (
      <div className="mx-auto max-w-6xl px-4 mt-8">
        <h1 className="text-[20px] font-medium text-ink-900">Free AI tools</h1>
        <p className="text-[13px] text-ink-600 mt-1 mb-6">
          A curated list of no-cost AI tools is on the way. Most tools above
          also offer a free plan — open any tool for details.
        </p>
        <Link
          href="/categories"
          className="text-[13px] text-brand-600 hover:underline"
        >
          ← Back to all categories
        </Link>
      </div>
    );
  }

  const cat = await getCategoryBySlug(params.slug);
  if (!cat) notFound();

  const [tools, count] = await Promise.all([
    getToolsByCategory(params.slug),
    getCategoryCount(params.slug),
  ]);

  return (
    <div className="mx-auto max-w-6xl px-4 mt-8">
      <nav className="text-[12px] text-ink-400 mb-2">
        <Link href="/categories" className="hover:text-brand-600">
          Categories
        </Link>{" "}
        / {cat.name}
      </nav>
      <h1 className="text-[20px] font-medium text-ink-900">{cat.name}</h1>
      <p className="text-[13px] text-ink-600 mt-1 mb-5">
        {cat.description} ({count} tools)
      </p>

      <div className="mb-6">
        <AdSlot className="h-[60px]" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tools.map((t) => (
          <ToolCard key={t.slug} tool={t} />
        ))}
      </div>
    </div>
  );
}
