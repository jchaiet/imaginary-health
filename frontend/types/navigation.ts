import { SanityImage } from "./image";
import { NavigationItem } from "./navigationItem";
import { Link } from "./link";

export interface Navigation {
  title: string;
  slug: { current: string };
  logo?: SanityImage;
  logoLink?: string;
  primaryItems: NavigationItem[];
  alignment: "left" | "center" | "right";
  utilityItems: Link[];
  variant: "standard" | "transparent" | "minimal";
  navigationType: "default" | "advanced";
  showSearch: boolean;
  showLocaleSelect: boolean;
  localeSelectComponent?: React.ReactNode;
  searchComponent?: React.ReactNode;
}
