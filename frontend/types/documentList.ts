import { Styles } from "./styles";
import { PortableTextBlock } from "@portabletext/types";
import { ArticleItem } from "./article";

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
  includeFilters?: {
    _id: string;
    title: string;
    slug: { current: string };
  }[];
  excludeFilters?: {
    _id: string;
    title: string;
    slug: { current: string };
  }[];
  limit?: number;
  categoryFilters?: {
    _id: string;
    title: string;
    slug: { current: string };
  }[];
  documentType: string;
  filterMode?: string;
  articles: ArticleItem[];
  styleOptions: Styles;
}
