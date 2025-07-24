import type { NavigationItem } from "@/types";

export async function resolveNavItemHref(
  item: NavigationItem
): Promise<string> {
  if (item.itemType === "external" && item.externalLink) {
    return item.externalLink;
  }

  if (item.itemType === "internal" && item.internalLink?.slug?.current) {
    if (item.internalLink?.slug?.current) {
      return `/${item.internalLink.slug.current}`;
    }
  }

  return "#";
}
