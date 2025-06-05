import { Link } from "./link";
import { Styles } from "./styles";
import { SanityImage } from "./image";
import { PortableTextBlock } from "@portabletext/types";

export interface ContentBlockProps {
  layout?:
    | "vertical-image-top"
    | "vertical-image-bottom"
    | "horizontal-image-right"
    | "horizontal-image-left";
  heading: {
    title: PortableTextBlock[];
    description?: PortableTextBlock[];
    animateText?: boolean;
    headingLayout?: "horizontal" | "vertical";
  };
  image?: SanityImage;
  callToAction: {
    alignment: "left" | "center" | "right";
    items: Link[];
  };
  styleOptions: Styles;
}
