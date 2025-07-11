import { Link } from "./link";
import { PortableTextBlock } from "@portabletext/types";
import { SanityImage } from "./image";

export type ItemType = {
  _key: string;
  _type: string;
  variant: string;
  style?: string;
  metricValue?: string;
  eyebrow?: PortableTextBlock[];
  title?: PortableTextBlock[];
  description?: PortableTextBlock[];
  person?: PortableTextBlock[];
  rating: number;
  image?: SanityImage;
  icon?: string;
  callToAction?: Link;
  gridArea?: string;
};
