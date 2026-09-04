import Link from "next/link";
import BrandIcon from "@/components/BrandIcon";
import { SITE } from "@/lib/site";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-black/10">
      <div className="mx-auto max-w-6xl px-4 h-14 flex items-center gap-3 md:gap-6">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <BrandIcon priority />
          <span className="font-medium text-[15px] text-brand-800">{SITE.name}</span>
        </Link>

        <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-5 text-[13px] text-ink-600">
          <Link href="/categories" className="hover:text-brand-600">
            Categories
          </Link>
          <Link href="/compare" className="hover:text-brand-600">
            Comparisons
          </Link>
          <Link href="/blog" className="hover:text-brand-600">
            Blog
          </Link>
        </nav>

        <details className="relative ml-auto md:hidden">
          <summary className="cursor-pointer list-none rounded-full border border-black/15 px-3 py-1.5 text-[13px] font-medium text-ink-700 hover:border-brand-400 hover:text-brand-600 [&::-webkit-details-marker]:hidden">
            Menu
          </summary>
          <nav aria-label="Mobile navigation" className="absolute right-0 top-[calc(100%+8px)] z-50 w-44 rounded-xl border border-black/10 bg-white p-2 text-[13px] shadow-lg">
            <Link href="/categories" className="block rounded-lg px-3 py-2 text-ink-700 hover:bg-brand-50 hover:text-brand-700">Categories</Link>
            <Link href="/compare" className="block rounded-lg px-3 py-2 text-ink-700 hover:bg-brand-50 hover:text-brand-700">Comparisons</Link>
            <Link href="/blog" className="block rounded-lg px-3 py-2 text-ink-700 hover:bg-brand-50 hover:text-brand-700">Blog</Link>
          </nav>
        </details>

        <div className="flex shrink-0 items-center gap-3">
          <form action="/search" method="get" className="hidden sm:block">
            <input
              type="search"
              name="q"
              placeholder="Search tools"
              className="w-[150px] lg:w-[200px] h-[34px] px-3 rounded-full border border-black/15 text-[13px] outline-none focus:border-brand-400"
            />
          </form>
          <Link
            href="/submit"
            className="h-[34px] px-4 rounded-full bg-brand-600 text-white text-[13px] font-medium flex items-center hover:bg-brand-800"
          >
            Submit
          </Link>
        </div>
      </div>
    </header>
  );
}
