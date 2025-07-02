import PageTemplate from "@/components/templates/PageTemplate";
import { PageBuilder } from "@/lib/pageBuilder";
import { sanityClient } from "@/sanity/client";
import { blogPageWithPostsQuery } from "@/sanity/queries";
import { notFound } from "next/navigation";
import { resolveSections } from "@/lib/resolveSections";
import { PageSection } from "@/types";
import { draftMode } from "next/headers";

export default async function Page() {
  const { isEnabled } = await draftMode();

  const page = await sanityClient.fetch(
    blogPageWithPostsQuery,
    { slug: "blog" },
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

  // const articles = await sanityClient.fetch(blogPostsByParentQuery, {});

  const resolvedSections = (await resolveSections(
    pageBuilder
  )) as PageSection[];

  return (
    <PageTemplate hideHeader={hideHeader} hideFooter={hideFooter}>
      <PageBuilder sections={resolvedSections} />
    </PageTemplate>
  );
}
