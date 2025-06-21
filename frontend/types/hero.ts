import { Link } from "./link";
import { Styles } from "./styles";
import { SanityImage } from "./image";
import { PortableTextBlock } from "@portabletext/types";

export interface HeroBlockProps {
  heading: {
    eyebrow?: PortableTextBlock[];
    title: PortableTextBlock[];
    description?: PortableTextBlock[];
    disclaimer?: PortableTextBlock[];
    animateText?: boolean;
    headingLayout?: "horizontal" | "vertical";
  };
  image?: SanityImage;
  video?: string;
  callToAction: {
    alignment: "left" | "center" | "right";
    items: Link[];
  };
  alignment?: "left" | "center" | "right";
  styleOptions: Styles;
}
