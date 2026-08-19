import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Deck pages are wide; these are the widths the layout actually asks for.
    formats: ["image/avif", "image/webp"],
    // Deck pages are dense with small type, so they get a higher quality tier.
    qualities: [75, 80, 90],
    deviceSizes: [640, 750, 828, 1080, 1200, 1440, 1920, 2048],
    imageSizes: [128, 240, 304, 384, 564, 760],
  },
  // The repo root, not the first package-lock.json found up the tree.
  turbopack: { root: path.resolve(process.cwd()) },
  outputFileTracingRoot: path.resolve(process.cwd()),
};

export default nextConfig;
