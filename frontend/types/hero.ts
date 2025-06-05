import { Link } from "./link";
import { Styles } from "./styles";
import { SanityImage } from "./image";
import { PortableTextBlock } from "@portabletext/types";

export interface HeroBlockProps {
  style?: "default" | "fullscreen" | "split";
  heading: PortableTextBlock[];
  subheading?: PortableTextBlock[];
  image?: SanityImage;
  callToAction: {
    alignment: "left" | "center" | "right";
    items: Link[];
  };
  alignment?: "left" | "center" | "right";
  styleOptions: Styles;
}
