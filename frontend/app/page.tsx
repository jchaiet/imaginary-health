import { cache } from "react";
import { sanityClient } from "@/sanity/client";
import { pageBySlugQuery } from "@/sanity/queries";
import PageTemplate from "@/components/templates/PageTemplate";
import { PageBuilder } from "@/lib/pageBuilder";
import { draftMode } from "next/headers";

import { notFound } from "next/navigation";
// import { resolveSections } from "@/lib/resolveSections";

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

export async function generateMetadata() {
  const page = await getPage("home");
  if (!page) return {};

  return {
    title: page.metadata?.title ?? "Home",
    description: page.metadata?.description ?? "",
    robots: page.metadata?.robots ?? "index, follow",
  };
}

export default async function Home() {
  const page = await getPage("home");

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
