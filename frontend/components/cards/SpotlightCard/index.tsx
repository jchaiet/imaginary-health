import React from "react";
import Image from "next/image";
import { CallToAction } from "quirk-ui";
import { SpotlightProps } from "@/types";
import { RichText } from "@/components/ui/PortableTextRenderer";
import { urlForImage } from "@/sanity/client";
import styles from "./styles.module.css";

interface SpotlightCardProps {
  spotlight: SpotlightProps;
}

export function SpotlightCard({ spotlight }: SpotlightCardProps) {
  const imageUrl =
    spotlight.image && urlForImage(spotlight.image).quality(100).url();
  const alt = spotlight.image?.alt;

  const isExternal =
    spotlight.callToAction.linkOptions?.linkType === "external";
  let href = "#";

  if (
    spotlight.callToAction.linkOptions?.linkType === "external" &&
    spotlight.callToAction.linkOptions?.externalUrl
  ) {
    href = spotlight.callToAction.linkOptions?.externalUrl;
  } else if (
    spotlight.callToAction.linkOptions?.linkType === "internal" &&
    spotlight.callToAction.linkOptions?.internalUrl?.slug.current
  ) {
    href = `/${spotlight.callToAction.linkOptions?.internalUrl?.slug.current}`;
  }

  console.log("CTA", href);
  return (
    <div className={styles.spotlight}>
      {spotlight.image && (
        <div className={styles.imageWrapper}>
          <Image
            src={imageUrl ?? ""}
            alt={alt || spotlight.image.description || "Content image"}
            width={600}
            height={400}
            priority={true}
          />
        </div>
      )}

      <div className={styles.content}>
        <div>
          <RichText className={styles.title} blocks={spotlight.title} />
        </div>

        {spotlight.description && (
          <div>
            <RichText
              className={styles.description}
              blocks={spotlight.description}
            />
          </div>
        )}
      </div>

      {spotlight.callToAction?.linkOptions && (
        <div className={styles.actions}>
          <CallToAction
            as="a"
            variant={spotlight.callToAction.variant ?? "primary"}
            href={href}
            target={isExternal ? "_blank" : "_self"}
            rel={isExternal ? "noopener noreferrer" : ""}
            aria-label={
              spotlight.callToAction.ariaLabel || spotlight.callToAction.label
            }
          >
            {spotlight.callToAction.label}
          </CallToAction>
        </div>
      )}
    </div>
  );
}
