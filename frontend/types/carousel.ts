import { CardType } from "./card";
import { Styles } from "./styles";
import { PortableTextBlock } from "@portabletext/types";

export interface CarouselBlockProps {
  titleOptions: {
    title: PortableTextBlock[];
    animateText?: boolean;
  };
  description: PortableTextBlock[];
  carouselOptions: {
    itemsPerPage?: number;
    itemsPerRow?: number;
    autoplay?: boolean;
    autoplayInterval?: number;
  };
  items?: CardType[];
  styleOptions: Styles;
}
