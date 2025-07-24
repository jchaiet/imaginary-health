import { SpotlightCard } from "@/components/cards/SpotlightCard";
import type { NavigationItem, SpotlightProps } from "@/types";
import type { NavGroup } from "quirk-ui";
import { mapNavigation } from "./mapNavigation";

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

      return {
        _key: group._key,
        title: group.title,
        primaryItems,
        secondaryItems,
        spotlight: <SpotlightCard spotlight={group.spotlight} />,
      };
    })
  );
}
