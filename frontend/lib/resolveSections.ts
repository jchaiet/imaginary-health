import { resolveLinkURL, sanityClient } from "@/sanity/client";
import { ItemType, Link, PageSection } from "@/types";

export async function resolveSections(sections: PageSection[]) {
  return await Promise.all(
    sections.map(async (section) => {
      if (section._type === "documentListBlock") {
        const filters: string[] = [];
        const params: Record<string, any> = {};

        if (section.filterByCategory?._ref) {
          filters.push("category._ref == $categoryRef");
          params.categoryRef = section.filterByCategory._ref;
        }

        const query = `
          *[_type == "blog" ${filters.length ? `&& ${filters.join(" && ")}` : ""}] | order(publishDate desc) ${section.limit ? `[0...${section.limit}]` : ""} {
            ...,
            categories[]->{
              _id,
              title,
              slug
            },
            image {
              asset->{
                _id,
                url,
                altText,
                title,
                description
              }
            }
          }
        `;

        const articles = await sanityClient.fetch(query, params);

        return {
          ...section,
          articles,
        };
      }

      //Handle grid.items with CTA
      if ("grid" in section && section.grid?.items) {
        const resolvedItems = await resolveItems(section.grid.items);
        return {
          ...section,
          grid: {
            ...section.grid,
            items: resolvedItems,
          },
        };
      }

      if (
        "items" in section &&
        section._type !== "faqBlock" &&
        section._type !== "tabsBlock" &&
        section._type !== "accordionBlock" &&
        section._type !== "carouselBlock"
      ) {
        if (section.items) {
          const resolvedItems = await resolveItems(section.items);
          return {
            ...section,
            items: resolvedItems,
          };
        }
      }

      if ("callToAction" in section) {
        const callToAction = section.callToAction;
        const callToActionsArray = Array.isArray(callToAction)
          ? callToAction
          : [callToAction];

        const resolvedCtas = await Promise.all(
          callToActionsArray.map(async (cta) => ({
            ...cta,
            resolvedUrl: await resolveLinkURL(cta as Link),
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
}

async function resolveItems(items: ItemType[]) {
  return await Promise.all(
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
}
