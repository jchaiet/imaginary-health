import type { AccordionItem } from "quirk-ui";
import { Styles } from "./styles";
import { PortableTextBlock } from "@portabletext/types";

export type FaqItem = {
  _key: string;
  question: string;
  answer: PortableTextBlock[];
};

export interface faqBlockProps {
  heading: {
    title: PortableTextBlock[];
    description: PortableTextBlock[];
  };
  items?: FaqItem[];
  className?: string;
  styleOptions: Styles;
}
