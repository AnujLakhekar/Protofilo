import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL('https://www.pngmart.com/files/23/Profile-PNG-Photo.png')],
  },
};

export default nextConfig;
