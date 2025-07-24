import { PortableTextBlock } from "next-sanity";
import { SanityImage } from "./image";
import { Link } from "./link";

export type SpotlightProps = {
  _id: string;
  _type: string;
  title: PortableTextBlock[];
  description?: PortableTextBlock[];
  image?: SanityImage;
  callToAction: Link;
};
