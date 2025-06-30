"use client";
import React from "react";
import { Accordion } from "quirk-ui";
import type { AccordionItem } from "quirk-ui";
import { RichText } from "@/lib/PortableTextRenderer";
import styles from "./styles.module.css";
import { useStyleClasses } from "@/lib/hooks/useStyleClasses";
import { AccordionBlockProps, AccordionItem as Item } from "@/types";

function mapSanityToAccordionItems(items: Item[]): AccordionItem[] {
  return items.map((item) => ({
    id: item._key,
    title: item.title,
    description: <RichText blocks={item.content} />,
  }));
}

export function AccordionBlock({
  heading,
  items,
  className,
  styleOptions,
}: AccordionBlockProps) {
  const classNames = useStyleClasses(styleOptions);

  const accordionItems = mapSanityToAccordionItems(items ?? []);

  return (
    <section className={`${styles.accordion} ${classNames}`}>
      <article
        className={`${classNames.includes("split") ? "split" : "default"} ${styles.container}`}
      >
        <div className={styles.text}>
          {heading.title && (
            <RichText className={styles.title} blocks={heading?.title} />
          )}
          {heading.description && (
            <RichText
              className={styles.description}
              blocks={heading.description}
            />
          )}
        </div>
        <div
          className={`${styles.content} ${className && styles[className] ? styles[className] : (className ?? "")}`}
        >
          <Accordion items={accordionItems} multiple={true} />
        </div>
      </article>
    </section>
  );
}
