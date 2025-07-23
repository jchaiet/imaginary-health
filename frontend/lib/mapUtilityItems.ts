import type { Link } from "@/types";
import type { UtilityItem } from "quirk-ui";

export async function mapUtilityItems(links: Link[]): Promise<UtilityItem[]> {
  return links.map((link) => {
    const linkOptions = link.linkOptions;

    let href = "#";
    if (
      linkOptions?.linkType === "internal" &&
      linkOptions.internalUrl?.slug?.current
    ) {
      href = `/${linkOptions.internalUrl.slug.current}`;
    } else if (
      linkOptions?.linkType === "external" &&
      linkOptions?.externalUrl
    ) {
      href = linkOptions.externalUrl;
    }

    return {
      _key: link._key,
      label: link.label,
      ariaLabel: link.ariaLabel,
      href,
      variant: link.variant,
      displayType: link.displayType,
      imageSrc: link.image?.asset?.url,
      imageAlt: link.image?.asset.altText || link.ariaLabel || link.label,
    };
  });
}
