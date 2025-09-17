import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: {
    buildActivity: false,
  },
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  assetPrefix: process.env.NODE_ENV === 'production' ? '/usmle-ai' : '',
  basePath: process.env.NODE_ENV === 'production' ? '/usmle-ai' : '',
};

export default nextConfig;
