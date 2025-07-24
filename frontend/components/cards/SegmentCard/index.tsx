import React, { useRef, useEffect, useState } from "react";
import { RichText } from "@/components/ui/PortableTextRenderer";
import { resolveLinkURL, urlForImage } from "@/sanity/client";
import Image from "next/image";
import { ArrowRight, Play } from "lucide-react";
import { Modal } from "quirk-ui";
import { ItemType } from "@/types";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";
import styles from "./styles.module.css";

type CustomCardProps = ItemType & {
  onHover?: () => void;
  onLeave?: () => void;
};

export function SegmentCard({
  title,
  description,
  image,
  // icon,
  callToAction,
  onHover,
  onLeave,
}: CustomCardProps) {
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
  const cardRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        const cardParent = cardRef.current?.parentElement;
        const cardParents = cardParent?.parentElement?.children;

        if (!cardParent || !cardParents) return;

        if (window.innerWidth < 768) {
          Array.from(cardParents).forEach((slide) => {
            (slide as HTMLElement).style.flexBasis = "100%";
          });
        } else {
          Array.from(cardParents).forEach((slide) => {
            (slide as HTMLElement).style.flexBasis = "calc(100% / 3)";
          });
        }
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const applyTransitionToSiblings = (siblings: HTMLCollection) => {
    Array.from(siblings).forEach((slide) => {
      (slide as HTMLElement).style.transition = "flex-basis 300ms ease-in-out";
    });
  };

  const handleMouseEnter = () => {
    if (isMobile) return;

    const cardParent = cardRef.current?.parentElement;
    const cardSiblings = cardParent?.parentElement?.children;

    if (!cardParent || !cardSiblings) return;

    applyTransitionToSiblings(cardSiblings);

    Array.from(cardSiblings).forEach((slide) => {
      (slide as HTMLElement).style.flexBasis =
        slide === cardParent ? "50%" : "25%";
    });

    if (onHover) onHover();
  };

  const handleMouseLeave = () => {
    if (isMobile) return;

    const cardParent = cardRef.current?.parentElement;
    const cardSiblings = cardParent?.parentElement?.children;

    if (!cardParent || !cardSiblings) return;

    applyTransitionToSiblings(cardSiblings);

    Array.from(cardSiblings).forEach((slide) => {
      (slide as HTMLElement).style.flexBasis = isMobile
        ? "80%"
        : "calc(100% / 3)";
    });

    if (onLeave) onLeave();
  };

  const Container = ({ children }: { children: React.ReactNode }) => {
    switch (callToAction?.type) {
      case "link":
        return (
          <a
            className={styles.cardLink}
            aria-label={callToAction.ariaLabel || callToAction.label}
            href={resolvedUrl}
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
            href={resolvedUrl}
            download
            target="_blank"
            rel="noopener noreferrer"
          >
            {children}
          </a>
        );
    }
  };

  const content = (
    <div className={styles.imageBackgroundContainer}>
      {callToAction?.videoUrl && (
        <div className={styles.callToAction}>
          <div className={styles.label}>{callToAction.label}</div>
          <div className={styles.cardIcon}>
            <Play size={45} />
          </div>
        </div>
      )}

      {callToAction?.type === "link" && (
        <div className={styles.callToAction}>
          <div className={styles.label}>{callToAction.label}</div>
          <div className={styles.cardIcon}>
            <ArrowRight size={45} />
          </div>
        </div>
      )}
      <Image
        src={imageUrl ?? ""}
        alt={image?.alt || image?.description || "Card image"}
        fill
        priority={false}
        style={{ objectFit: "cover" }}
        sizes="(min-width: 500px) 500px, 100vw"
      />
      <div className={styles.overlay}>
        <div>
          {title && <RichText className={styles.title} blocks={title} />}
          {description && (
            <RichText className={styles.text} blocks={description} />
          )}
        </div>
      </div>
    </div>
  );

  return (
    <article
      className={styles.card}
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {callToAction?.type !== "none" ? (
        <Container>{content}</Container>
      ) : (
        <>{content}</>
      )}
    </article>
  );
}
