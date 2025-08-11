import type { NextConfig } from "next";
import { getRedirects } from "./lib/getRedirects";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
        pathname: "/images/m4mnm2dh/production/**",
      },
    ],
  },
  async redirects() {
    const sanityRedirects = await getRedirects();
    return [
      // {
      //   source: "/en-us/:path*",
      //   destination: "/:path*",
      //   permanent: true,
      // },
      ...sanityRedirects,
    ];
  },
};

export default nextConfig;
