import { Link } from "./link";
import { PortableTextBlock } from "@portabletext/types";
import { SanityImage } from "./image";
import { Styles } from "./styles";

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
  styleOptions: Styles;
};
