"use client";
import React, { useState, useEffect, useRef } from "react";
import { RichText } from "@/lib/portableTextRenderer";
import { CallToActions } from "@/components/ui/CallToActions";
import Image from "next/image";
import { Pause, Play } from "lucide-react";
import { urlForImage } from "@/sanity/client";
import { HeroBlockProps } from "@/types";
import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";
import styles from "./styles.module.css";

export function HeroBlock({
  style = "default",
  heading,
  image,
  video,
  callToAction,
  alignment = "left",
}: HeroBlockProps) {
  const imageUrl = image ? urlForImage(image).quality(100).url() : null;
  const prefersReducedMotion = usePrefersReducedMotion();

  const [isPlaying, setIsPlaying] = useState(!prefersReducedMotion);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  const textAlignClass = {
    left: styles.textLeft,
    center: styles.textCenter,
    right: styles.textRight,
  }[alignment];

  const styleClass = {
    default: styles.default,
    split: styles.split,
    "full-bleed": styles.fullBleed,
  }[style];

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      if (prefersReducedMotion) {
        video.pause();
      } else {
        video.play();
      }
    }
  }, [prefersReducedMotion]);

  const VideoBlock = () => {
    if (!video) return null;

    const isVimeo = video.includes("vimeo.com");
    const isYouTube =
      video.includes("youtube.com") || video.includes("youtu.be");

    if (isVimeo || isYouTube) {
      return (
        <div className={styles.videoWrapper}>
          <iframe
            src={
              isVimeo
                ? `${video}?autoplay=1&muted=1&loop=1&background=1`
                : `${video}?autoplay=1&mute=1&loop=1&playlist=${getYouTubeVideoId(video)}`
            }
            className={styles.video}
            allow="autoplay; fullscreen"
            allowFullScreen
          />
        </div>
      );
    }

    return (
      <div className={styles.videoWrapper}>
        {videoControl}
        <video
          ref={videoRef}
          className={styles.video}
          src={video}
          autoPlay={!prefersReducedMotion}
          loop
          muted
          playsInline
          poster={imageUrl || undefined}
        />
      </div>
    );
  };

  const videoControl = (
    <button
      className={styles.videoControl}
      onClick={() => {
        const video = videoRef.current;
        if (!video) return;

        if (video.paused) {
          video.play().catch(() => {});
          setIsPlaying(true);
        } else {
          video.pause();
          setIsPlaying(false);
        }
      }}
    >
      {isPlaying ? <Pause size={18} /> : <Play size={18} />}
    </button>
  );

  function getYouTubeVideoId(url: string): string {
    const match = url.match(/(?:youtube\.com\/.*v=|youtu\.be\/)([^&?/]+)/);

    return match?.[1] || "";
  }

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
              {heading.eyebrow && (
                <RichText className={styles.eyebrow} blocks={heading.eyebrow} />
              )}
              <RichText className={styles.title} blocks={heading.title} />
            </div>

            {heading.description && (
              <RichText
                className={styles.subheading}
                blocks={heading.description}
              />
            )}
            {callToAction && (
              <CallToActions
                items={callToAction.items}
                alignment={callToAction.alignment}
              />
            )}
            {heading.disclaimer && (
              <RichText
                className={styles.disclaimer}
                blocks={heading.disclaimer}
              />
            )}
          </div>
          {video ? VideoBlock() : ImageBlock()}
        </article>
      </section>
    );
  }

  if (style === "default") {
    return (
      <section className={`${styles.hero} ${styleClass} ${textAlignClass}`}>
        <article className={styles.container}>
          {video ? VideoBlock() : ImageBlock()}
          <div className={styles.text}>
            <RichText className={styles.title} blocks={heading.title} />

            {heading.description && (
              <RichText
                className={styles.subheading}
                blocks={heading.description}
              />
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

  if (style === "full-bleed") {
    return (
      <section className={`${styles.hero} ${styleClass} ${textAlignClass}`}>
        <article className={styles.container}>
          {video ? (
            video.includes("vimeo.com") ||
            video.includes("youtube.com") ||
            video.includes("youtu.be") ? (
              <div className={styles.videoBackground}>
                <iframe
                  src={
                    video.includes("vimeo.com")
                      ? `${video}?autoplay=1&muted=1&loop=1&background=1`
                      : `${video}?autoplay=1&mute=1&loop=1&playlist=${getYouTubeVideoId(video)}`
                  }
                  className={styles.iframe}
                  allow="autoplay; fullscreen"
                  allowFullScreen
                />
              </div>
            ) : (
              <>
                {videoControl}

                <video
                  ref={videoRef}
                  className={styles.videoBackground}
                  src={video}
                  autoPlay={!prefersReducedMotion}
                  loop
                  muted
                  playsInline
                  poster={imageUrl || undefined}
                />
              </>
            )
          ) : (
            <Image
              src={imageUrl ?? ""}
              alt={image?.alt || image?.description || "Card image"}
              fill
              priority={false}
              style={{ objectFit: "cover" }}
              draggable={false}
            />
          )}

          <div className={styles.overlay}>
            <div className={styles.text}>
              <RichText className={styles.title} blocks={heading.title} />

              {heading.description && (
                <RichText
                  className={styles.subheading}
                  blocks={heading.description}
                />
              )}
              {callToAction && (
                <CallToActions
                  items={callToAction.items}
                  alignment={callToAction.alignment}
                />
              )}
            </div>
          </div>
        </article>
      </section>
    );
  }
}
