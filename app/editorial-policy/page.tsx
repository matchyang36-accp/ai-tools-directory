import Link from "next/link";

export const metadata = {
  title: "Editorial policy",
  description: "How WhichAIUse maintains tool profiles, commercial disclosures and corrections.",
  alternates: { canonical: "/editorial-policy" },
};

export default function EditorialPolicyPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 mt-8">
      <h1 className="text-[20px] font-medium text-ink-900">Editorial policy</h1>
      <div className="mt-3 space-y-5 text-[14px] leading-relaxed text-ink-600">
        <section>
          <h2 className="font-medium text-ink-900">What we publish</h2>
          <p className="mt-1">
            WhichAIUse is a practical directory of AI tools. Tool profiles summarize
            stated product capabilities, intended use cases and limitations so readers
            can create a shortlist before visiting an official product site.
          </p>
        </section>
        <section>
          <h2 className="font-medium text-ink-900">Pricing and availability</h2>
          <p className="mt-1">
            Product plans, access and regional availability change frequently. A
            &ldquo;free plan&rdquo; label means the current directory profile lists a free
            option; it is not a guarantee. Confirm current terms directly with the
            product provider before signing up or paying.
          </p>
        </section>
        <section>
          <h2 className="font-medium text-ink-900">Ratings and claims</h2>
          <p className="mt-1">
            We do not publish user-count claims, aggregate star ratings or performance
            promises unless we can support them with a documented source and method.
            Profiles should help you evaluate fit, not replace your own verification.
          </p>
        </section>
        <section>
          <h2 className="font-medium text-ink-900">Commercial relationships</h2>
          <p className="mt-1">
            Some outbound links may earn a commission. Commercial relationships do not
            determine a tool&apos;s placement, and paid links are marked for search engines.
            Read the full <Link href="/affiliate-disclosure" className="text-brand-600 hover:underline">affiliate disclosure</Link>.
          </p>
        </section>
        <section>
          <h2 className="font-medium text-ink-900">Corrections</h2>
          <p className="mt-1">
            If a profile is outdated or inaccurate, please <Link href="/contact" className="text-brand-600 hover:underline">contact us</Link> with the relevant official source. We review correction requests and update the directory when appropriate.
          </p>
        </section>
      </div>
    </div>
  );
}
