import Link from "next/link";
import { notFound } from "next/navigation";
import { getComparisonBySlug, getToolBySlug } from "@/lib/db";
import { getComparisons } from "@/data/tools";
import OutboundToolLink from "@/components/OutboundToolLink";
import { absoluteUrl } from "@/lib/site";
import { jsonLd } from "@/lib/json-ld";
import { comparisonGuides } from "@/data/comparison-guides";

type SlugParams = Promise<{ slug: string }>;

export function generateStaticParams() {
  return getComparisons().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: SlugParams }) {
  const { slug } = await params;
  const c = await getComparisonBySlug(slug);
  if (!c) return { title: "Comparison not found" };
  const guide = comparisonGuides[c.slug];
  return {
    title: guide?.metaTitle ?? c.title,
    description: guide?.metaDescription ?? `Compare ${c.title} side by side.`,
    alternates: { canonical: `/compare/${c.slug}` },
  };
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
  params: SlugParams;
}) {
  const { slug } = await params;
  const c = await getComparisonBySlug(slug);
  if (!c) notFound();
  const [a, b] = await Promise.all([
    getToolBySlug(c.a),
    getToolBySlug(c.b),
  ]);
  if (!a || !b) notFound();
  const guide = comparisonGuides[c.slug];
  const faqSchema = guide
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: guide.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      }
    : null;

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Comparisons", item: absoluteUrl("/compare") },
      { "@type": "ListItem", position: 3, name: c.title, item: absoluteUrl(`/compare/${c.slug}`) },
    ],
  };

  return (
    <div className="mx-auto max-w-3xl px-4 mt-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbs) }}
      />
      {faqSchema ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema) }}
        />
      ) : null}
      <nav className="text-[12px] text-ink-400 mb-3">
        <Link href="/compare" className="hover:text-brand-600">
          Comparisons
        </Link>{" "}
        / {c.title}
      </nav>
      <h1 className="text-[20px] font-medium text-ink-900">{c.title}</h1>

      {guide?.quickAnswers?.length ? (
        <section className="mt-5 rounded-lg border border-brand-200 bg-brand-50 p-4">
          <h2 className="text-[16px] font-medium text-ink-900">
            Quick answer
          </h2>
          <div className="mt-3 space-y-3">
            {guide.quickAnswers.map((answer) => (
              <p key={answer.label} className="text-[14px] leading-6 text-ink-700">
                <span className="font-medium text-ink-900">{answer.label}:</span>{" "}
                {answer.text}
              </p>
            ))}
          </div>
        </section>
      ) : null}

      <div className="grid grid-cols-3 gap-3 mt-5">
        <div className="col-span-1" />
        <div className="bg-white rounded-lg border border-black/10 p-3 text-center">
          <p className="font-medium text-[14px] text-ink-900">{a.name}</p>
          <p className="text-[12px] text-ink-400">
            {guide?.pricingLabels?.a ?? a.pricing}
          </p>
          <OutboundToolLink
            href={a.website}
            toolSlug={a.slug}
            rel="sponsored nofollow"
            target="_blank"
            className="mt-2 inline-block text-[12px] text-brand-600 hover:underline"
          >
            Visit ↗
          </OutboundToolLink>
          <Link
            href={`/tools/${a.slug}`}
            className="mt-2 block text-[12px] text-brand-700 hover:underline"
          >
            Read {a.name} guide →
          </Link>
        </div>
        <div className="bg-white rounded-lg border border-black/10 p-3 text-center">
          <p className="font-medium text-[14px] text-ink-900">{b.name}</p>
          <p className="text-[12px] text-ink-400">
            {guide?.pricingLabels?.b ?? b.pricing}
          </p>
          <OutboundToolLink
            href={b.website}
            toolSlug={b.slug}
            rel="sponsored nofollow"
            target="_blank"
            className="mt-2 inline-block text-[12px] text-brand-600 hover:underline"
          >
            Visit ↗
          </OutboundToolLink>
          <Link
            href={`/tools/${b.slug}`}
            className="mt-2 block text-[12px] text-brand-700 hover:underline"
          >
            Read {b.name} guide →
          </Link>
        </div>
      </div>

      {guide?.decisionRows?.length ? (
        <section className="mt-3 rounded-lg border border-black/10 bg-white">
          <h2 className="px-4 pt-4 text-[16px] font-medium text-ink-900">
            Decision table
          </h2>
          <div className="space-y-4 p-4 sm:hidden">
            {guide.decisionRows.map((row) => (
              <div key={row.factor} className="border-b border-black/10 pb-4 last:border-b-0 last:pb-0">
                <h3 className="text-[13px] font-medium text-ink-900">{row.factor}</h3>
                <div className="mt-3 grid gap-3">
                  <div className="rounded-md border border-black/10 p-3">
                    <p className="text-[12px] font-medium text-ink-900">{a.name}</p>
                    <p className="mt-1 text-[13px] leading-6 text-ink-700">{row.a}</p>
                  </div>
                  <div className="rounded-md border border-black/10 p-3">
                    <p className="text-[12px] font-medium text-ink-900">{b.name}</p>
                    <p className="mt-1 text-[13px] leading-6 text-ink-700">{row.b}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="hidden p-4 sm:block">
            <div className="grid grid-cols-[150px_1fr_1fr] border-b border-black/10 pb-2 text-[13px] font-medium text-ink-900">
              <div>Factor</div>
              <div>{a.name}</div>
              <div>{b.name}</div>
            </div>
            {guide.decisionRows.map((row) => (
              <div
                key={row.factor}
                className="grid grid-cols-[150px_1fr_1fr] gap-4 border-b border-black/10 py-3 text-[13px] leading-6 last:border-b-0"
              >
                <div className="font-medium text-ink-700">{row.factor}</div>
                <div className="text-ink-700">{row.a}</div>
                <div className="text-ink-700">{row.b}</div>
              </div>
            ))}
          </div>
        </section>
      ) : (
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
      )}

      <p className="text-[13px] text-ink-600 mt-6">
        Use this as a starting point, then verify the current pricing, product
        limits, and terms on each provider&apos;s official site before choosing.
        Tool fit depends on your workflow and requirements; this page does not
        present lab scores or performance guarantees.
      </p>

      {guide ? (
        <section className="mt-10 space-y-8">
          {!guide.quickAnswers?.length ? (
            <div className="rounded-xl border border-brand-200 bg-brand-50 p-5">
              <h2 className="text-[18px] font-medium text-ink-900">
                How to choose between {a.name} and {b.name}
              </h2>
              <p className="mt-3 text-[14px] leading-7 text-ink-700">
                {guide.summary}
              </p>
            </div>
          ) : null}

          {guide.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-[18px] font-medium text-ink-900">
                {section.heading}
              </h2>
              <div className="mt-3 space-y-3 text-[14px] leading-7 text-ink-700">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              {section.bullets?.length ? (
                <ul className="mt-3 list-disc space-y-2 pl-5 text-[14px] leading-7 text-ink-700">
                  {section.bullets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}

          <section>
            <h2 className="text-[18px] font-medium text-ink-900">Frequently asked questions</h2>
            <div className="mt-3 space-y-4">
              {guide.faqs.map((faq) => (
                <div key={faq.question} className="rounded-lg border border-black/10 bg-white p-4">
                  <h3 className="text-[14px] font-medium text-ink-900">{faq.question}</h3>
                  <p className="mt-2 text-[14px] leading-7 text-ink-700">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          {guide.relatedLinks?.length ? (
            <nav aria-label="Related writing guides" className="space-y-2">
              <h2 className="text-[16px] font-medium text-ink-900">Related guides</h2>
              <ul className="list-disc pl-5 text-[14px] leading-7 text-brand-700">
                {guide.relatedLinks.map((link) => (
                  <li key={link.href}><Link href={link.href} className="hover:underline">{link.label}</Link></li>
                ))}
              </ul>
            </nav>
          ) : null}
          <section className="border-t border-black/10 pt-6">
            <h2 className="text-[16px] font-medium text-ink-900">Official sources to verify</h2>
            <p className="mt-2 text-[13px] leading-6 text-ink-600">
              Product capabilities and plans change. The workflow notes above were checked against these official sources in September 2026; confirm current terms before purchasing.
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-[13px] text-brand-700">
              {guide.sources.map((source) => (
                <li key={source.href}>
                  <a href={source.href} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    {source.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </section>
      ) : null}
    </div>
  );
}
