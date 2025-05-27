import { ItemType } from "./item";
import { PortableTextBlock } from "@portabletext/types";

export interface CardGridProps {
  titleOptions: {
    title: PortableTextBlock[];
    animateText?: boolean;
  };
  description: PortableTextBlock[];
  columns?: number | string;
  gap?: string;
  autoFitMinMax?: string;
  items?: ItemType[];
  textReplaceOnHover: boolean;
}
