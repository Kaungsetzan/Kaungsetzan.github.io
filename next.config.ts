import type { NextConfig } from "next";

// Static site for GitHub Pages (https://kaungsetzan.github.io).
// No server: every page is generated at build time into `out/`.
const nextConfig: NextConfig = {
  output: "export",
  // `/projects/5a-goldsmith/` -> `out/projects/5a-goldsmith/index.html`
  trailingSlash: true,
  // GitHub Pages has no image server; screenshots are pre-compressed to WebP instead.
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
