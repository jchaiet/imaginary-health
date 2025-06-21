import React from "react";
import { RichText } from "@/lib/portableTextRenderer";
import { Modal } from "quirk-ui";
import { urlForImage } from "@/sanity/client";
import Image from "next/image";
import { ItemType } from "@/types";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";
import { FaStar } from "react-icons/fa6";

import styles from "./styles.module.css";

type CustomCardProps = ItemType & {
  onHover?: () => void;
  onLeave?: () => void;
};

export function ReviewCard({
  //style,
  variant,
  // metricValue,
  // title,
  description,
  rating,
  image,
  //icon,
  callToAction,
  onHover,
  onLeave,
  gridArea,
}: CustomCardProps) {
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

  const RatingStars = () => {
    let width = (Number(rating) / 5) * 100;

    return (
      <div className={styles.ratingOuter}>
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
        <div className={styles.ratingInner} style={{ width: `${width}%` }}>
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
        </div>
      </div>
    );
  };

  const content = (
    <div className={styles.container}>
      {ImageBlock}
      <div className={styles.content}>
        {description && (
          <RichText className={styles.description} blocks={description} />
        )}
      </div>
      {rating && (
        <div className={styles.rating}>
          {RatingStars()} <div className={styles.ratingValue}>{rating}</div>
        </div>
      )}
    </div>
  );

  const Container = ({ children }: { children: React.ReactNode }) => {
    switch (callToAction?.type) {
      case "link":
        return (
          <a
            className={styles.cardLink}
            aria-label={callToAction.ariaLabel || callToAction.label}
            href={callToAction.resolvedUrl || undefined}
            target={
              callToAction.linkOptions?.linkType === "external"
                ? "_blank"
                : "_self"
            }
            rel={
              callToAction.linkOptions?.linkType === "external"
                ? "noopener noreferrer"
                : ""
            }
          >
            {children}
          </a>
        );
      case "modal":
        return (
          <Modal
            className={styles.modalTrigger}
            trigger={children}
            content={callToAction.modalContent}
          />
        );
      case "video":
        return (
          <Modal
            className={styles.modalTrigger}
            trigger={children}
            content={<video src={callToAction.videoUrl} controls autoPlay />}
          />
        );
      case "download":
        return (
          <a
            className={styles.cardLink}
            aria-label={callToAction.ariaLabel || callToAction.label}
            href={callToAction.resolvedUrl || undefined}
            download
            target="_blank"
            rel="noopener noreferrer"
          >
            {children}
          </a>
        );
    }
  };

  return (
    <div
      className={`${styles.card} ${styles[variant]}`}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      style={gridArea && !isMobile ? { gridArea: gridArea } : {}}
    >
      {callToAction?.type !== "none" ? (
        <Container>{content}</Container>
      ) : (
        <>{content}</>
      )}
    </div>
  );
}
