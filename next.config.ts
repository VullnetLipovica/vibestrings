import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};
export default {
  reactStrictMode: true,
  images: {
  remotePatterns: [
  { protocol: 'https', hostname: '**' }
  ]
  }
  };

