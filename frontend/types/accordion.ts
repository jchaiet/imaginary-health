import { SanityImage } from "./image";
import { Styles } from "./styles";
import { PortableTextBlock } from "@portabletext/types";

export type AccordionItem = {
  _key: string;
  title: string;
  content: PortableTextBlock[];
  image?: SanityImage;
};

export interface AccordionBlockProps {
  heading: {
    eyebrow?: PortableTextBlock[];
    title: PortableTextBlock[];
    description?: PortableTextBlock[];
    disclaimer?: PortableTextBlock[];
    animateText?: boolean;
    headingLayout?: "horizontal" | "vertical";
  };
  items?: AccordionItem[];
  className?: string;
  styleOptions: Styles;
}
