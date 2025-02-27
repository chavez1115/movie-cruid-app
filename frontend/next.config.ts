import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['108.181.203.133'],
  },
  reactStrictMode: true,
  i18n: require('./next-i18next.config').i18n,
};

export default nextConfig;
