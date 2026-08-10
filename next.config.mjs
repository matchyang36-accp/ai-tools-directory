/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Pure static export — deploys to Cloudflare Pages static hosting
  // (or any static host). No edge runtime, no D1, no server functions.
  output: "export",
  // Generate directory-style HTML so any static server (and local preview)
  // can serve /tools/<slug>/ without extension rewriting.
  trailingSlash: true,
};

export default nextConfig;
