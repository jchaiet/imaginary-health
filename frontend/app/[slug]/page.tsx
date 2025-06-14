import PageTemplate from "@/components/templates/PageTemplate";
import { PageBuilder } from "@/lib/pageBuilder";
import { sanityClient, resolveLinkURL } from "@/sanity/client";
import { pageBySlugQuery } from "@/sanity/queries";
import { notFound } from "next/navigation";
import { ItemType, Link, PageSection } from "@/types";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const page = await sanityClient.fetch(pageBySlugQuery, { slug: slug });

  if (!page) notFound();

  const { pageBuilder = [], hideHeader = false, hideFooter = false } = page;

  //Pre-resolve CallToAction links in any block
  const resolvedSections = await Promise.all(
    pageBuilder.map(async (section: PageSection) => {
      if ("items" in section && section._type !== "faqBlock") {
        const items = section.items;

        if (items) {
          const resolvedItems = await Promise.all(
            items.map(async (item: ItemType) => {
              if (item.callToAction) {
                return {
                  ...item,
                  callToAction: {
                    ...item.callToAction,
                    resolvedUrl: await resolveLinkURL(item.callToAction),
                  },
                };
              }
              return item;
            })
          );
          return { ...section, items: resolvedItems };
        }
      }

      if ("callToAction" in section) {
        const callToAction = section.callToAction;

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
