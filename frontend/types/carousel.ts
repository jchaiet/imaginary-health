import { SanityImage } from "./image";
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
    showReview?: boolean;
    ratingSingleton?: {
      _type: string;
      image?: SanityImage;
      eyebrow?: PortableTextBlock[];
      rating?: number;
      description?: PortableTextBlock[];
    };
  };
  items?: ItemType[];
  styleOptions: Styles;
}
