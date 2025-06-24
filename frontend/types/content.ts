import { Link } from "./link";
import { Styles } from "./styles";
import { SanityImage } from "./image";
import { PortableTextBlock } from "@portabletext/types";
import { MetricType } from "./metric";

export interface ContentBlockProps {
  layout: {
    orientation?:
      | "no-image"
      | "vertical-image-top"
      | "vertical-image-bottom"
      | "horizontal-image-right"
      | "horizontal-image-left";
    gap?: string;
  };
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
  metrics?: MetricType[];
  callToAction: {
    alignment: "left" | "center" | "right";
    items: Link[];
  };
  disclaimer?: PortableTextBlock[];
  styleOptions: Styles;
}
