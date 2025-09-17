import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  devIndicators: {
    buildActivity: false,
  },
  // output: 'export', // Commented out for API routes
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  assetPrefix: process.env.NODE_ENV === 'production' ? '/usmle-ai' : '',
  basePath: process.env.NODE_ENV === 'production' ? '/usmle-ai' : '',
};

export default nextConfig;
