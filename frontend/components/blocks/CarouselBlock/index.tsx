"use client";
import React, { useMemo, useRef, useEffect, useState } from "react";
import { Carousel } from "quirk-ui";
import { RichText } from "@/components/ui/PortableTextRenderer";
import { CarouselBlockProps } from "@/types";
import { SegmentCard } from "@/components/cards/SegmentCard";
import { TestimonialCard } from "@/components/cards/TestimonialCard";
import { GridCard } from "@/components/cards/GridCard";
import { useStyleClasses } from "@/lib/hooks/useStyleClasses";
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
      setIsSplit(el.classList.contains("split"));
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
      default:
        return <div key={item._key}>Unknown item type: {item._type}</div>;
    }
  });

  return (
    <section
      className={`${classNames.replace("split", "")} ${styles.carousel}`}
    >
      <article
        ref={containerRef}
        className={`${classNames.includes("split") ? "split" : "default"} ${styles.container}`}
      >
        <div ref={siblingRef} className={styles.heading}>
          {heading?.title && titleBlock}
          {heading?.description && (
            <RichText
              className={styles.description}
              blocks={heading?.description}
            />
          )}
        </div>

        <div className={styles.carousel}>
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
        </div>
      </article>
    </section>
  );
}
