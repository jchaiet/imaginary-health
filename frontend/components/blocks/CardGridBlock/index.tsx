"use client";
import React, { useMemo, useState } from "react";
import { Grid } from "quirk-ui";
import { RichText } from "@/lib/portableTextRenderer";
import { CardGridProps } from "@/types";
import { CustomCard } from "@/components/cards/CustomCard";
import styles from "./styles.module.css";
import { PortableTextBlock } from "next-sanity";

export function CardGridBlock({
  titleOptions,
  description,
  columns,
  gap,
  autoFitMinMax,
  cards,
  textReplaceOnHover = true,
}: CardGridProps) {
  const [hoveredText, setHoveredText] = useState<string | null>(null);

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

  const titleBlock = useMemo(
    () => (
      <RichText
        className={styles.title}
        textOverride={hoveredText || ""}
        animateText={titleOptions.animateText}
        blocks={titleOptions.title}
      />
    ),
    [titleOptions.title, hoveredText, titleOptions.animateText]
  );

  return (
    <section className={`${styles.cardGrid}`}>
      <article className={styles.container}>
        <div className={styles.text}>
          {titleBlock}
          {/* <RichText
            className={styles.title}
            textOverride={hoveredText || ""}
            animateText={titleOptions.animateText}
            blocks={titleOptions.title}
          /> */}
          <RichText className={styles.title} blocks={description} />
        </div>
        <div className={styles.grid}>
          <Grid columns={columns} gap={gap}>
            {cards?.map((card) => {
              const titleText = extractSpanText(card.title);
              switch (card._type) {
                case "customCard":
                  return (
                    <CustomCard
                      key={card._key}
                      {...card}
                      onHover={() => {
                        if (textReplaceOnHover) setHoveredText(titleText);
                      }}
                    />
                  );
                default:
                  return (
                    <div key={card._key}>Unknown card type: {card._type}</div>
                  );
              }
            })}
          </Grid>
        </div>
      </article>
    </section>
  );
}
