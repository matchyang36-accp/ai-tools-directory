/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  agentRules: false,
  // Public pages are statically exported to Cloudflare Pages. Pages Functions
  // handle protected admin/API paths and can use the D1 binding in wrangler.jsonc.
  output: "export",
  // Generate directory-style HTML so any static server (and local preview)
  // can serve /tools/<slug>/ without extension rewriting.
  trailingSlash: true,
};

export default nextConfig;
