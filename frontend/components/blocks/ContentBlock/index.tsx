"use client";
import React from "react";
import { RichText } from "@/lib/portableTextRenderer";
import { CallToActions } from "@/components/ui/CallToActions";
import Image from "next/image";
import { urlForImage } from "@/sanity/client";
import { ContentBlockProps } from "@/types/content";
import { useStyleClasses } from "@/lib/hooks/useStyleClasses";
import styles from "./styles.module.css";

export function ContentBlock({
  layout = "horizontal-image-right",
  heading,
  image,
  video,
  metrics,
  callToAction,
  disclaimer,
  styleOptions,
}: ContentBlockProps) {
  const imageUrl =
    image && image.asset ? urlForImage(image).quality(100).url() : null;

  const classNames = useStyleClasses(styleOptions);

  const style = {
    "--max-width": image?.display === "max-width" ? image?.maxWidth : "unset",
  } as React.CSSProperties;

  const layoutClass = {
    "horizontal-image-right": styles.layoutHImageRight,
    "horizontal-image-left": styles.layoutHImageLeft,
    "vertical-image-top": styles.layoutVImageTop,
    "vertical-image-bottom": styles.layoutVImageBottom,
  }[layout ?? "horizontal-image-right"];

  const headingLayoutClass = {
    horizontal: styles.headingHorizontal,
    vertical: styles.headingVertical,
  }[heading.headingLayout ?? "horizontal"];

  const imageDisplayClass = {
    default: styles.default,
    "max-width": styles.maxWidth,
    "full-bleed": styles.fullBleed,
  }[image?.display ?? "default"];

  const VideoBlock = () => {
    if (!video) return null;

    const isVimeo = video.includes("vimeo.com");
    const isYouTube =
      video.includes("youtube.com") || video.includes("youtu.be");

    if (isVimeo || isYouTube) {
      return (
        <div style={{ maxWidth: image?.maxWidth ?? "unset" }}>
          <div className={styles.videoWrapper}>
            <iframe
              src={
                isVimeo
                  ? `${video}?autoplay=0&muted=0&loop=0`
                  : `${video}?autoplay=0&mute=0&loop=0}`
              }
              className={styles.video}
              allow="autoplay; fullscreen"
              allowFullScreen
            />
          </div>
        </div>
      );
    }

    return (
      <div style={{ maxWidth: image?.maxWidth ?? "unset", width: "100%" }}>
        <div className={styles.videoWrapper}>
          <video
            className={styles.video}
            src={video}
            controls
            poster={imageUrl || undefined}
          />
        </div>
      </div>
    );
  };

  return (
    <section className={`${classNames} ${styles.content}`}>
      <article className={`${styles.container} ${layoutClass}`}>
        <div className={`${styles.heading} ${headingLayoutClass}`}>
          <RichText className={styles.title} blocks={heading.title} />

          {(heading.description || callToAction.items) && (
            <div className={styles.text}>
              {heading.description && (
                <RichText
                  className={styles.description}
                  blocks={heading.description}
                />
              )}
              {metrics && (
                <div className={styles.metrics}>
                  {metrics.map((metric) => (
                    <div key={metric._key} className={styles.metric}>
                      <div className={styles.metricValue}>
                        {metric.metricValue}
                      </div>
                      {metric.metricDescription && (
                        <RichText
                          className={styles.metricDescription}
                          blocks={metric.metricDescription}
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}

              {callToAction && (
                <CallToActions
                  className={styles.cta}
                  items={callToAction.items}
                  alignment={callToAction.alignment}
                />
              )}
              {disclaimer && (
                <RichText className={styles.disclaimer} blocks={disclaimer} />
              )}
            </div>
          )}
        </div>
        {video
          ? VideoBlock()
          : image &&
            imageUrl && (
              <div
                className={`${styles.image} ${imageDisplayClass}`}
                style={style}
              >
                <Image
                  src={imageUrl}
                  alt={image?.alt || image?.description || "Content image"}
                  width={600}
                  height={400}
                  priority={true}
                />
              </div>
            )}
      </article>
    </section>
  );
}
