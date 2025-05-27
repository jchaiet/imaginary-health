import { Link } from "./link";
import { SanityImage } from "./image";
import { PortableTextBlock } from "@portabletext/types";

export interface HeroProps {
  style?: "default" | "fullscreen" | "split";
  heading: PortableTextBlock[];
  subheading?: PortableTextBlock[];
  image?: SanityImage;
  callToAction: Link[];
  alignment?: "left" | "center" | "right";
}
