import type { ImageAsset } from "sanity";
import { Link } from "./link";
import { PortableTextBlock } from "@portabletext/types";
import { SanityImage } from "./image";

export type CardType = {
  _key: string;
  _type: string;
  title: PortableTextBlock[];
  description?: PortableTextBlock[];
  image?: SanityImage;
  icon: string;
  callToAction: Link;
};
