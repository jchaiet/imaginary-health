import type { Navigation } from "@/types/navigation";
import type { NavItem } from "quirk-ui";
import { resolveNavItemHref } from "./resolveNavItemHref";
import { NavigationItem } from "@/types";

export async function mapNavigation(
  items: NavigationItem[]
): Promise<NavItem[]> {
  const navItems = await Promise.all(
    items.map(async (item) => {
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
