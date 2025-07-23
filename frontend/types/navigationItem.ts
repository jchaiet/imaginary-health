import { LucideIcon } from "lucide-react";

export interface NavigationItem {
  _key: string;
  _ref: string;
  title: string;
  itemType: "internal" | "external" | "dropdown" | "list";
  externalLink?: string;
  internalLink?: {
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
