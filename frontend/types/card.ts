import { Link } from "./link";
import { PortableTextBlock } from "@portabletext/types";
import { SanityImage } from "./image";

export type CardType = {
  _key: string;
  _type: string;
  variant: string;
  style?: string;
  metricValue?: string;
  title?: PortableTextBlock[];
  description?: PortableTextBlock[];
  image?: SanityImage;
  icon?: string;
  callToAction?: Link;
  gridArea?: string;
};
