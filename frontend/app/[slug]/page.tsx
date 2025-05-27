import PageTemplate from "@/components/templates/PageTemplate";
import { PageBuilder } from "@/lib/pageBuilder";
import { sanityClient, resolveLinkURL } from "@/sanity/client";
import { pageBySlugQuery } from "@/sanity/queries";
import { notFound } from "next/navigation";
import { Link } from "@/types";

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const page = await sanityClient.fetch(pageBySlugQuery, { slug: slug });

  if (!page) return notFound();

  const { pageBuilder = [], hideHeader = false, hideFooter = false } = page;

  //Pre-resolve CallToAction links in any block
  const resolvedSections = await Promise.all(
    pageBuilder.map(async (section: any) => {
      const { callToAction } = section;

      if (callToAction) {
        const callToActionsArray = Array.isArray(callToAction)
          ? callToAction
          : [callToAction];

        const resolvedCtas = await Promise.all(
          callToActionsArray.map(async (cta: Link) => ({
            ...cta,
            resolvedUrl: await resolveLinkURL(cta),
          }))
        );
        return {
          ...section,
          callToAction: Array.isArray(callToAction)
            ? resolvedCtas
            : resolvedCtas[0],
        };
      }

      return section;
    })
  );

  return (
    <PageTemplate hideHeader={hideHeader} hideFooter={hideFooter}>
      <PageBuilder sections={resolvedSections} />
    </PageTemplate>
  );
}
