import { cache } from "react";
import PageTemplate from "@/components/templates/PageTemplate";
import { PageBuilder } from "@/lib/pageBuilder";
import { sanityClient } from "@/sanity/client";
import { pageBySlugQuery } from "@/sanity/queries";
import { notFound } from "next/navigation";
import { draftMode } from "next/headers";

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

const getPage = cache(async (slug: string) => {
  const { isEnabled } = await draftMode();

  return sanityClient.fetch(
    pageBySlugQuery,
    { slug },
    isEnabled
      ? {
          perspective: "drafts",
          useCdn: false,
          stega: true,
        }
      : undefined
  );
});

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const formattedSlug = slug.join("/") ?? "/";
  const page = await getPage(formattedSlug);

  if (!page) return {};

  return {
    title: page.metadata?.title ?? "Home",
    description: page.metadata?.description ?? "",
    robots: page.metadata?.robots ?? "index, follow",
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const formattedSlug = slug.join("/") ?? "/";
  const page = await getPage(formattedSlug);

  if (!page) notFound();

  const { pageBuilder = [], hideHeader = false, hideFooter = false } = page;

  const isBlog = page?.slug?.current?.startsWith("blog");

  return (
    <PageTemplate
      isBlog={isBlog}
      hideHeader={hideHeader}
      hideFooter={hideFooter}
    >
      <PageBuilder sections={pageBuilder} pageData={page} />
    </PageTemplate>
  );
}
