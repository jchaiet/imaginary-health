import { PortableTextBlock } from "next-sanity";

export interface NavigationItem {
  _key: string;
  _ref: string;
  title: string;
  subtitle?: string;
  description?: PortableTextBlock[];
  itemType: "internal" | "external" | "dropdown" | "list";
  externalUrl?: string;
  internalUrl?: {
    _type: string;
    _ref: string;
    title: string;
    slug: { current: string };
  };
  imageSrc?: string;
  imageAlt?: string;
  children?: NavigationItem[];
  icon?: string;
}
