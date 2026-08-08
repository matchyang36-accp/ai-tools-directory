import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-4 mt-16 text-center">
      <h1 className="text-[22px] font-medium text-ink-900">Page not found</h1>
      <p className="text-[13px] text-ink-600 mt-2">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="inline-block mt-5 h-[36px] px-6 rounded-lg bg-brand-600 text-white text-[13px] font-medium items-center hover:bg-brand-800"
      >
        Back home
      </Link>
    </div>
  );
}
