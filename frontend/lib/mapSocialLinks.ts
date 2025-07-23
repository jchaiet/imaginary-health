import React from "react";
import { SocialLink, NavigationItem } from "@/types";
import type { NavItem } from "quirk-ui";

export type SocialNavItem = NavItem & { icon: React.ElementType };

export async function mapSocialLinks(
  socialLinks: SocialLink[]
): Promise<NavItem[]> {
  return socialLinks.map((link) => {
    return {
      _key: link._key,
      label: link.platform,
      isExternal: true,
      href: link.url,
      icon: link.platform,
    };
  });
}
