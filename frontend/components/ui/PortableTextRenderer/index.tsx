"use client";
import React, { useEffect, useRef, useMemo } from "react";
import {
  PortableText,
  PortableTextBlock,
  PortableTextComponents,
  PortableTextListComponent,
  type PortableTextMarkComponent,
} from "@portabletext/react";
import type { TypedObject } from "@portabletext/types";

import { AnimatedSpan } from "@/components/ui/AnimatedSpan";
import { Heading, Text } from "quirk-ui";

import Image from "next/image";
import { urlForImage } from "@/sanity/client";

import styles from "./styles.module.css";

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
    quote: ({ children }) => (
      <blockquote className={baseClassName}>{children}</blockquote>
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
          key="animated-span"
          className={colorClass}
          text={textOverride}
          prevText={previousTextOverride}
        />
      );
    }

    return <span className={colorClass}>{children}</span>;
  };

  const CustomUL: PortableTextListComponent = ({ children = [] }) => {
    const itemCount = React.Children.count(children);

    return (
      <ul
        style={{
          columnCount: itemCount > 5 ? 2 : 1,
        }}
        className={baseClassName}
      >
        {children}
      </ul>
    );
  };

  return {
    marks: {
      coloredText,
      strong: ({ children }) => <strong>{children}</strong>,
      em: ({ children }) => <em>{children}</em>,
      number: ({ children }) => (
        <span className="inlineNumber">{children}</span>
      ),
      left: ({ children }) => <span className="textLeft">{children}</span>,
      center: ({ children }) => <span className="textCenter">{children}</span>,
      right: ({ children }) => <span className="textRight">{children}</span>,
      link: ({ children, value }) => {
        const { linkType, internalUrl, externalUrl, blank } = value;

        let url = "#";

        if (linkType === "external" && externalUrl) {
          url = externalUrl;
        } else if (linkType === "internal" && internalUrl?.slug.current) {
          url = `/${internalUrl?.slug.current}`;
        }

        const isExternal = linkType === "external";

        return (
          <a
            href={url}
            target={blank ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
            className={styles.richTextLink}
          >
            {children}
          </a>
        );
      },
      textSize: ({ children, value }) => {
        const sizeClass = value?.size ? `text-${value.size}` : "";
        return <span className={sizeClass}>{children}</span>;
      },
    },
    block,
    list: {
      bullet: CustomUL,
    },
    types: {
      image: ({ value }) => {
        if (!value?.asset?._ref) return null;

        const imageUrl = urlForImage(value).url();
        const altText = value.alt || "Content image";

        return (
          <div className={`${baseClassName} ${styles.richTextImage}`}>
            <Image
              src={imageUrl}
              alt={altText}
              width={1000}
              height={800}
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </div>
        );
      },
    },
  };
};

interface RichTextProps {
  blocks: PortableTextBlock[] | string;
  className?: string;
  textOverride?: string | undefined;
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

  return (
    <div className={`${styles.container} portableTextContainer`}>
      <PortableText value={blocks} components={components} />
    </div>
  );
};
