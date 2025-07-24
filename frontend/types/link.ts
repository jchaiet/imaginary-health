import { LucideIcon } from "lucide-react";
import { SanityImage } from "./image";

export type internalUrlOptions = {
  linkType: "internal";
  internalUrl: {
    slug: {
      current: string;
    };
  };
};

export type externalUrlOptions = {
  linkType: "external";
  externalUrl: string;
};

export type LinkOptions = internalUrlOptions | externalUrlOptions;

export type Link = {
  _key: string;
  _type: "link";
  type: "none" | "link" | "modal" | "video" | "download";
  displayType: "text" | "image";
  label: string;
  ariaLabel: string;
  linkOptions?: LinkOptions;
  icon?: string;
  modalContent?: string;
  videoUrl?: string;
  assetUrl?: string;
  resolvedUrl?: string;
  image?: SanityImage;
  imageSrc?: string;
  imageAlt?: string;
  variant?:
    | "primary"
    | "primaryInverted"
    | "secondary"
    | "secondaryInverted"
    | "link"
    | "linkInverted"
    | "underline"
    | "underlineInverted";
};
