import React from "react";
import {
  PortableText,
  PortableTextBlock,
  PortableTextComponents,
} from "@portabletext/react";
import { AnimatedSpan } from "@/components/ui/AnimatedSpan";
import { Heading, Text } from "quirk-ui";

const getBlockComponents = (
  baseClassName?: string
): PortableTextComponents["block"] => {
  const blockComponents: PortableTextComponents["block"] = {
    normal: ({ children }) => <Text>{children}</Text>,
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

const getPortableTextComponents = (
  baseClassName?: string,
  textOverride?: string,
  animateText?: boolean
): PortableTextComponents => {
  const block = getBlockComponents(baseClassName);
  const coloredText = ({ children, value }: any) => {
    const { colorClass } = value;

    if (animateText && textOverride) {
      console.log("ANIMATE", textOverride);
      return <AnimatedSpan className={colorClass} text={textOverride} />;
    }

    return <span className={colorClass}>{textOverride || children}</span>;
  };

  return {
    marks: {
      coloredText,
      strong: ({ children }) => <strong>{children}</strong>,
      em: ({ children }) => <em>{children}</em>,
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
  if (!blocks) return null;

  if (typeof blocks === "string") {
    console.warn(
      "RichText component received a string. Expected PortableTextBlock[]"
    );
    return <Text className={className}>{blocks}</Text>;
  }

  const components = getPortableTextComponents(
    className,
    textOverride,
    animateText
  );

  return <PortableText value={blocks} components={components} />;
};
