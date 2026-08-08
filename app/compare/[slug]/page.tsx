import Link from "next/link";
import { notFound } from "next/navigation";
import AdSlot from "@/components/AdSlot";
import { getComparisonBySlug, getToolBySlug } from "@/lib/db";

export const dynamic = "force-dynamic";
export const runtime = "edge";

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
          <a
            href={a.website}
            rel="sponsored nofollow"
            target="_blank"
            className="mt-2 inline-block text-[12px] text-brand-600 hover:underline"
          >
            Visit ↗
          </a>
        </div>
        <div className="bg-white rounded-lg border border-black/10 p-3 text-center">
          <p className="font-medium text-[14px] text-ink-900">{b.name}</p>
          <p className="text-[12px] text-ink-400">{b.pricing}</p>
          <a
            href={b.website}
            rel="sponsored nofollow"
            target="_blank"
            className="mt-2 inline-block text-[12px] text-brand-600 hover:underline"
          >
            Visit ↗
          </a>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-black/10 p-4 mt-3">
        <div className="grid grid-cols-3 text-[13px] font-medium text-ink-900 border-b border-black/10 pb-2">
          <div>Factor</div>
          <div>{a.name}</div>
          <div>{b.name}</div>
        </div>
        <StatRow label="Rating" a={`${a.rating}/5`} b={`${b.rating}/5`} />
        <StatRow label="Pricing" a={a.pricing} b={b.pricing} />
        <StatRow label="Best for" a={a.bestFor} b={b.bestFor} />
        <StatRow label="Top pro" a={a.pros[0] ?? "—"} b={b.pros[0] ?? "—"} />
        <StatRow label="Main con" a={a.cons[0] ?? "—"} b={b.cons[0] ?? "—"} />
      </div>

      <div className="my-6">
        <AdSlot className="h-[60px]" />
      </div>

      <p className="text-[13px] text-ink-600">
        Verdict: pick <span className="font-medium text-ink-900">{a.name}</span> if{" "}
        {a.bestFor.toLowerCase()}; choose{" "}
        <span className="font-medium text-ink-900">{b.name}</span> if{" "}
        {b.bestFor.toLowerCase()}. Both are editor-tested.
      </p>
    </div>
  );
}
