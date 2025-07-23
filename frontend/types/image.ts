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
  description?: string;
  display?: "default" | "max-width" | "full-bleed";
  maxWidth?: number | string;
}
