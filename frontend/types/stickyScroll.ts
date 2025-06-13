import { PortableTextBlock } from "next-sanity";
import { Styles } from "./styles";
import { ItemType } from "./item";

export interface StickyScrollBlockProps {
  heading: {
    eyebrow?: PortableTextBlock[];
    title: PortableTextBlock[];
    description?: PortableTextBlock[];
    disclaimer?: PortableTextBlock[];
    animateText?: boolean;
    headingLayout?: "horizontal" | "vertical";
  };
  items: ItemType[];
  showNumbers: boolean;
  styleOptions: Styles;
}
