import { useMemo } from "react";

type StyleValue = string | string[] | undefined;

export function useStyleClasses(stylesObj: Record<string, StyleValue>): string {
  return useMemo(() => {
    const classList: string[] = [];

    for (const key in stylesObj) {
      const value = stylesObj[key];

      if (Array.isArray(value)) {
        value.forEach((v) => {
          if (v) classList.push(v);
        });
      } else if (typeof value === "string") {
        classList.push(value);
      }
    }

    return classList.join(" ");
  }, [stylesObj]);
}
