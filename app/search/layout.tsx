import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search AI tools",
  description: "Search the MarketAI directory for AI marketing tools.",
  alternates: { canonical: "/search" },
  robots: { index: false, follow: true },
};

export default function SearchLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
