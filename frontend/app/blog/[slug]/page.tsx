import PageTemplate from "@/components/templates/PageTemplate";
import { PageBuilder } from "@/lib/pageBuilder";
import { sanityClient } from "@/sanity/client";
import { articleBySlugQuery } from "@/sanity/queries";
import { notFound } from "next/navigation";
import { resolveSections } from "@/lib/resolveSections";
import { PageSection } from "@/types";
import { draftMode } from "next/headers";

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const { isEnabled } = await draftMode();

  const formattedSlug = slug;

  const article = await sanityClient.fetch(
    articleBySlugQuery,
    { slug: formattedSlug },
    isEnabled
      ? {
          perspective: "drafts",
          useCdn: false,
          stega: true,
        }
      : undefined
  );

  if (!article) notFound();

  const { pageBuilder = [], hideHeader = false, hideFooter = false } = article;

  const resolvedSections = (await resolveSections(
    pageBuilder
  )) as PageSection[];

  return (
    <PageTemplate hideHeader={hideHeader} hideFooter={hideFooter}>
      <PageBuilder sections={resolvedSections} />
    </PageTemplate>
  );
}
