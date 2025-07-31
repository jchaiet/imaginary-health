import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  // const baseUrl = process.env.NEXT_PUBLIC_SANITY_BASE_URL;

  return {
    rules: {
      userAgent: "*",
      disallow: "/",
    },
    // sitemap: `${baseUrl}/sitemap.xml`,
  };
}
