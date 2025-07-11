import { sanityClient } from "@/sanity/client";
import { pageBySlugQuery } from "@/sanity/queries";
import PageTemplate from "@/components/templates/PageTemplate";
import { PageBuilder } from "@/lib/pageBuilder";
import { draftMode } from "next/headers";

import { notFound } from "next/navigation";
// import { resolveSections } from "@/lib/resolveSections";

export default async function Home() {
  const { isEnabled } = await draftMode();
  const page = await sanityClient.fetch(
    pageBySlugQuery,
    { slug: "home" },
    isEnabled
      ? {
          perspective: "drafts",
          useCdn: false,
          stega: true,
        }
      : undefined
  );

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
