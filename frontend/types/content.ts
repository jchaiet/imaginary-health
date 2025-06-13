import { Link } from "./link";
import { Styles } from "./styles";
import { SanityImage } from "./image";
import { PortableTextBlock } from "@portabletext/types";
import { MetricType } from "./metric";

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
  video?: string;
  metrics?: MetricType[];
  callToAction: {
    alignment: "left" | "center" | "right";
    items: Link[];
  };
  disclaimer?: PortableTextBlock[];
  styleOptions: Styles;
}
