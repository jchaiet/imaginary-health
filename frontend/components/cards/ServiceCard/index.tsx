import React from "react";
import { RichText } from "@/lib/PortableTextRenderer";
//import { urlForImage } from "@/sanity/client";
import { ItemType } from "@/types";
import styles from "./styles.module.css";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";

type ServiceCardProps = ItemType & {
  onHover?: () => void;
  onLeave?: () => void;
};

export function ServiceCard({
  variant,
  title,
  description,
  //image,
  //icon,
  onHover,
  onLeave,
  gridArea,
}: ServiceCardProps) {
  //const imageUrl = image ? urlForImage(image).quality(100).url() : null;
  const isMobile = useMediaQuery("(max-width: 768px)");

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
