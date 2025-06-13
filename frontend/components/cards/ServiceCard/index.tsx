import React from "react";
import { RichText } from "@/lib/portableTextRenderer";
import { urlForImage } from "@/sanity/client";
import Image from "next/image";
import { ItemType } from "@/types";
import { ArrowRight, Play } from "lucide-react";
import styles from "./styles.module.css";
import { Modal } from "quirk-ui";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";

type ServiceCardProps = ItemType & {
  onHover?: () => void;
  onLeave?: () => void;
};

export function ServiceCard({
  style,
  variant,
  metricValue,
  title,
  description,
  image,
  //icon,
  callToAction,
  onHover,
  onLeave,
  gridArea,
}: ServiceCardProps) {
  const imageUrl = image ? urlForImage(image).quality(100).url() : null;
  const isMobile = useMediaQuery("(max-width: 768px)");

  const ImageBlock = (
    <>
      {image && imageUrl ? (
        <div className={styles.image}>
          <Image
            src={imageUrl}
            alt={image?.alt || image?.description || "Card image"}
            width={600}
            height={658}
            priority={true}
          />
        </div>
      ) : null}
    </>
  );

  return (
    <div
      className={`${styles.card} ${styles[variant]}`}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      style={gridArea && !isMobile ? { gridArea: gridArea } : {}}
    >
      <div className={styles.container}>
        {/* {ImageBlock} */}
        <div className={styles.content}>
          {title && <RichText className={styles.title} blocks={title} />}
          {description && (
            <RichText className={styles.description} blocks={description} />
          )}
        </div>
      </div>
    </div>
  );
}
