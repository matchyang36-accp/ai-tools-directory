import Link from "next/link";
import { notFound } from "next/navigation";
import { getToolBySlug, getCategoryBySlug } from "@/lib/db";
import { getTools } from "@/data/tools";
import { absoluteUrl } from "@/lib/site";
import { jsonLd } from "@/lib/json-ld";
import OutboundToolLink from "@/components/OutboundToolLink";
import { toolGuides } from "@/data/tool-guides";

export function generateStaticParams() {
  return getTools().map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const t = await getToolBySlug(params.slug);
  if (!t) return { title: "Tool not found" };
  const guide = toolGuides[t.slug];
  return {
    title: guide?.metaTitle ?? `${t.name} review`,
    description: guide?.metaDescription ?? t.description,
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
  const guide = toolGuides[tool.slug];
  const pageTitle = guide?.displayTitle ?? tool.name;

  const softwareApplication = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.name,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description: tool.description,
    sameAs: tool.website,
    url: absoluteUrl(`/tools/${tool.slug}`),
  };
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
      { "@type": "ListItem", position: 2, name: "Categories", item: absoluteUrl("/categories") },
      { "@type": "ListItem", position: 3, name: cat?.name ?? "Tools", item: absoluteUrl(`/categories/${cat?.slug ?? ""}`) },
      { "@type": "ListItem", position: 4, name: tool.name, item: absoluteUrl(`/tools/${tool.slug}`) },
    ],
  };

  return (
    <div className="mx-auto max-w-3xl px-4 mt-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(softwareApplication) }}
      />
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
        <Link href="/categories" className="hover:text-brand-600">
          Categories
        </Link>{" "}
        /{" "}
        <Link href={`/categories/${cat?.slug}`} className="hover:text-brand-600">
          {cat?.name}
        </Link>{" "}
        / {pageTitle}
      </nav>

      <div className="bg-white rounded-xl border border-black/10 p-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-lg bg-brand-50 flex items-center justify-center text-brand-600 text-lg font-medium">
            {tool.name.charAt(0)}
          </div>
          <div>
            <h1 className="text-[20px] font-medium text-ink-900">{pageTitle}</h1>
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

        <OutboundToolLink
          href={tool.website}
          toolSlug={tool.slug}
          rel="sponsored nofollow"
          target="_blank"
          className="mt-5 inline-flex h-[36px] px-6 rounded-lg bg-brand-600 text-white text-[13px] font-medium items-center hover:bg-brand-800"
        >
          Visit {tool.name} ↗
        </OutboundToolLink>
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

      {guide ? (
        <article className="mt-10 space-y-8">
          <section className="rounded-xl border border-brand-200 bg-brand-50 p-5">
            <h2 className="text-[18px] font-medium text-ink-900">
              What to know before using {tool.name}
            </h2>
            <p className="mt-3 text-[14px] leading-7 text-ink-700">
              {guide.summary}
            </p>
          </section>

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

          {guide.relatedLinks?.length ? (
            <section className="rounded-xl border border-black/10 bg-white p-5">
              <h2 className="text-[16px] font-medium text-ink-900">
                Continue your research
              </h2>
              <ul className="mt-3 space-y-2 text-[14px] text-brand-700">
                {guide.relatedLinks.map((related) => (
                  <li key={related.href}>
                    <Link href={related.href} className="hover:underline">
                      {related.label} →
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          <section>
            <h2 className="text-[18px] font-medium text-ink-900">
              Frequently asked questions
            </h2>
            <div className="mt-3 space-y-4">
              {guide.faqs.map((faq) => (
                <div key={faq.question} className="rounded-lg border border-black/10 bg-white p-4">
                  <h3 className="text-[14px] font-medium text-ink-900">{faq.question}</h3>
                  <p className="mt-2 text-[14px] leading-7 text-ink-700">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="border-t border-black/10 pt-6">
            <h2 className="text-[16px] font-medium text-ink-900">
              Official sources to verify
            </h2>
            <p className="mt-2 text-[13px] leading-6 text-ink-600">
              Features, plans and availability can change. The guidance above was checked against these official sources in September 2026; confirm the current terms before purchasing or entering sensitive information.
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-[13px] text-brand-700">
              {guide.sources.map((source) => (
                <li key={source.href}>
                  <a
                    href={source.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {source.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </article>
      ) : null}
    </div>
  );
}
