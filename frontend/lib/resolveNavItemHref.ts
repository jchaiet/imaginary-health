import type { NavigationItem } from "@/types";

export async function resolveNavItemHref(
  item: NavigationItem
): Promise<string> {
  if (item.itemType === "external" && item.externalUrl) {
    return item.externalUrl;
  }

  if (item.itemType === "internal" && item.internalUrl?.slug?.current) {
    if (item.internalUrl?.slug?.current) {
      return `/${item.internalUrl.slug.current}`;
    }
  }

  return "#";
}
