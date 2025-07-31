import Image from "next/image";
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

    const image = link.image?.asset?.url ? (
      <Image
        src={link.image?.asset?.url}
        alt={link.image?.asset.altText || link.ariaLabel || link.label}
        width={175}
        height={59}
      />
    ) : null;

    return {
      _key: link._key,
      label: link.label,
      ariaLabel: link.ariaLabel,
      href,
      variant: link.variant,
      displayType: link.displayType,
      imageSrc: link.image?.asset?.url,
      imageAlt: link.image?.asset.altText || link.ariaLabel || link.label,
      ImageComponent: image,
    };
  });
}
