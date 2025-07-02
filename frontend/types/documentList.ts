import { SanityImage } from "./image";
import { Styles } from "./styles";
import { PortableTextBlock } from "@portabletext/types";

export type ArticleItem = {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  categories?: {
    _id: string;
    title: string;
    slug: { current: string };
  }[];
  publishDate?: string;
  featuredImage?: SanityImage;
};

export interface DocumentListBlockProps {
  heading: {
    eyebrow?: PortableTextBlock[];
    title: PortableTextBlock[];
    description?: PortableTextBlock[];
    disclaimer?: PortableTextBlock[];
    animateText?: boolean;
    headingLayout?: "horizontal" | "vertical";
  };
  layout: string;
  limit?: number;
  filterByCategory?: {
    _ref: string;
  };
  articles: ArticleItem[];
  styleOptions: Styles;
}
