import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // output: 'export', // Disabled - API routes not compatible with static export
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  assetPrefix: process.env.NODE_ENV === 'production' ? '/USMLE' : '',
  basePath: process.env.NODE_ENV === 'production' ? '/USMLE' : '',
};

export default nextConfig;
