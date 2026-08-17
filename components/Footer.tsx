import Link from "next/link";
import BrandIcon from "@/components/BrandIcon";

export default function Footer() {
  return (
    <footer className="border-t border-black/10 bg-white mt-12">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <BrandIcon />
              <span className="font-medium text-brand-800">MarketAI</span>
            </div>
            <p className="text-[13px] text-ink-600 max-w-sm">
              AI tools for marketers, SEOs and small businesses — hands-on
              reviews, honest comparisons, and free alternatives.
            </p>
          </div>
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-[13px] text-ink-600">
            <Link href="/about" className="hover:text-brand-600">
              About
            </Link>
            <Link href="/contact" className="hover:text-brand-600">
              Contact
            </Link>
            <Link href="/submit" className="hover:text-brand-600">
              Submit a tool
            </Link>
            <Link href="/affiliate-disclosure" className="hover:text-brand-600">
              Affiliate disclosure
            </Link>
            <Link href="/privacy" className="hover:text-brand-600">
              Privacy
            </Link>
          </nav>
        </div>
        <p className="mt-8 text-[12px] text-ink-400">
          We may earn a commission from some links on this site. This does not
          affect our reviews.
        </p>
        <p className="mt-2 text-[12px] text-ink-400">
          MarketAI — AI tools for marketers, SEOs and small businesses.
        </p>
      </div>
    </footer>
  );
}
