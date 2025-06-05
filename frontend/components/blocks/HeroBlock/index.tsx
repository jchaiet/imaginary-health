"use client";
import React from "react";
import { RichText } from "@/lib/portableTextRenderer";
import { CallToActions } from "@/components/ui/CallToActions";
import Image from "next/image";
import { urlForImage } from "@/sanity/client";
import { HeroBlockProps } from "@/types";
import styles from "./styles.module.css";

export function HeroBlock({
  style = "default",
  heading,
  subheading,
  image,
  callToAction,
  alignment = "left",
}: HeroBlockProps) {
  const imageUrl = image ? urlForImage(image).quality(100).url() : null;

  const textAlignClass = {
    left: styles.textLeft,
    center: styles.textCenter,
    right: styles.textRight,
  }[alignment];

  const styleClass = {
    default: styles.default,
    split: styles.split,
    fullscreen: styles.fullscreen,
  }[style];

  const ImageBlock = () =>
    image && imageUrl ? (
      <div className={styles.image}>
        <Image
          src={imageUrl}
          alt={image?.alt || image?.description || "Hero image"}
          width={600}
          height={658}
          priority={true}
        />
      </div>
    ) : null;

  //For split layouts
  if (style === "split") {
    return (
      <section className={`${styles.hero} ${styles.split} ${textAlignClass}`}>
        <article className={styles.container}>
          <div className={styles.text}>
            <div>
              <RichText className={styles.title} blocks={heading} />
              {subheading && (
                <RichText className={styles.subheading} blocks={subheading} />
              )}
            </div>
            {callToAction && (
              <CallToActions
                items={callToAction.items}
                alignment={callToAction.alignment}
              />
            )}
          </div>
          {ImageBlock()}
        </article>
      </section>
    );
  }

  //For default and full screen
  return (
    <section className={`${styles.hero} ${styleClass} ${textAlignClass}`}>
      <article className={styles.container}>
        {ImageBlock()}
        <div className={styles.text}>
          <RichText className={styles.title} blocks={heading} />

          {subheading && (
            <RichText className={styles.subheading} blocks={subheading} />
          )}
          {callToAction && (
            <CallToActions
              items={callToAction.items}
              alignment={callToAction.alignment}
            />
          )}
        </div>
      </article>
    </section>
  );
}
