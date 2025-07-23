import type { Navigation } from "@/types/navigation";
import type { NavigationItem } from "@/types/navigationItem";
import type { NavItem } from "quirk-ui";
import { ExternalLink } from "lucide-react";

async function resolveNavItemHref(item: NavigationItem): Promise<string> {
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

export async function mapNavigation(navData: Navigation): Promise<NavItem[]> {
  const navItems = await Promise.all(
    navData.primaryItems.map(async (item) => {
      const label = item.title;
      const key = item._key;

      if (
        (item.itemType === "list" || item.itemType === "dropdown") &&
        item.children?.length
      ) {
        const subLinks = await Promise.all(
          item.children.map(async (child) => {
            const href = await resolveNavItemHref(child);

            if (!href) return null;
            return {
              _key: child._key,
              label: child.title,
              href,
              isExternal: child.itemType === "external",
            };
          })
        );

        const validSubLinks = subLinks.filter(Boolean) as {
          _key: string;
          label: string;
          href: string;
        }[];

        return {
          _key: key,
          label,
          sublinks: validSubLinks,
        };
      }

      const href = await resolveNavItemHref(item);
      if (href) {
        return {
          _key: key,
          label,
          href,
          isExternal: item.itemType === "external",
        };
      }

      return null;
    })
  );

  return navItems.filter(Boolean) as NavItem[];
}
