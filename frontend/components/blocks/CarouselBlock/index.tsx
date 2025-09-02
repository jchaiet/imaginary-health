"use client";
import React, { useMemo, useRef, useEffect, useState } from "react";
import { Carousel } from "quirk-ui/core";
import { RichText } from "@/components/ui/PortableTextRenderer";
import { CarouselBlockProps } from "@/types";
import { SegmentCard } from "@/components/cards/SegmentCard";
import { TestimonialCard } from "@/components/cards/TestimonialCard";
import { GridCard } from "@/components/cards/GridCard";
import { BioCard } from "@/components/cards/BioCard";
import { useStyleClasses } from "@/lib/hooks/useStyleClasses";
import { FaStar } from "react-icons/fa6";

import styles from "./styles.module.css";

export function CarouselBlock({
  heading,
  carouselOptions,
  items,
  styleOptions,
}: CarouselBlockProps) {
  const [isSplit, setIsSplit] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const siblingRef = useRef<HTMLDivElement>(null);

  const classNames = useStyleClasses(styleOptions);

  useEffect(() => {
    const el = containerRef?.current;
    if (!el) return;

    const checkSplit = () => {
      const splitState = el.classList.contains("split");
      setIsSplit(splitState);
    };

    checkSplit();

    const observer = new MutationObserver(checkSplit);
    observer.observe(el, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, [containerRef]);

  const titleBlock = useMemo(
    () => <RichText className={styles.title} blocks={heading?.title} />,
    [heading?.title]
  );

  const mappedItems: React.ReactNode[] = (items ?? []).map((item) => {
    switch (item.variant) {
      case "image":
      case "grid":
        return <GridCard key={item._key} {...item} />;
      case "segment":
        return <SegmentCard key={item._key} {...item} />;
      case "testimonial":
        return <TestimonialCard key={item._key} {...item} />;
      case "bio":
        return <BioCard key={item._key} {...item} />;
      default:
        return <div key={item._key}>Unknown item type: {item._type}</div>;
    }
  });

  const RatingStars = () => {
    const width = (Number(carouselOptions?.ratingSingleton?.rating) / 5) * 100;

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

  const hasNoHeading =
    !heading?.title &&
    !heading?.description &&
    !carouselOptions?.ratingSingleton?.rating;

  return (
    <section
      className={`${classNames.replace("split", "")} ${styles.carousel}`}
    >
      <article
        ref={containerRef}
        className={`${classNames.includes("split") ? "split" : "default"} ${styles.container}`}
      >
        {!hasNoHeading && (
          <div ref={siblingRef} className={styles.heading}>
            {heading?.title && titleBlock}
            {carouselOptions?.ratingSingleton?.rating && (
              <div className={styles.rating}>
                {RatingStars()}

                <div className={styles.ratingContent}>
                  {carouselOptions?.ratingSingleton?.description ? (
                    <RichText
                      className={styles.ratingDescription}
                      blocks={carouselOptions?.ratingSingleton?.description}
                    />
                  ) : (
                    <div className={styles.ratingValue}>
                      {carouselOptions?.ratingSingleton?.rating}
                    </div>
                  )}
                </div>
              </div>
            )}
            {heading?.description && (
              <RichText
                className={styles.description}
                blocks={heading?.description}
              />
            )}
          </div>
        )}

        <div className={styles.carousel}>
          {mappedItems && (
            <Carousel
              autoplay={carouselOptions?.autoplay}
              autoplayInterval={carouselOptions?.autoplayInterval}
              itemsPerPage={carouselOptions?.itemsPerPage}
              itemsPerRow={carouselOptions?.itemsPerRow}
              items={mappedItems}
              externalRef={containerRef as React.RefObject<HTMLElement>}
              siblingRef={siblingRef as React.RefObject<HTMLElement>}
              isSplit={isSplit}
              className={styles.carouselComponent}
            />
          )}
        </div>
      </article>
    </section>
  );
}
