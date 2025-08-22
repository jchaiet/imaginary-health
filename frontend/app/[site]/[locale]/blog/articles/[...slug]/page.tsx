import PageTemplate from "@/components/templates/PageTemplate";
import { PageBuilder } from "@/lib/pageBuilder";
import { sanityClient } from "@/sanity/client";
import { articleBySlugQuery } from "@/sanity/queries";
import { notFound } from "next/navigation";
import { draftMode } from "next/headers";
import React from "react";
import { CategoryProps, PageSection } from "@/types";

interface PageProps {
  params: Promise<{ site: string; slug: string[]; locale: string }>;
}

export default async function Page({ params }: PageProps) {
  const { slug, locale, site } = await params;
  const { isEnabled } = await draftMode();

  const formattedSlug = slug.join("/") ?? "/";

  let page = await sanityClient.fetch(
    articleBySlugQuery,
    { slug: formattedSlug, locale, site },
    isEnabled
      ? {
          perspective: "drafts",
          useCdn: false,
          stega: true,
        }
      : undefined
  );

  if (!page && locale !== "en-us") {
    page = await sanityClient.fetch(
      articleBySlugQuery,
      { slug: formattedSlug, locale: "en-us" },
      isEnabled
        ? {
            perspective: "drafts",
            useCdn: false,
            stega: true,
          }
        : undefined
    );
  }

  if (!page) notFound();

  const { pageBuilder = [], hideHeader = false, hideFooter = false } = page;

  const type = page?._type === "blog" ? "article" : "other";

  const hasKeywordsCategory = page.categories?.some((cat: CategoryProps) =>
    cat.slug?.current?.includes("/keywords")
  );

  const sectionsWithStaticComponents = pageBuilder.flatMap(
    (section: PageSection) => {
      if (section._type === "featuredDocumentsBlock") {
        const newSections: PageSection[] = [];

        if (hasKeywordsCategory) {
          newSections.push({
            _type: "additionalCategoriesBlock",
            categories: page.categories ?? [],
            type,
          });
        }

        newSections.push({
          _type: "wasHelpfulBlock",
          page: page,
          type: type,
        });

        newSections.push(section);
        return newSections;
      }
      return [section];
    }
  );

  return (
    <PageTemplate isBlog={true} hideHeader={hideHeader} hideFooter={hideFooter}>
      <PageBuilder sections={sectionsWithStaticComponents} pageData={page} />
    </PageTemplate>
  );
}
