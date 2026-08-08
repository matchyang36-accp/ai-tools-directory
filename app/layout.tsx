import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default:
      "MarketAI — AI tools for marketers, SEOs & small businesses",
    template: "%s | MarketAI",
  },
  description:
    "Hands-on reviews, honest comparisons, and free alternatives to the best AI tools for marketing, SEO and small business. Not just another link list.",
  keywords: [
    "AI tools for marketing",
    "AI SEO tools",
    "AI tools for small business",
    "AI copywriting",
    "AI video generator",
  ],
  openGraph: {
    title: "MarketAI — AI tools for marketers, SEOs & small businesses",
    description:
      "Hands-on reviews, honest comparisons, and free alternatives to the best AI tools for marketing.",
    type: "website",
    locale: "en_US",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
