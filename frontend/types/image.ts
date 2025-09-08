export interface SanityImage {
  _id: string;
  url: string;
  alt?: string;
  asset: {
    _id: string;
    url: string;
    altText: string;
    title: string;
    description: string;
  };
  imageUrl?: string;
  description?: string;
  layout?: "cover" | "contain" | "none";
  position?:
    | "center"
    | "top"
    | "bottom"
    | "left"
    | "right"
    | "top left"
    | "top right"
    | "bottom left"
    | "bottom right";
  width?: "full" | "inset" | "half";
  maxWidth?: string;
  aspectRatio?: "1:1" | "16:9" | "4:3";

  /** Deprecated */
  display?: "default" | "max-width" | "full-bleed";
}
