import { ItemType } from "./item";
import { Styles } from "./styles";
import { PortableTextBlock } from "@portabletext/types";

export interface CardGridBlockProps {
  heading: {
    title: PortableTextBlock[];
    description?: PortableTextBlock[];
    animateText?: boolean;
  };
  columns?: {
    xs?: number | string;
    sm?: number | string;
    md?: number | string;
    lg?: number | string;
    xl?: number | string;
  };
  areas?: string[];
  gap?: string;
  autoFitMinMax?: string;
  items?: ItemType[];
  className?: string;
  textReplaceOnHover: boolean;
  options?: string[];
  styleOptions: Styles;
}
