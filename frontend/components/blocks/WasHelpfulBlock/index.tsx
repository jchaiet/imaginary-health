"use client";
import { useEffect, useState } from "react";
import { ButtonGroup, CallToAction } from "quirk-ui/core";
import { WasHelpfulProps } from "@/types";

import styles from "./styles.module.css";

export default function WasHelpfulBlock({ page, type }: WasHelpfulProps) {
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const localStorageKey = `wasHelpful:${page._id}`;

  useEffect(() => {
    const submissionStatus = localStorage.getItem(localStorageKey);
    if (submissionStatus === "yes" || submissionStatus === "no") {
      setSubmitted(true);
    }
  }, [localStorageKey]);

  async function handleClick(isHelpful: boolean) {
    setIsLoading(true);
    await fetch("/api/helpful", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ postId: page._id, isHelpful }),
    });
    localStorage.setItem(localStorageKey, isHelpful ? "yes" : "no");
    setSubmitted(true);
    setIsLoading(false);
  }

  return (
    <section
      className={`${styles.wasHelpful} ${type == "article" ? "blog" : ""}`}
    >
      <article className={styles.container}>
        <hr />
        {submitted ? (
          <p className={styles.heading}>Thanks for your feedback!</p>
        ) : (
          <>
            <p className={styles.heading}>Was this article helpful?</p>

            <ButtonGroup
              className={styles.buttons}
              orientation="horizontal"
              alignment="center"
            >
              <CallToAction
                as="button"
                variant="primary"
                onClick={() => handleClick(true)}
                disabled={isLoading}
              >
                Yes
              </CallToAction>
              <CallToAction
                as="button"
                variant="secondary"
                onClick={() => handleClick(false)}
                disabled={isLoading}
              >
                No
              </CallToAction>
            </ButtonGroup>
          </>
        )}
        {page.helpfulYesCount > 0 && (
          <p>
            {page.helpfulYesCount.toLocaleString()}
            {page.helpfulYesCount === 1 ? " person" : " people"} found this
            article helpful
          </p>
        )}
        <hr />
      </article>
    </section>
  );
}
