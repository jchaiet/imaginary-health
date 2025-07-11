import { Styles } from "./styles";
import { PortableTextBlock } from "@portabletext/types";
import { ArticleItem } from "./article";
import { Link, LinkOptions } from "./link";

export interface FeaturedDocumentsBlockProps {
  heading: {
    eyebrow?: PortableTextBlock[];
    title: PortableTextBlock[];
    description?: PortableTextBlock[];
    disclaimer?: PortableTextBlock[];
    animateText?: boolean;
    headingLayout?: "horizontal" | "vertical";
  };
  selectionMode: string;
  layout?: string;
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
  documentType?: string;
  filterMode?: string;
  articles?: ArticleItem[];
  manualArticles?: ArticleItem[];
  callToAction?: {
    label: string;
    ariaLabel: string;
    linkOptions?: LinkOptions;
  };
  styleOptions: Styles;
}
