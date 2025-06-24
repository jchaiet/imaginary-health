export interface NavigationItem {
  _key: string;
  _ref: string;
  title: string;
  itemType: "internal" | "external" | "dropdown";
  externalLink?: string;
  internalLink?: {
    _type: string;
    _ref: string;
    title: string;
    slug: { current: string };
  };
  children?: NavigationItem[];
}
