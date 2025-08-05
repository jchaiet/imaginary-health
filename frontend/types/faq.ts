import { Styles } from "./styles";
import { PortableTextBlock } from "@portabletext/types";

export type FaqItem = {
  _key: string;
  question: string;
  answer: PortableTextBlock[];
};

export interface FaqBlockProps {
  heading: {
    eyebrow?: PortableTextBlock[];
    title: PortableTextBlock[];
    description?: PortableTextBlock[];
    disclaimer?: PortableTextBlock[];
    animateText?: boolean;
    headingLayout?: "horizontal" | "vertical";
  };
  items?: FaqItem[];
  openMultiple?: boolean;
  className?: string;
  styleOptions: Styles;
}
