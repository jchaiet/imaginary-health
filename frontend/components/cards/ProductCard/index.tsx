import React, { useEffect, useState } from "react";
import { RichText } from "@/lib/PortableTextRenderer";
import { resolveLinkURL, urlForImage } from "@/sanity/client";
import Image from "next/image";
import { ItemType } from "@/types";
import { ArrowRight } from "lucide-react";
import styles from "./styles.module.css";

type ProductCardProps = ItemType & {
  onHover?: () => void;
  onLeave?: () => void;
};

export function ProductCard({
  title,
  //description,
  image,
  //icon,
  callToAction,
  onHover,
  onLeave,
}: ProductCardProps) {
  const [resolvedUrl, setResolvedUrl] = useState<string | undefined>(undefined);

  useEffect(() => {
    async function resolveCtaUrl() {
      if (callToAction?.type === "link" || callToAction?.type === "download") {
        const url = await resolveLinkURL(callToAction);
        setResolvedUrl(url);
      }
    }

    resolveCtaUrl();
  }, [callToAction]);

  const imageUrl = image ? urlForImage(image).quality(100).url() : null;

  const ImageBlock = () =>
    image && imageUrl ? (
      <div className={styles.image}>
        <Image
          src={imageUrl}
          alt={image?.alt || image?.description || "Card image"}
          width={600}
          height={658}
          priority={true}
        />
      </div>
    ) : null;

  const content = (
    <div className={styles.card} onMouseEnter={onHover} onMouseLeave={onLeave}>
      {title && <RichText className={styles.title} blocks={title} />}
      {ImageBlock()}
      {callToAction && (
        <div className={styles.icon}>
          <ArrowRight />
        </div>
      )}
    </div>
  );

  return callToAction ? (
    <a
      className={styles.cardLink}
      aria-label={callToAction.ariaLabel || callToAction.label}
      href={resolvedUrl}
      target={
        callToAction.linkOptions?.linkType === "external" ? "_blank" : "_self"
      }
      rel={
        callToAction.linkOptions?.linkType === "external"
          ? "noopener noreferrer"
          : ""
      }
    >
      {content}
    </a>
  ) : (
    content
  );
}
