import { ItemType } from "./item";
import { Styles } from "./styles";
import { PortableTextBlock } from "@portabletext/types";

export interface CarouselBlockProps {
  heading: {
    eyebrow?: PortableTextBlock[];
    title: PortableTextBlock[];
    description?: PortableTextBlock[];
    disclaimer?: PortableTextBlock[];
    animateText?: boolean;
    headingLayout?: "horizontal" | "vertical";
  };
  carouselOptions: {
    itemsPerPage?: number;
    itemsPerRow?: number;
    autoplay?: boolean;
    autoplayInterval?: number;
  };
  items?: ItemType[];
  styleOptions: Styles;
}
