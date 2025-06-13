import { ItemType } from "./item";
import { Styles } from "./styles";
import { PortableTextBlock } from "@portabletext/types";

export interface CarouselBlockProps {
  heading: {
    title: PortableTextBlock[];
    description: PortableTextBlock[];
    animateText?: boolean;
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
