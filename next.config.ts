import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.scdn.co",
      },
      {
        protocol: "https",
        hostname: "nmpz8srvxyslvrdu.public.blob.vercel-storage.com",
      },
    ],
  },
};

export default nextConfig;
