import Link from "next/link";
import type { Review } from "@/data/tools";

export default function ReviewCard({ review }: { review: Review }) {
  return (
    <Link
      href={`/blog/${review.slug}`}
      className="bg-white rounded-lg border border-black/10 p-4 flex gap-4"
    >
      <div className="w-16 h-[60px] rounded-lg bg-brand-50 shrink-0" />
      <div>
        <p className="font-medium text-[13px] text-ink-900">{review.title}</p>
        <p className="text-[12px] text-ink-600 mt-1">{review.readMins} min read</p>
        <p className="text-[12px] text-brand-600 mt-2">Read review</p>
      </div>
    </Link>
  );
}
