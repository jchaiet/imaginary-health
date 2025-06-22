"use client";
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
  const [prevAnimClass, setPrevAnimClass] = useState<string | null>(null);
  const [currentAnimClass, setCurrentAnimClass] = useState<string | null>(null);

  const [displayedText, setDisplayedText] = useState(text);
  // const [prevText, setPrevText] = useState<string | null>(null);
  // const [isAnimating, setIsAnimating] = useState(false);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    // setPrevText(displayedText);

    rafRef.current = requestAnimationFrame(() => {
      setDisplayedText(text);
    });

    return () => {
      cancelAnimationFrame(rafRef.current);
    };
  }, [text]);

  useEffect(() => {
    //Slide left
    setPrevAnimClass(styles.slideOff);
    setCurrentAnimClass(styles.slideOn);
  }, [text]);

  return (
    <span className={`${styles.animatedSpan} ${className ?? ""}`}>
      <span className={`${styles.previous} ${prevAnimClass}`}>{prevText}</span>
      <span className={`${styles.current} ${currentAnimClass}`}>
        {displayedText}
      </span>
    </span>
  );
}
