import Link from "next/link";

export const metadata = { title: "Affiliate disclosure" };

export default function DisclosurePage() {
  return (
    <div className="mx-auto max-w-2xl px-4 mt-8">
      <h1 className="text-[20px] font-medium text-ink-900">
        Affiliate disclosure
      </h1>
      <p className="text-[14px] text-ink-600 leading-relaxed mt-3">
        WhichAIUse participates in affiliate programs with some of the tools we
        list. This means we may earn a commission — at no extra cost to you — if
        you click a &ldquo;Visit&rdquo; link and purchase a plan.
      </p>
      <p className="text-[14px] text-ink-600 leading-relaxed mt-3">
        Affiliate relationships do not determine a tool&apos;s placement in this
        directory. We disclose commercial relationships so readers can make an
        informed choice before visiting a third-party product site.
      </p>
      <Link
        href="/"
        className="inline-block mt-6 text-[13px] text-brand-600 hover:underline"
      >
        ← Back home
      </Link>
    </div>
  );
}
