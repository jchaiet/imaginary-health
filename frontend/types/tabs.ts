import { ItemType } from "./item";
import { SanityImage } from "./image";
import { Link } from "./link";
import { Styles } from "./styles";
import { PortableTextBlock } from "@portabletext/types";

export type TabItem = {
  title: string;
  content: {
    tabText?: PortableTextBlock[];
    tabImage?: SanityImage;
    tabLink?: Link;
    tabGridItem?: {};
    tabDisclaimer?: PortableTextBlock[];
  };
};

export interface TabsBlockProps {
  heading: {
    eyebrow?: PortableTextBlock[];
    title: PortableTextBlock[];
    description?: PortableTextBlock[];
    disclaimer?: PortableTextBlock[];
    animateText?: boolean;
    headingLayout?: "horizontal" | "vertical";
  };
  items: TabItem[];
  image?: SanityImage;
  styleOptions: Styles;
}
