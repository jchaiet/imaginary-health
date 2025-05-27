import React, { use, useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";

export function AnimatedSpan({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const [currentText, setCurrentText] = useState<string | null>(null);
  const [prevText, setPrevText] = useState<string | null>(null);

  const currentTextRef = useRef<string | null>(null);
  const prevTextRef = useRef<string | null>(null);

  useEffect(() => {
    setPrevText(currentText);

    const timeout = setTimeout(() => {
      setCurrentText(text);
      prevTextRef.current = text;
    }, 3000);

    return () => clearTimeout(timeout);
  }, [text, currentText]);

  return (
    <span className={styles.animatedSpan}>
      <span>P: {prevText}</span>
      <span>C: {currentText}</span>
    </span>
  );
}
