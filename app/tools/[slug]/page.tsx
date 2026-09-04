import Link from "next/link";
import { notFound } from "next/navigation";
import { getToolBySlug, getCategoryBySlug } from "@/lib/db";
import { getTools } from "@/data/tools";
import { absoluteUrl } from "@/lib/site";

export function generateStaticParams() {
  return getTools().map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const t = await getToolBySlug(params.slug);
  if (!t) return { title: "Tool not found" };
  return {
    title: `${t.name} review`,
    description: t.description,
    alternates: { canonical: `/tools/${t.slug}` },
  };
}

export default async function ToolPage({
  params,
}: {
  params: { slug: string };
}) {
  const tool = await getToolBySlug(params.slug);
  if (!tool) notFound();
  const cat = await getCategoryBySlug(tool.category);

  const softwareApplication = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.name,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: absoluteUrl(`/tools/${tool.slug}`),
  };

  return (
    <div className="mx-auto max-w-3xl px-4 mt-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplication) }}
      />

      <nav className="text-[12px] text-ink-400 mb-3">
        <Link href="/categories" className="hover:text-brand-600">
          Categories
        </Link>{" "}
        /{" "}
        <Link href={`/categories/${cat?.slug}`} className="hover:text-brand-600">
          {cat?.name}
        </Link>{" "}
        / {tool.name}
      </nav>

      <div className="bg-white rounded-xl border border-black/10 p-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-lg bg-brand-50 flex items-center justify-center text-brand-600 text-lg font-medium">
            {tool.name.charAt(0)}
          </div>
          <div>
            <h1 className="text-[20px] font-medium text-ink-900">{tool.name}</h1>
            <p className="text-[13px] text-ink-600">{tool.tagline}</p>
          </div>
        </div>

        <p className="text-[13px] text-ink-600 leading-relaxed">
          {tool.description}
        </p>

        <div className="flex flex-wrap gap-4 mt-4 text-[13px]">
          <div>
            <span className="text-ink-400">Pricing: </span>
            <span className="text-ink-900 font-medium">{tool.pricing}</span>
          </div>
          <div>
            <span className="text-ink-400">Best for: </span>
            <span className="text-ink-900">{tool.bestFor}</span>
          </div>
        </div>

        <a
          href={tool.website}
          rel="sponsored nofollow"
          target="_blank"
          className="mt-5 inline-flex h-[36px] px-6 rounded-lg bg-brand-600 text-white text-[13px] font-medium items-center hover:bg-brand-800"
        >
          Visit {tool.name} ↗
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
        <div className="bg-white rounded-lg border border-black/10 p-4">
          <h2 className="text-[14px] font-medium text-ink-900 mb-2">Pros</h2>
          <ul className="text-[13px] text-ink-600 space-y-1 list-disc pl-4">
            {tool.pros.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>
        <div className="bg-white rounded-lg border border-black/10 p-4">
          <h2 className="text-[14px] font-medium text-ink-900 mb-2">Cons</h2>
          <ul className="text-[13px] text-ink-600 space-y-1 list-disc pl-4">
            {tool.cons.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
