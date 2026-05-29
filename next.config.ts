import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  poweredByHeader: false,

  images: {
    // Servir WebP/AVIF automatiquement (30–80 % plus léger que PNG/JPG)
    formats: ["image/avif", "image/webp"],

    // Cache CDN 1 an — les images ne changent pas entre déploiements
    minimumCacheTTL: 60 * 60 * 24 * 365,

    // Breakpoints pour les srcset responsifs
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [64, 128, 256, 384, 480],
  },
};

export default nextConfig;
