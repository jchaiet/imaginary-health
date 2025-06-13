"use client";
import React, { useMemo, useState } from "react";
import { Grid } from "quirk-ui";
import { RichText } from "@/lib/portableTextRenderer";
import { CardGridBlockProps } from "@/types";
import styles from "./styles.module.css";
import { PortableTextBlock } from "next-sanity";
import { ProductCard } from "@/components/cards/ProductCard";
import { GridCard } from "@/components/cards/GridCard";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";
import { useStyleClasses } from "@/lib/hooks/useStyleClasses";
import { ServiceCard } from "@/components/cards/ServiceCard";

export function CardGridBlock({
  heading,
  columns,
  gap,
  areas,
  //autoFitMinMax,
  items,
  className,
  textReplaceOnHover = true,
  styleOptions,
}: CardGridBlockProps) {
  const [hoveredText, setHoveredText] = useState<string | null>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const classNames = useStyleClasses(styleOptions);

  function extractSpanText(blocks: PortableTextBlock[]): string | null {
    for (const block of blocks) {
      if (!block.children || !block.markDefs) continue;

      for (const child of block.children) {
        if (!child?.marks) continue;

        for (const markId of child.marks) {
          const matchingDef = block.markDefs.find((def) => def._key === markId);

          if (matchingDef && matchingDef._type === "coloredText") {
            return child.text;
          }
        }
      }
    }

    return null;
  }

  const gridAreas = useMemo(() => {
    if (!areas) return undefined;
    if (isMobile) return undefined;

    return areas.map((row) => row.trim().split(/\s+/));
  }, [areas, isMobile]);

  const titleBlock = useMemo(
    () => (
      <RichText
        className={styles.title}
        textOverride={hoveredText ?? ""}
        animateText={heading?.animateText ?? false}
        blocks={heading?.title}
      />
    ),
    [heading?.title, hoveredText, heading?.animateText]
  );

  return (
    <section className={styles.cardGrid}>
      <article className={`${classNames} ${styles.container}`}>
        <div className={styles.text}>
          {heading?.title && titleBlock}
          {heading?.description && (
            <RichText
              className={styles.description}
              blocks={heading?.description}
            />
          )}
        </div>
        <div
          className={`${styles.grid} ${className && styles[className] ? styles[className] : (className ?? "")}`}
        >
          <Grid columns={columns} gap={gap} areas={gridAreas}>
            {items?.map((item) => {
              const titleText = item.title ? extractSpanText(item.title) : "";

              const commonProps = {
                gridArea: item.gridArea,
                onHover: () => {
                  if (textReplaceOnHover) setHoveredText(titleText);
                },
                ...item,
              };
              switch (item.variant) {
                case "service":
                  return <ServiceCard key={item._key} {...commonProps} />;
                case "grid":
                  return <GridCard key={item._key} {...commonProps} />;
                case "image":
                  return <GridCard key={item._key} {...commonProps} />;
                case "product":
                  return <ProductCard key={item._key} {...commonProps} />;
                default:
                  return (
                    <div key={item._key}>Unknown item type: {item._type}</div>
                  );
              }
            })}
          </Grid>
        </div>
      </article>
    </section>
  );
}
