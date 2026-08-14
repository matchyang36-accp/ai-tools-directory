const DEFAULT_SITE_URL = "https://ai-tools-directory-60e.pages.dev";

function getSiteUrl(): string {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const value = configuredUrl || DEFAULT_SITE_URL;

  try {
    const url = new URL(value);
    if (url.protocol !== "https:" && url.protocol !== "http:") {
      throw new Error("unsupported protocol");
    }
    return url.origin;
  } catch {
    throw new Error(
      `NEXT_PUBLIC_SITE_URL must be an absolute HTTP(S) URL. Received: ${value}`,
    );
  }
}

export const SITE = {
  name: "MarketAI",
  url: getSiteUrl(),
  description:
    "Hands-on reviews, honest comparisons, and free alternatives to AI tools for marketing, SEO and small business.",
  repositoryUrl: "https://github.com/matchyang36-accp/ai-tools-directory",
} as const;

export function absoluteUrl(path = "/"): string {
  return new URL(path, `${SITE.url}/`).toString();
}
