import React from "react";
import { RichText } from "@/lib/portableTextRenderer";
import { urlForImage } from "@/sanity/client";
import Image from "next/image";
import { CardType } from "@/types";
import { ArrowRight } from "lucide-react";
import styles from "./styles.module.css";

type CustomCardProps = CardType & {
  onHover?: () => void;
  onLeave?: () => void;
};

export function CustomCard({
  title,
  description,
  image,
  icon,
  callToAction,
  onHover,
  onLeave,
}: CustomCardProps) {
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
      <RichText blocks={title} />
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
      aria-label={callToAction.label}
      href={callToAction.resolvedUrl || "#"}
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
