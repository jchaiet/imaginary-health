import { SanityImage } from "./image";

export type ArticleItem = {
  _ref?: string;
  _id: string;
  _type: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  timeToRead: number;
  articleType: string;
  helpfulYesCount?: number;
  categories?: {
    _id: string;
    title: string;
    slug: { current: string };
  }[];
  publishDate?: string;
  featuredImage?: SanityImage;
};
