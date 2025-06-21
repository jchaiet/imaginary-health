"use client";
import React from "react";
import { RichText } from "@/lib/portableTextRenderer";
import styles from "./styles.module.css";
import { useStyleClasses } from "@/lib/hooks/useStyleClasses";
import { DisclaimerBlockProps } from "@/types/disclaimer";

export function DisclaimerBlock({
  disclaimer,
  styleOptions,
}: DisclaimerBlockProps) {
  const classNames = useStyleClasses(styleOptions);

  return (
    <section className={`${styles.disclaimer} ${classNames}`}>
      <article className={styles.container}>
        {disclaimer && (
          <RichText className={styles.disclaimerText} blocks={disclaimer} />
        )}
      </article>
    </section>
  );
}
