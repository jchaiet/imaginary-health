import type { NavigationItem, SpotlightProps } from "@/types";
import type { NavGroup } from "quirk-ui/core";
import { mapNavigation } from "./mapNavigation";
import { urlForImage } from "@/sanity/client";

export async function mapGroups(
  groups: {
    _key: string;
    title: string;
    primaryItems: NavigationItem[];
    secondaryItems: NavigationItem[];
    spotlight: SpotlightProps;
  }[]
): Promise<NavGroup[]> {
  return await Promise.all(
    groups.map(async (group) => {
      const primaryItems = await mapNavigation(group.primaryItems);
      const secondaryItems = group.secondaryItems
        ? await mapNavigation(group.secondaryItems)
        : undefined;

      const spotlight: SpotlightProps = {
        ...group.spotlight,
        title: group.spotlight.title
          ? {
              type: "portableText",
              content: Array.isArray(group.spotlight.title)
                ? group.spotlight.title
                : [group.spotlight.title],
            }
          : undefined,
        description: group.spotlight.description
          ? {
              type: "portableText",
              content: Array.isArray(group.spotlight.description)
                ? group.spotlight.description
                : [group.spotlight.description],
            }
          : undefined,
        image: group.spotlight.image
          ? {
              ...group.spotlight.image,
              imageUrl: urlForImage(group.spotlight?.image)
                .width(600)
                .quality(90)
                .url(),
            }
          : undefined,
      };

      return {
        _key: group._key,
        title: group.title,
        primaryItems,
        secondaryItems,
        spotlight,
      };
    })
  );
}
