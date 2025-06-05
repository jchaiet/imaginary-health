import React, { useEffect, useRef, useMemo } from "react";
import {
  PortableText,
  PortableTextBlock,
  PortableTextComponents,
  type PortableTextMarkComponent,
} from "@portabletext/react";
import type { TypedObject } from "@portabletext/types";

import { AnimatedSpan } from "@/components/ui/AnimatedSpan";
import { Heading, Text } from "quirk-ui";

// const getAlignClass = (value: PortableTextBlock) => {
//   const markSet = value.children?.[0]?.marks ?? [];

//   if (markSet.includes("left")) return "textLeft";
//   if (markSet.includes("center")) return "textCenter";
//   if (markSet.includes("right")) return "textRight";
//   return "";
// };

type ColoredTextValue = TypedObject & {
  _type: "coloredText";
  colorClass: string;
};

const getBlockComponents = (
  baseClassName?: string
): PortableTextComponents["block"] => {
  const blockComponents: PortableTextComponents["block"] = {
    normal: ({ children }) => <Text className={baseClassName}>{children}</Text>,
    h1: ({ children }) => (
      <Heading className={baseClassName} level={1}>
        {children}
      </Heading>
    ),
    h2: ({ children }) => (
      <Heading className={baseClassName} level={2}>
        {children}
      </Heading>
    ),
    h3: ({ children }) => (
      <Heading className={baseClassName} level={3}>
        {children}
      </Heading>
    ),
    h4: ({ children }) => (
      <Heading className={baseClassName} level={4}>
        {children}
      </Heading>
    ),
    h5: ({ children }) => (
      <Heading className={baseClassName} level={5}>
        {children}
      </Heading>
    ),
    h6: ({ children }) => (
      <Heading className={baseClassName} level={6}>
        {children}
      </Heading>
    ),
  };

  return blockComponents;
};

const createPortableTextComponents = (
  baseClassName?: string,
  previousTextRef?: React.RefObject<string | undefined>,
  textOverride?: string,
  animateText?: boolean
): PortableTextComponents => {
  const block = getBlockComponents(baseClassName);
  const coloredText: PortableTextMarkComponent<ColoredTextValue> = ({
    children,
    value,
  }) => {
    if (!value) return <>{children}</>;
    const { colorClass } = value;

    const previousTextOverride = previousTextRef?.current;

    if (animateText && textOverride) {
      return (
        <AnimatedSpan
          className={colorClass}
          text={textOverride}
          prevText={previousTextOverride}
        />
      );
    }

    return <span className={colorClass}>{children}</span>;
  };

  return {
    marks: {
      coloredText,
      strong: ({ children }) => <strong>{children}</strong>,
      em: ({ children }) => <em>{children}</em>,
      left: ({ children }) => <span className="textLeft">{children}</span>,
      center: ({ children }) => <span className="textCenter">{children}</span>,
      right: ({ children }) => <span className="textRight">{children}</span>,
    },
    block,
  };
};

interface RichTextProps {
  blocks: PortableTextBlock[] | string;
  className?: string;
  textOverride?: string;
  animateText?: boolean;
}

export const RichText: React.FC<RichTextProps> = ({
  blocks,
  className,
  textOverride,
  animateText,
}) => {
  const previousTextRef = useRef(textOverride);

  useEffect(() => {
    previousTextRef.current = textOverride;
  }, [textOverride]);

  const components = useMemo(
    () =>
      createPortableTextComponents(
        className,
        previousTextRef,
        textOverride,
        animateText
      ),
    [className, previousTextRef, textOverride, animateText]
  );

  if (!blocks) return null;

  if (typeof blocks === "string") {
    console.warn(
      "RichText component received a string. Expected PortableTextBlock[]"
    );
    return <Text className={className}>{blocks}</Text>;
  }

  return <PortableText value={blocks} components={components} />;
};
