import React from "react";
import { RichText } from "@/lib/portableTextRenderer";
import { urlForImage } from "@/sanity/client";
import Image from "next/image";
import { ItemType } from "@/types";
import { ArrowRight, Play } from "lucide-react";
import styles from "./styles.module.css";
import { Modal } from "quirk-ui";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";

type CustomCardProps = ItemType & {
  onHover?: () => void;
  onLeave?: () => void;
};

export function GridCard({
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
}: CustomCardProps) {
  const imageUrl = image ? urlForImage(image).quality(100).url() : null;
  const isMobile = useMediaQuery("(max-width: 768px)");

  const styleClass = {
    "full-bleed": styles.fullBleed,
    text: styles.textOnly,
    metric: styles.metric,
    "image-left": styles.imageLeft,
    "image-right": styles.imageRight,
    "image-top": styles.imageTop,
    "image-bottom": styles.imageBottom,
  }[style || "text"];

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

  const Metric = ({ value }: { value: string }) => {
    if (value && value.includes("%")) {
      const size = 125;
      const radius = (size - 10) / 2;
      const circumference = 2 * Math.PI * radius;
      const offset = circumference - (parseFloat(value) / 100) * circumference;

      return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <circle
            className={styles.outerCircle}
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
          />
          <circle
            className={styles.innerCircle}
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
          />
          <text
            className={styles.metricLabel}
            x="50%"
            y="52%"
            dominantBaseline="middle"
            textAnchor="middle"
          >
            {value}
          </text>
        </svg>
      );
    }
    return <div className={styles.metric}></div>;
  };

  const content = (
    <>
      <div className={styles.container}>
        {variant !== "image" && (
          <div className={styles.content}>
            {metricValue && <Metric value={metricValue} />}
            {title && <RichText className={styles.title} blocks={title} />}
            {description && (
              <RichText className={styles.description} blocks={description} />
            )}
          </div>
        )}
        {ImageBlock}
      </div>

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
    </>
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
      className={`${styles.card} ${styleClass ?? ""} ${styles[variant]}`}
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
