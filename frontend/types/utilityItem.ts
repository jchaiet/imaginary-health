import { Link } from "./link";

export type UtilityItem = {
  _key: string;
  label: string;
  ariaLabel?: string;
  href: string;
  variant: Link["variant"];
  displayType: "text" | "image";
  imageSrc?: string;
  imageAlt?: string;
  icon?: string;
};
