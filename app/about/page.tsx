import Link from "next/link";

export const metadata = { title: "About" };

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 mt-8">
      <h1 className="text-[20px] font-medium text-ink-900">About MarketAI</h1>
      <p className="text-[14px] text-ink-600 leading-relaxed mt-3">
        MarketAI is an independent directory of AI tools for marketers, SEOs
        and small-business owners. We test the tools, compare them honestly,
        and surface the free alternatives so you can pick without the hype.
      </p>
      <p className="text-[14px] text-ink-600 leading-relaxed mt-3">
        We may earn a commission if you sign up through some links — it never
        affects our ratings. See our{" "}
        <Link href="/affiliate-disclosure" className="text-brand-600 hover:underline">
          affiliate disclosure
        </Link>
        .
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
