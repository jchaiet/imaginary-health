import type { MetadataRoute } from "next";
import groq from "groq";
import { sanityClient } from "@/sanity/client";

type SitemapPage = {
  slug: string;
  _updatedAt: string;
};

const query = groq`*{
  "pages": *[_type == "page" && defined(slug.current) && !(_id in path("drafts.**"))]{
    _updatedAt,
    "slug": slug.current
  },
  "articles": *[_type == "blog" && defined(slug.current) && !(_id in path("drafts.**"))]{
    _updatedAt,
    "slug": slug.current
  }
}[0]`;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const data = await sanityClient.fetch(query);

  const baseUrl = process.env.NEXT_PUBLIC_SANITY_BASE_URL;

  const pageEntries = data.pages.map((page: SitemapPage) => {
    const slug = page.slug === "home" ? "" : page.slug;
    const priority = page.slug === "home" ? 1 : 0.9;

    return {
      url: `${baseUrl}/${slug}`,
      lastModified: page._updatedAt,
      changeFrequency: "weekly" as const,
      priority,
    };
  });

  const articleEntries = data.articles.map((article: SitemapPage) => {
    return {
      url: `${baseUrl}/blog/articles/${article.slug}`,
      lastModified: article._updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    };
  });

  return [...pageEntries, ...articleEntries].sort(
    (a, b) => b.priority - a.priority
  );
}
