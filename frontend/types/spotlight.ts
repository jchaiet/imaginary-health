import { PortableTextBlock } from "next-sanity";
import { SanityImage } from "./image";
import { Link } from "./link";
import { RichContent } from "quirk-ui/core";

export type SpotlightProps = {
  title?: RichContent;
  description?: RichContent;
  image?: SanityImage;
  callToAction: Link;
};
