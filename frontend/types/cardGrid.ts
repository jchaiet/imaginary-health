import { CardType } from "./card";
import { Styles } from "./styles";
import { PortableTextBlock } from "@portabletext/types";

export interface CardGridBlockProps {
  titleOptions: {
    title: PortableTextBlock[];
    animateText?: boolean;
  };
  description: PortableTextBlock[];
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
  items?: CardType[];
  className?: string;
  textReplaceOnHover: boolean;
  options?: string[];
  styleOptions: Styles;
}
