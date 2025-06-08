import React from "react";
import { RichText } from "@/lib/portableTextRenderer";
import { urlForImage } from "@/sanity/client";
import Image from "next/image";
import { CardType } from "@/types";
import { Modal, Avatar } from "quirk-ui";
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
  //icon,
  callToAction,
  // onHover,
  // onLeave,
  style,
  variant,
}: CustomCardProps) {
  const imageUrl = image ? urlForImage(image).quality(100).url() : null;

  const styleClass = {
    "full-bleed": styles.fullBleed,
    text: styles.textOnly,
    "image-left": styles.imageLeft,
    "image-right": styles.imageRight,
    "image-top": styles.imageTop,
    "image-bottom": styles.imageBottom,
  }[style || "text"];

  const text = (
    <div className={styles.content}>
      {callToAction?.type === "video" ? (
        <>
          {title && <RichText className={styles.title} blocks={title} />}

          {description && (
            <RichText className={styles.description} blocks={description} />
          )}
        </>
      ) : (
        <>
          {title && <RichText className={styles.title} blocks={title} />}

          {description && (
            <RichText className={styles.description} blocks={description} />
          )}
        </>
      )}
    </div>
  );

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
            draggable={false}
          />
        </div>
      ) : null}
    </>
  );

  const content = () => {
    switch (style) {
      case "full-bleed":
        return (
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
              draggable={false}
            />
            <div className={styles.overlay}>{text}</div>
          </div>
        );
      case "image-right":
      case "image-left":
        return (
          <div className={styles.container}>
            {ImageBlock}

            <div className={styles.content}>
              {description && (
                <RichText className={styles.description} blocks={description} />
              )}
              {title && <RichText className={styles.title} blocks={title} />}
            </div>
          </div>
        );
      case "image-bottom":
        return (
          <div className={styles.container}>
            <div className={styles.content}>
              {description && (
                <RichText className={styles.description} blocks={description} />
              )}

              <div className={styles.person}>
                <Avatar src={imageUrl ?? ""} size="lg" />
                {title && <RichText className={styles.title} blocks={title} />}
              </div>
            </div>
          </div>
        );
      case "image-top":
        return (
          <div className={styles.container}>
            <Avatar src={imageUrl ?? ""} size="xl" />
            <div className={styles.content}>
              {description && (
                <RichText className={styles.description} blocks={description} />
              )}
              {title && <RichText className={styles.title} blocks={title} />}
            </div>
          </div>
        );
    }
  };

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
    <article
      className={`${styles.card} ${styleClass ?? ""} ${styles[variant]} ${typeClass}`}
    >
      {callToAction?.type !== "none" ? (
        <Container>{content()}</Container>
      ) : (
        <>{content()}</>
      )}
    </article>
  );
}
