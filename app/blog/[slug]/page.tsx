import Link from "next/link";
import { notFound } from "next/navigation";
import { getReviewBySlug, getToolBySlug } from "@/lib/db";
import { getReviews } from "@/data/tools";

export function generateStaticParams() {
  return getReviews().map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const r = await getReviewBySlug(params.slug);
  if (!r) return { title: "Not found" };
  return {
    title: r.title,
    description: r.excerpt,
    alternates: { canonical: `/blog/${r.slug}` },
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

  return (
    <article className="mx-auto max-w-2xl px-4 mt-8">
      <nav className="text-[12px] text-ink-400 mb-3">
        <Link href="/blog" className="hover:text-brand-600">
          Blog
        </Link>{" "}
        / {review.title}
      </nav>
      <h1 className="text-[22px] font-medium text-ink-900">{review.title}</h1>
      <p className="text-[12px] text-ink-400 mt-1">
        {review.date} · {review.readMins} min read
      </p>
      <p className="text-[15px] text-ink-600 leading-relaxed mt-4">
        {review.excerpt}
      </p>
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

      {tool && (
        <div className="mt-6 bg-white rounded-xl border border-black/10 p-5 flex items-center justify-between">
          <div>
            <p className="font-medium text-[15px] text-ink-900">{tool.name}</p>
            <p className="text-[13px] text-ink-600">{tool.tagline}</p>
          </div>
          <a
            href={tool.website}
            rel="sponsored nofollow"
            target="_blank"
            className="h-[36px] px-5 rounded-lg bg-brand-600 text-white text-[13px] font-medium flex items-center hover:bg-brand-800"
          >
            Visit ↗
          </a>
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
