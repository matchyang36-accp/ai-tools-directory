import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdminEntrance from "@/components/AdminEntrance";
import VisitorTracker from "@/components/VisitorTracker";
import { absoluteUrl, SITE } from "@/lib/site";
import { jsonLd } from "@/lib/json-ld";

const CLOUDFLARE_ANALYTICS_TOKEN = "3840b35262494df38d5c3c3a0cf85e08";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default:
      "WhichAIUse — AI tools for marketing, SEO & small business",
    template: "%s | WhichAIUse",
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
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png", sizes: "64x64" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", type: "image/png", sizes: "180x180" },
    ],
  },
  openGraph: {
    title: "WhichAIUse — AI tools for marketing, SEO & small business",
    description:
      "Hands-on reviews, honest comparisons, and free alternatives to the best AI tools for marketing.",
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: SITE.name,
  },
  twitter: {
    card: "summary",
    title: "WhichAIUse — AI tools for marketing, SEO & small business",
    description: SITE.description,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const siteJsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: SITE.name,
      url: SITE.url,
      description: SITE.description,
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
      logo: absoluteUrl("/icon-512.png"),
    },
  ];

  return (
    <html lang="en">
      <body>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <AdminEntrance />
        <VisitorTracker />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(siteJsonLd) }}
        />
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
