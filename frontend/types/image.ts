export interface SanityImage {
  _id: string;
  url: string;
  alt?: string;
  asset: {
    _ref: string;
    _type: string;
  };
  description?: string;
  display?: "default" | "max-width" | "full-width";
  maxWidth?: number | string;
}
