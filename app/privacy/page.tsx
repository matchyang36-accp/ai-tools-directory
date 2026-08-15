import Link from "next/link";

export const metadata = { title: "Privacy" };

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 mt-8">
      <h1 className="text-[20px] font-medium text-ink-900">Privacy</h1>
      <div className="text-[14px] text-ink-600 leading-relaxed mt-3 space-y-4">
        <p>
          MarketAI does not currently offer user accounts, accept payments, or
          collect newsletter subscriptions. We do not ask you to submit personal
          information directly on this website.
        </p>
        <p>
          The site is hosted by Cloudflare, which may process standard technical
          information such as IP address, browser type, requested URL, and
          security logs to deliver and protect the service.
        </p>
        <p>
          We use Cloudflare Web Analytics to understand aggregate page views,
          visits, referral sources, and site performance. Cloudflare states that
          this privacy-first service does not collect or use visitors&apos; personal
          data and does not use cookies for this purpose.
        </p>
        <p>
          MarketAI links to third-party websites. Those services have their own
          privacy practices, and this policy does not cover information they
          collect after you leave MarketAI.
        </p>
        <p>
          This policy will be updated before advertising, accounts, payments, or
          email subscriptions are enabled. Last updated: August 2026.
        </p>
      </div>
      <Link
        href="/"
        className="inline-block mt-6 text-[13px] text-brand-600 hover:underline"
      >
        ← Back home
      </Link>
    </div>
  );
}
