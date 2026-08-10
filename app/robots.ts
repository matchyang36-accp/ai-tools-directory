import type { MetadataRoute } from "next";

// Replace with your real domain before going live.
const BASE_URL = "https://marketai.example.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
