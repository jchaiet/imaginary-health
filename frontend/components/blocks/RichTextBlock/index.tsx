"use client";
import React from "react";
import { RichText } from "@/components/ui/PortableTextRenderer";
import styles from "./styles.module.css";
import { useStyleClasses } from "@/lib/hooks/useStyleClasses";
import { RichTextBlockProps } from "@/types/richText";

export function RichTextBlock({ text, styleOptions }: RichTextBlockProps) {
  const classNames = useStyleClasses(styleOptions);

  return (
    <section className={`${styles.richText} ${classNames}`}>
      <article className={styles.container}>
        {text && <RichText className={styles.text} blocks={text} />}
      </article>
    </section>
  );
}
