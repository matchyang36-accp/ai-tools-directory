import Link from "next/link";
import { notFound } from "next/navigation";
import { getComparisonBySlug, getToolBySlug } from "@/lib/db";
import { getComparisons } from "@/data/tools";
import OutboundToolLink from "@/components/OutboundToolLink";

export function generateStaticParams() {
  return getComparisons().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const c = await getComparisonBySlug(params.slug);
  if (!c) return { title: "Comparison not found" };
  return { title: c.title, description: `Compare ${c.title} side by side.` };
}

function StatRow({ label, a, b }: { label: string; a: string; b: string }) {
  return (
    <div className="grid grid-cols-3 border-b border-black/10 py-2 text-[13px]">
      <div className="text-ink-400">{label}</div>
      <div className="text-ink-900">{a}</div>
      <div className="text-ink-900">{b}</div>
    </div>
  );
}

export default async function CompareDetail({
  params,
}: {
  params: { slug: string };
}) {
  const c = await getComparisonBySlug(params.slug);
  if (!c) notFound();
  const [a, b] = await Promise.all([
    getToolBySlug(c.a),
    getToolBySlug(c.b),
  ]);
  if (!a || !b) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 mt-8">
      <nav className="text-[12px] text-ink-400 mb-3">
        <Link href="/compare" className="hover:text-brand-600">
          Comparisons
        </Link>{" "}
        / {c.title}
      </nav>
      <h1 className="text-[20px] font-medium text-ink-900">{c.title}</h1>

      <div className="grid grid-cols-3 gap-3 mt-5">
        <div className="col-span-1" />
        <div className="bg-white rounded-lg border border-black/10 p-3 text-center">
          <p className="font-medium text-[14px] text-ink-900">{a.name}</p>
          <p className="text-[12px] text-ink-400">{a.pricing}</p>
          <OutboundToolLink
            href={a.website}
            toolSlug={a.slug}
            rel="sponsored nofollow"
            target="_blank"
            className="mt-2 inline-block text-[12px] text-brand-600 hover:underline"
          >
            Visit ↗
          </OutboundToolLink>
        </div>
        <div className="bg-white rounded-lg border border-black/10 p-3 text-center">
          <p className="font-medium text-[14px] text-ink-900">{b.name}</p>
          <p className="text-[12px] text-ink-400">{b.pricing}</p>
          <OutboundToolLink
            href={b.website}
            toolSlug={b.slug}
            rel="sponsored nofollow"
            target="_blank"
            className="mt-2 inline-block text-[12px] text-brand-600 hover:underline"
          >
            Visit ↗
          </OutboundToolLink>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-black/10 p-4 mt-3">
        <div className="grid grid-cols-3 text-[13px] font-medium text-ink-900 border-b border-black/10 pb-2">
          <div>Factor</div>
          <div>{a.name}</div>
          <div>{b.name}</div>
        </div>
        <StatRow label="Pricing" a={a.pricing} b={b.pricing} />
        <StatRow label="Suggested use case" a={a.bestFor} b={b.bestFor} />
        <StatRow label="Potential strength" a={a.pros[0] ?? "—"} b={b.pros[0] ?? "—"} />
        <StatRow label="Potential limitation" a={a.cons[0] ?? "—"} b={b.cons[0] ?? "—"} />
      </div>

      <p className="text-[13px] text-ink-600 mt-6">
        Use this as a starting point, then verify the current pricing, product
        limits, and terms on each provider&apos;s official site before choosing.
        Tool fit depends on your workflow and requirements; this page does not
        present lab scores or performance guarantees.
      </p>
    </div>
  );
}
