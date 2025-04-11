import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'el-system-images.s3.ap-southeast-2.amazonaws.com',
        pathname: '**',
      },
    ],
  },
};

export default nextConfig;
