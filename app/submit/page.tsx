import Link from "next/link";

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

      <form className="bg-white rounded-xl border border-black/10 p-6 space-y-4">
        <div>
          <label className="block text-[13px] text-ink-900 mb-1">
            Tool name
          </label>
          <input
            className="w-full h-[38px] px-3 rounded-lg border border-black/15 text-[13px] outline-none focus:border-brand-400"
            placeholder="e.g. Acme AI"
          />
        </div>
        <div>
          <label className="block text-[13px] text-ink-900 mb-1">Website</label>
          <input
            className="w-full h-[38px] px-3 rounded-lg border border-black/15 text-[13px] outline-none focus:border-brand-400"
            placeholder="https://"
          />
        </div>
        <div>
          <label className="block text-[13px] text-ink-900 mb-1">
            Category
          </label>
          <select className="w-full h-[38px] px-3 rounded-lg border border-black/15 text-[13px] outline-none focus:border-brand-400 bg-white">
            <option>Copywriting</option>
            <option>SEO</option>
            <option>Ads &amp; Creative</option>
            <option>Social Media</option>
            <option>Email &amp; Outreach</option>
            <option>Image &amp; Design</option>
            <option>Video</option>
            <option>Chatbots</option>
            <option>Productivity</option>
          </select>
        </div>
        <div>
          <label className="block text-[13px] text-ink-900 mb-1">
            Why should we list it?
          </label>
          <textarea
            rows={4}
            className="w-full px-3 py-2 rounded-lg border border-black/15 text-[13px] outline-none focus:border-brand-400"
            placeholder="One or two sentences on what it does and who it's for."
          />
        </div>
        <button
          type="button"
          className="h-[38px] px-6 rounded-lg bg-brand-600 text-white text-[13px] font-medium hover:bg-brand-800"
        >
          Submit for review
        </button>
        <p className="text-[12px] text-ink-400">
          Demo form — wire this to your backend (D1 + a review queue) later.
        </p>
      </form>

      <Link
        href="/"
        className="inline-block mt-4 text-[13px] text-brand-600 hover:underline"
      >
        ← Back home
      </Link>
    </div>
  );
}
