import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/projects/pixelate-game",
        destination: "/portfolio/pixel-guess-game",
        permanent: true,
      },
      {
        source: "/projects/portfolio-typescript",
        destination: "/portfolio/portfolio-site",
        permanent: true,
      },
      {
        source: "/projects/:path*",
        destination: "/portfolio",
        permanent: true,
      },
      {
        source: "/games/:path*",
        destination: "/portfolio",
        permanent: true,
      },
      {
        source: "/experiences",
        destination: "/bio",
        permanent: true,
      },
      {
        source: "/skills",
        destination: "/bio",
        permanent: true,
      },
    ];
  },
  experimental: {
    reactCompiler: false,
  },
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

export default withPayload(nextConfig);
