"use client";
import React from "react";
import { RichText } from "@/components/ui/PortableTextRenderer";
import styles from "./styles.module.css";
import { useStyleClasses } from "@/lib/hooks/useStyleClasses";
import { QuoteBlockProps } from "@/types/quote";

export function QuoteBlock({ quote, author, styleOptions }: QuoteBlockProps) {
  const classNames = useStyleClasses(styleOptions);

  return (
    <section className={`${styles.quote} ${classNames}`}>
      <article className={styles.container}>
        {quote && <RichText className={styles.quoteText} blocks={quote} />}
        {author && <p className={styles.author}>— {author}</p>}
      </article>
    </section>
  );
}
