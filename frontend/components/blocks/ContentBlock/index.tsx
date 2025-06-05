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
  callToAction,
  styleOptions,
}: ContentBlockProps) {
  const imageUrl =
    image && image.asset ? urlForImage(image).quality(100).url() : null;

  const classNames = useStyleClasses(styleOptions);

  const style = {
    "--max-width": image?.maxWidth,
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
    "full-width": styles.fullWidth,
  }[image?.display ?? "default"];

  return (
    <section className={`${classNames} ${styles.content}`}>
      <div className={`${styles.container} ${layoutClass}`}>
        <div className={`${styles.heading} ${headingLayoutClass}`}>
          <RichText className={styles.title} blocks={heading.title} />

          {(heading.description || callToAction) && (
            <div className={styles.text}>
              {heading.description && (
                <RichText
                  className={styles.description}
                  blocks={heading.description}
                />
              )}
              {callToAction && (
                <CallToActions
                  className={styles.cta}
                  items={callToAction.items}
                  alignment={callToAction.alignment}
                />
              )}
            </div>
          )}
        </div>
        {image && imageUrl && (
          <div className={`${styles.image} ${imageDisplayClass}`} style={style}>
            <Image
              src={imageUrl}
              alt={image?.alt || image?.description || "Content image"}
              width={600}
              height={400}
              priority={true}
            />
          </div>
        )}
      </div>
    </section>
  );
}
