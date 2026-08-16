import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdminEntrance from "@/components/AdminEntrance";
import { SITE } from "@/lib/site";

const CLOUDFLARE_ANALYTICS_TOKEN = "3840b35262494df38d5c3c3a0cf85e08";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default:
      "MarketAI — AI tools for marketers, SEOs & small businesses",
    template: "%s | MarketAI",
  },
  description:
    SITE.description,
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
    url: "/",
    siteName: SITE.name,
  },
  twitter: {
    card: "summary",
    title: "MarketAI — AI tools for marketers, SEOs & small businesses",
    description: SITE.description,
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
        <AdminEntrance />
        <script
          type="module"
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon={JSON.stringify({
            token: CLOUDFLARE_ANALYTICS_TOKEN,
          })}
        />
      </body>
    </html>
  );
}
