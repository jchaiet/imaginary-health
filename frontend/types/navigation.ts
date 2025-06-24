import { SanityImage } from "./image";
import { NavigationItem } from "./navigationItem";
import { Link } from "./link";

export interface Navigation {
  title: string;
  slug: { current: string };
  logo?: SanityImage;
  logoLink?: string;
  primaryItems: NavigationItem[];
  utilityItems: Link[];
}
