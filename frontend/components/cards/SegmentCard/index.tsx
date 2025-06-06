import React, { useRef, useEffect } from "react";
import { RichText } from "@/lib/portableTextRenderer";
import { urlForImage } from "@/sanity/client";
import Image from "next/image";
import { CardType } from "@/types";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";
import styles from "./styles.module.css";

type CustomCardProps = CardType & {
  onHover?: () => void;
  onLeave?: () => void;
};

export function SegmentCard({
  title,
  description,
  image,
  // icon,
  // callToAction,
  onHover,
  onLeave,
}: CustomCardProps) {
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
      (slide as HTMLElement).style.transition = "flex-basis 300ms ease";
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

  return (
    <article
      className={styles.card}
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.imageBackgroundContainer}>
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
          </div>
        </div>
      </div>
    </article>
  );
}
