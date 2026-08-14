import Link from "next/link";
import { SITE } from "@/lib/site";

export const metadata = {
  title: "Submit a tool",
  description:
    "Know a great AI tool for marketers, SEOs or small business? Submit it for review.",
};

export default function SubmitPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 mt-8">
      <h1 className="text-[20px] font-medium text-ink-900">Submit a tool</h1>
      <p className="text-[13px] text-ink-600 mt-1 mb-6">
        Found an AI tool our readers should know about? Tell us. Every
        submission is reviewed by an editor before it goes live — we do not list
        low-quality or scammy tools.
      </p>

      <section className="bg-white rounded-xl border border-black/10 p-6">
        <h2 className="text-[15px] font-medium text-ink-900">
          Submissions are in early access
        </h2>
        <p className="text-[13px] text-ink-600 leading-relaxed mt-2">
          Until the official domain and submission workflow are ready, send the
          tool name, website, category, and a short description through a GitHub
          issue. Do not include passwords, API keys, or private customer data.
        </p>
        <a
          href={`${SITE.repositoryUrl}/issues/new?title=Tool%20submission%3A%20`}
          target="_blank"
          rel="noreferrer"
          className="mt-5 inline-flex h-[38px] px-6 rounded-lg bg-brand-600 text-white text-[13px] font-medium items-center hover:bg-brand-800"
        >
          Submit through GitHub
        </a>
      </section>

      <Link
        href="/"
        className="inline-block mt-4 text-[13px] text-brand-600 hover:underline"
      >
        ← Back home
      </Link>
    </div>
  );
}
