"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import BrandIcon from "@/components/BrandIcon";

export default function AdminEntrance() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;

  return (
    <Link
      href="/admin"
      className="fixed bottom-5 right-5 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white text-lg shadow-lg transition hover:-translate-y-0.5 hover:border-brand-600 hover:text-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600 focus:ring-offset-2"
      aria-label="Administrator login"
      title="Administrator login"
    >
      <BrandIcon className="h-8 w-8" />
    </Link>
  );
}
