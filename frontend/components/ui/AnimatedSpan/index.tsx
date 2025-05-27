import React, { use, useEffect, useRef, useState } from "react";
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

  useEffect(() => {
    //Slide left
    setPrevAnimClass(styles.slideOff);
    setCurrentAnimClass(styles.slideOn);
  }, [text]);

  return (
    <span className={`${styles.animatedSpan} ${className ?? ""}`}>
      <span className={`${styles.previous} ${prevAnimClass}`}>{prevText}</span>
      <span className={`${styles.current} ${currentAnimClass}`}>{text}</span>
    </span>
  );
}
