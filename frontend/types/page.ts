import { HeroBlockProps } from "./hero";
import { CardGridBlockProps } from "./cardGrid";
import { CarouselBlockProps } from "./carousel";
import { ContentBlockProps } from "./content";
import { StickyScrollBlockProps } from "./stickyScroll";
import { Link } from "./link";
import { faqBlockProps } from "./faq";

type CallToActionSection = { callToAction?: Link[] | Link };
export type PageSection =
  | ({ _type: "heroBlock" } & HeroBlockProps & CallToActionSection)
  | ({ _type: "cardGridBlock" } & CardGridBlockProps)
  | ({ _type: "carouselBlock" } & CarouselBlockProps)
  | ({ _type: "contentBlock" } & ContentBlockProps & CallToActionSection)
  | ({ _type: "stickyScrollBlock" } & StickyScrollBlockProps)
  | ({ _type: "faqBlock" } & faqBlockProps);
