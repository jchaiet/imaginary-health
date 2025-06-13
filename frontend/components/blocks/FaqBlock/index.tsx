"use client";
import React from "react";
import { Accordion } from "quirk-ui";
import type { AccordionItem } from "quirk-ui";
import { RichText } from "@/lib/portableTextRenderer";
import styles from "./styles.module.css";
import { useStyleClasses } from "@/lib/hooks/useStyleClasses";
import { faqBlockProps, FaqItem } from "@/types/faq";

function mapSanityToAccordionItems(items: FaqItem[]): AccordionItem[] {
  return items.map((item) => ({
    id: item._key,
    title: item.question,
    description: <RichText blocks={item.answer} />,
  }));
}

export function FaqBlock({
  heading,
  items,
  className,
  styleOptions,
}: faqBlockProps) {
  const classNames = useStyleClasses(styleOptions);

  const accordionItems = mapSanityToAccordionItems(items ?? []);

  return (
    <section className={styles.faq}>
      <article className={`${classNames} ${styles.container}`}>
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
