import Link from "next/link";
import { notFound } from "next/navigation";
import ToolCard from "@/components/ToolCard";
import CopywritingGuide from "@/components/CopywritingGuide";
import {
  getCategoryBySlug,
  getTools,
  getToolsByCategory,
  getCategoryCount,
} from "@/lib/db";
import { getCategories, isPrimaryTool } from "@/data/tools";
import { hasFreePlan } from "@/lib/content-quality";

type SlugParams = Promise<{ slug: string }>;

export function generateStaticParams() {
  const cats = getCategories().map((c) => ({ slug: c.slug }));
  if (!cats.some((c) => c.slug === "free")) cats.push({ slug: "free" });
  return cats;
}

export async function generateMetadata({ params }: { params: SlugParams }) {
  const { slug } = await params;
  if (slug === "free") {
    return {
      title: "Free AI tools",
      description: "AI tools with a free plan for marketing, SEO and small business workflows.",
      alternates: { canonical: "/categories/free" },
    };
  }
  const cat = await getCategoryBySlug(slug);
  if (!cat) return { title: "Category not found" };
  return {
    title:
      cat.slug === "copywriting"
        ? "AI Writing Tools: Choose by Task and Workflow"
        : cat.slug === "image-design"
          ? "AI Image Tools for Ecommerce Product Photos"
          : `${cat.name} AI tools`,
    description:
      cat.slug === "copywriting"
        ? "Choose AI writing tools for campaign copy, GTM workflows and sourced articles. Compare Jasper, Copy.ai and Writesonic with a practical pilot checklist."
        : cat.slug === "image-design"
          ? "Compare AI image tools for ecommerce product photos, background removal, generated scenes, catalog workflows and reusable marketing designs."
          : cat.description,
    alternates: { canonical: `/categories/${cat.slug}` },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: SlugParams;
}) {
  const { slug } = await params;
  if (slug === "free") {
    const freePlanTools = (await getTools()).filter((tool) =>
      hasFreePlan(tool.pricing),
    );

    return (
      <div className="mx-auto max-w-6xl px-4 mt-8">
        <h1 className="text-[20px] font-medium text-ink-900">Free AI tools</h1>
        <p className="text-[13px] text-ink-600 mt-1 mb-6">
          {freePlanTools.length} tools in our directory currently list a free
          plan. Always confirm limits and terms on the tool&apos;s official site.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {freePlanTools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
        <Link
          href="/categories"
          className="text-[13px] text-brand-600 hover:underline"
        >
          ← Back to all categories
        </Link>
      </div>
    );
  }

  const cat = await getCategoryBySlug(slug);
  if (!cat) notFound();

  const [tools, count] = await Promise.all([
    getToolsByCategory(slug),
    getCategoryCount(slug),
  ]);
  const currentTools = tools.filter((tool) => isPrimaryTool(tool.slug));
  const establishedTools = tools.filter((tool) => !isPrimaryTool(tool.slug));

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

      {cat.slug === "copywriting" ? <CopywritingGuide /> : null}
      {cat.slug === "image-design" ? (
        <section className="mb-6 rounded-xl border border-brand-200 bg-brand-50 p-5">
          <h2 className="text-[17px] font-medium text-ink-900">
            Start with the ecommerce image workflow
          </h2>
          <p className="mt-3 text-[14px] leading-7 text-ink-700">
            For product photos, choose by the job: Photoroom for repeatable
            catalog and batch workflows, Canva for reusable product-image
            templates, Adobe Express for quick cutouts inside a familiar editor,
            and ChatGPT Images for fast concept and scene iteration.
          </p>
          <div className="mt-4 flex flex-wrap gap-2 text-[13px]">
            <Link
              href="/blog/best-ai-background-removers-ecommerce-workflow"
              className="rounded-full border border-brand-200 bg-white px-3 py-1.5 font-medium text-brand-800 hover:bg-brand-100"
            >
              Background remover guide
            </Link>
            <Link
              href="/compare/canva-vs-photoroom"
              className="rounded-full border border-brand-200 bg-white px-3 py-1.5 font-medium text-brand-800 hover:bg-brand-100"
            >
              Canva vs Photoroom
            </Link>
            <Link
              href="/tools/chatgpt-images"
              className="rounded-full border border-brand-200 bg-white px-3 py-1.5 font-medium text-brand-800 hover:bg-brand-100"
            >
              ChatGPT Images
            </Link>
          </div>
        </section>
      ) : null}
      {currentTools.length > 0 && <>
        <h2 className="text-[15px] font-medium text-ink-900 mb-3">Current picks</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentTools.map((t) => (
          <ToolCard key={t.slug} tool={t} />
        ))}
      </div>
      </>}
      {establishedTools.length > 0 && <section className="mt-8">
        <h2 className="text-[15px] font-medium text-ink-900 mb-1">Established alternatives</h2>
        <p className="text-[13px] text-ink-600 mb-3">Still available for comparison; not in the current editorial picks.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {establishedTools.map((t) => (
          <ToolCard key={t.slug} tool={t} />
        ))}
        </div>
      </section>}
    </div>
  );
}
