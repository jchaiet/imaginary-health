import React from "react";
import { RichText } from "@/lib/portableTextRenderer";
import { urlForImage } from "@/sanity/client";
import Image from "next/image";
import { CardType } from "@/types";
import { Modal } from "quirk-ui";
import { Play } from "lucide-react";

import styles from "./styles.module.css";

type CustomCardProps = CardType & {
  onHover?: () => void;
  onLeave?: () => void;
};

export function TestimonialCard({
  title,
  description,
  image,
  icon,
  callToAction,
  onHover,
  onLeave,
}: CustomCardProps) {
  const imageUrl = image ? urlForImage(image).quality(100).url() : null;

  const content = (
    <div className={styles.imageBackgroundContainer}>
      {callToAction?.type === "video" && (
        <div className={styles.cardIcon}>
          <Play size={45} />
        </div>
      )}
      <Image
        src={imageUrl ?? ""}
        alt={image?.alt || image?.description || "Card image"}
        fill
        priority={false}
        style={{ objectFit: "cover" }}
      />
      <div className={styles.overlay}>
        <div>
          {title && <RichText className={styles.title} blocks={title} />}
          {description && (
            <RichText className={styles.text} blocks={description} />
          )}
        </div>{" "}
      </div>
    </div>
  );

  const typeClass =
    callToAction?.type === "video" ? styles.video : styles.default;

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
    <article className={`${styles.card} ${typeClass}`}>
      {callToAction?.type !== "none" ? (
        <Container>{content}</Container>
      ) : (
        <>{content}</>
      )}
    </article>
  );
}
