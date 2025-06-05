import { sanityClient, resolveLinkURL } from "@/sanity/client";
import { pageBySlugQuery } from "@/sanity/queries";
import PageTemplate from "@/components/templates/PageTemplate";
import { PageBuilder } from "@/lib/pageBuilder";
import { CardType, Link } from "@/types";

import "./globals.css";

export default async function Home() {
  const page = await sanityClient.fetch(pageBySlugQuery, { slug: "home" });

  if (!page) {
    return <div>404 - Page not found</div>;
  }

  const { pageBuilder = [], hideHeader = false, hideFooter = false } = page;

  //Pre-resolve CallToAction links in any block
  const resolvedSections = await Promise.all(
    pageBuilder.map(async (section: any) => {
      const { callToAction, items } = section;

      if (items) {
        const resolvedItems = await Promise.all(
          items.map(async (item: CardType) => {
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
