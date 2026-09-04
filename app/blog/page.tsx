import ReviewCard from "@/components/ReviewCard";
import { getReviews } from "@/lib/db";
import { isUnreviewedBatchPost } from "@/lib/content-quality";

export const metadata = {
  title: "Blog & reviews",
  description:
    "In-depth reviews and buying guides for AI tools in marketing, SEO and small business.",
  alternates: { canonical: "/blog" },
};

export default async function BlogIndex() {
  const reviews = (await getReviews()).filter(
    (review) => !isUnreviewedBatchPost(review.slug),
  );
  return (
    <div className="mx-auto max-w-3xl px-4 mt-8">
      <h1 className="text-[20px] font-medium text-ink-900">Blog &amp; reviews</h1>
      <p className="text-[13px] text-ink-600 mt-1 mb-6">
        Editorial guides and product profiles for practical AI workflows.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {reviews.map((r) => (
          <ReviewCard key={r.slug} review={r} />
        ))}
      </div>
    </div>
  );
}
