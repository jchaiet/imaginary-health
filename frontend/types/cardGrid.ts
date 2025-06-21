import { ItemType } from "./item";
import { Link } from "./link";
import { Styles } from "./styles";
import { PortableTextBlock } from "@portabletext/types";

export interface CardGridBlockProps {
  heading: {
    eyebrow?: PortableTextBlock[];
    title: PortableTextBlock[];
    description?: PortableTextBlock[];
    disclaimer?: PortableTextBlock[];
    animateText?: boolean;
    headingLayout?: "horizontal" | "vertical";
  };
  grid?: {
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
  };
  textReplaceOnHover: boolean;
  options?: string[];
  callToAction: {
    alignment: "left" | "center" | "right";
    items: Link[];
  };
  styleOptions: Styles;
}
