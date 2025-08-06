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
    return await getRedirects();
  },
};

export default nextConfig;
