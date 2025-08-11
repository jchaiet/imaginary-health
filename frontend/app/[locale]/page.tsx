import { cache } from "react";
import { sanityClient } from "@/sanity/client";
import { pageBySlugQuery } from "@/sanity/queries";
import PageTemplate from "@/components/templates/PageTemplate";
import { PageBuilder } from "@/lib/pageBuilder";
import { draftMode } from "next/headers";

import { notFound } from "next/navigation";
// import { resolveSections } from "@/lib/resolveSections";

interface PageProps {
  params: Promise<{ slug: string[]; locale: string }>;
}

const getPage = cache(
  async (slug: string, locale: string, isDraft: boolean) => {
    return sanityClient.fetch(
      pageBySlugQuery,
      { slug, locale },
      isDraft
        ? {
            perspective: "drafts",
            useCdn: false,
            stega: true,
          }
        : undefined
    );
  }
);

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  const page = await getPage("home", locale, false);

  if (!page) return {};

  return {
    title: page.metadata?.title ?? "Home",
    description: page.metadata?.description ?? "",
    robots: page.metadata?.robots ?? "index, follow",
  };
}

export default async function Home({ params }: PageProps) {
  const { locale } = await params;
  const { isEnabled } = await draftMode();

  let page = await getPage("home", locale, isEnabled);

  if (!page && locale !== "en-us") {
    page = await getPage("home", "en-us", isEnabled);
  }

  if (!page) notFound();

  const { pageBuilder = [], hideHeader = false, hideFooter = false } = page;

  // const resolvedSections = (await resolveSections(
  //   pageBuilder
  // )) as PageSection[];

  return (
    <PageTemplate hideHeader={hideHeader} hideFooter={hideFooter}>
      <PageBuilder sections={pageBuilder} pageData={page} />
    </PageTemplate>
  );
}
