import Link from "next/link";
import ComparisonRow from "@/components/ComparisonRow";
import { getComparisons } from "@/lib/db";

export const dynamic = "force-dynamic";
export const runtime = "edge";

export const metadata = {
  title: "Tool comparisons",
  description:
    "Head-to-head comparisons of the most popular AI marketing tools — features, pricing and which to pick.",
};

export default async function CompareIndex() {
  const comparisons = await getComparisons();
  return (
    <div className="mx-auto max-w-3xl px-4 mt-8">
      <h1 className="text-[20px] font-medium text-ink-900">Comparisons</h1>
      <p className="text-[13px] text-ink-600 mt-1 mb-6">
        Unsure which tool to pick? See them head-to-head.
      </p>
      <div className="space-y-2">
        {comparisons.map((c) => (
          <ComparisonRow key={c.slug} slug={c.slug} />
        ))}
      </div>
    </div>
  );
}
