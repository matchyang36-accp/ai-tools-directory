import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { getReviewBySlug, getToolBySlug } from "@/lib/db";
import { getReviews } from "@/data/tools";
import InArticleAd from "@/components/ads/InArticleAd";
import { isIndexableReview } from "@/lib/content-quality";
import type { Metadata } from "next";
import { absoluteUrl, SITE } from "@/lib/site";
import { jsonLd } from "@/lib/json-ld";
import OutboundToolLink from "@/components/OutboundToolLink";

const SITE_DOMAIN_PATTERN = /(https?:\/\/(?:www\.)?whichaiuse\.com|(?:www\.)?whichaiuse\.com)/gi;
const SITE_DOMAIN_EXACT_PATTERN = /^(https?:\/\/(?:www\.)?whichaiuse\.com|(?:www\.)?whichaiuse\.com)$/i;

function linkHomepageMentions(text: string): ReactNode {
  return text.split(SITE_DOMAIN_PATTERN).map((part, index) =>
    SITE_DOMAIN_EXACT_PATTERN.test(part) ? (
      <Link
        key={`${part}-${index}`}
        href="/"
        className="text-brand-600 underline decoration-brand-600/40 underline-offset-2 hover:text-brand-800"
      >
        {part}
      </Link>
    ) : (
      part
    ),
  );
}

export function generateStaticParams() {
  return getReviews().map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const r = await getReviewBySlug(params.slug);
  if (!r) return { title: "Not found" };
  return {
    title: r.title,
    description: r.excerpt,
    alternates: { canonical: `/blog/${r.slug}` },
    ...(!isIndexableReview(r)
      ? { robots: { index: false, follow: true } }
      : {}),
  };
}

export default async function BlogDetail({
  params,
}: {
  params: { slug: string };
}) {
  const review = await getReviewBySlug(params.slug);
  if (!review) notFound();
  const tool = review.toolSlug ? await getToolBySlug(review.toolSlug) : undefined;
  let paragraphCount = 0;
  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Blog", item: absoluteUrl("/blog") },
      { "@type": "ListItem", position: 3, name: review.title, item: absoluteUrl(`/blog/${review.slug}`) },
    ],
  };
  const article = !isIndexableReview(review)
    ? null
    : {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: review.title,
        description: review.excerpt,
        datePublished: review.date,
        mainEntityOfPage: absoluteUrl(`/blog/${review.slug}`),
        author: { "@type": "Organization", name: SITE.name, url: SITE.url },
        publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
      };

  return (
    <article className="mx-auto max-w-2xl px-4 mt-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbs) }}
      />
      {article ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(article) }}
        />
      ) : null}
      <nav className="text-[12px] text-ink-400 mb-3">
        <Link href="/blog" className="hover:text-brand-600">
          Blog
        </Link>{" "}
        / {linkHomepageMentions(review.title)}
      </nav>
      <h1 className="text-[22px] font-medium text-ink-900">{linkHomepageMentions(review.title)}</h1>
      <p className="text-[12px] text-ink-400 mt-1">
        {review.date} · {review.readMins} min read
      </p>
      <p className="text-[15px] text-ink-600 leading-relaxed mt-4">
        {linkHomepageMentions(review.excerpt)}
      </p>

      {review.sections ? (
        <div className="mt-7 space-y-7">
          {review.sections.map((section, index) => (
            <section key={`${section.heading ?? "intro"}-${index}`}>
              {section.heading ? (
                <h2 className="text-[18px] font-medium text-ink-900 mb-3">
                  {linkHomepageMentions(section.heading)}
                </h2>
              ) : null}
              <div className="space-y-3">
                {section.paragraphs.map((paragraph, paragraphIndex) => {
                  paragraphCount += 1;
                  const showAdAfterParagraph = paragraphCount === 2;

                  return (
                    <div key={`${section.heading ?? "intro"}-${paragraphIndex}`}>
                      <p className="text-[14px] text-ink-600 leading-7">
                        {linkHomepageMentions(paragraph)}
                      </p>
                      {showAdAfterParagraph ? <InArticleAd /> : null}
                    </div>
                  );
                })}
              </div>
              {section.bullets?.length ? (
                <ul className="mt-3 list-disc pl-5 space-y-2 text-[14px] text-ink-600 leading-6">
                  {section.bullets.map((item) => (
                    <li key={item}>{linkHomepageMentions(item)}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>
      ) : (
        <p className="text-[14px] text-ink-600 leading-relaxed mt-4">
          This editorial brief highlights the core use case and links to the
          related tool profile
          {tool ? (
            <>
              {" "}
              (
              <Link
                href={`/tools/${tool.slug}`}
                className="text-brand-600 hover:underline"
              >
                {tool.name}
              </Link>
              )
            </>
          ) : null}
          . A detailed hands-on review will be added after our testing notes are
          complete; we do not publish unsupported performance claims.
        </p>
      )}

      {review.relatedLinks?.length ? (
        <section className="mt-8 rounded-xl border border-black/10 bg-white p-5">
          <h2 className="text-[16px] font-medium text-ink-900">
            Continue your research
          </h2>
          <ul className="mt-3 space-y-2 text-[14px] text-brand-700">
            {review.relatedLinks.map((related) => (
              <li key={related.href}>
                <Link href={related.href} className="hover:underline">
                  {related.label} →
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {review.sourceLinks?.length ? (
        <section className="mt-8 border-t border-black/10 pt-6">
          <h2 className="text-[16px] font-medium text-ink-900">
            Official sources to verify
          </h2>
          <p className="mt-2 text-[13px] leading-6 text-ink-600">
            Product capabilities, integrations and plan details can change. Confirm the current terms and workflow on the provider&apos;s official site before purchasing or connecting business data.
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-[13px] text-brand-700">
            {review.sourceLinks.map((source) => (
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
      ) : null}

      {tool && (
        <div className="mt-6 bg-white rounded-xl border border-black/10 p-5 flex items-center justify-between">
          <div>
            <p className="font-medium text-[15px] text-ink-900">{tool.name}</p>
            <p className="text-[13px] text-ink-600">{tool.tagline}</p>
          </div>
          <OutboundToolLink
            href={tool.website}
            toolSlug={tool.slug}
            rel="sponsored nofollow"
            target="_blank"
            className="h-[36px] px-5 rounded-lg bg-brand-600 text-white text-[13px] font-medium flex items-center hover:bg-brand-800"
          >
            Visit ↗
          </OutboundToolLink>
        </div>
      )}

      <Link
        href="/blog"
        className="inline-block mt-6 text-[13px] text-brand-600 hover:underline"
      >
        ← All reviews
      </Link>
    </article>
  );
}
