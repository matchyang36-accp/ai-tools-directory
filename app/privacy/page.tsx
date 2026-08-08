import Link from "next/link";

export const metadata = { title: "Privacy" };

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 mt-8">
      <h1 className="text-[20px] font-medium text-ink-900">Privacy</h1>
      <p className="text-[14px] text-ink-600 leading-relaxed mt-3">
        This is a demo site. In production, add your real privacy policy here,
        covering what data you collect (e.g. newsletter emails, analytics) and
        how you use it. A clear privacy policy is required for AdSense and most
        affiliate programs.
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
