import React, { useEffect, useState, useRef } from "react";
import styles from "./styles.module.css";

export function AnimatedSpan({
  text,
  prevText,
  className,
}: {
  text: string;
  prevText?: string;
  className?: string;
}) {
  const [displayedPrevText, setDisplayedPrevText] = useState(prevText);
  const [currentTextToDisplay, setCurrentTextToDisplay] = useState(text);

  const [prevAnimClass, setPrevAnimClass] = useState<string | null>(null);
  const [currentAnimClass, setCurrentAnimClass] = useState<string | null>(null);

  const timeoutId = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }

    setCurrentTextToDisplay(text);
    setCurrentAnimClass(styles.reset);

    setDisplayedPrevText(prevText);
    setPrevAnimClass(null);

    requestAnimationFrame(() => {
      void document.body.offsetHeight;

      setPrevAnimClass(styles.slideOff);
      setCurrentAnimClass(styles.slideOn);
    });

    timeoutId.current = setTimeout(() => {
      setDisplayedPrevText(undefined);
      setPrevAnimClass(null);
    }, 300);

    return () => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }
    };
  }, [text, prevText]);

  useEffect(() => {
    if (!displayedPrevText && !currentTextToDisplay && text) {
      setCurrentTextToDisplay(text);
      setCurrentAnimClass(null);
    }
  }, [displayedPrevText, currentTextToDisplay, text]);

  return (
    <span className={`${styles.animatedSpan} ${className ?? ""}`}>
      {displayedPrevText !== undefined && (
        <span className={`${styles.previous} ${prevAnimClass}`}>
          {displayedPrevText}
        </span>
      )}
      <span className={`${styles.current} ${currentAnimClass}`}>
        {currentTextToDisplay}
      </span>
    </span>
  );
}
