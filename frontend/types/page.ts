import { HeroBlockProps } from "./hero";
import { CardGridBlockProps } from "./cardGrid";
import { CarouselBlockProps } from "./carousel";
import { ContentBlockProps } from "./content";
import { StickyScrollBlockProps } from "./stickyScroll";
import { Link } from "./link";
import { FaqBlockProps } from "./faq";
import { TabsBlockProps } from "./tabs";
import { DisclaimerBlockProps } from "./disclaimer";
import { AccordionBlockProps } from "./accordion";
import { DocumentListBlockProps } from "./documentList";
import { FeaturedDocumentsBlockProps } from "./featuredDocuments";

type CallToActionSection = { callToAction?: Link[] | Link };
export type PageSection =
  | ({ _type: "heroBlock" } & HeroBlockProps & CallToActionSection)
  | ({ _type: "cardGridBlock" } & CardGridBlockProps)
  | ({ _type: "carouselBlock" } & CarouselBlockProps)
  | ({ _type: "contentBlock" } & ContentBlockProps & CallToActionSection)
  | ({ _type: "stickyScrollBlock" } & StickyScrollBlockProps)
  | ({ _type: "faqBlock" } & FaqBlockProps)
  | ({ _type: "tabsBlock" } & TabsBlockProps)
  | ({ _type: "disclaimerBlock" } & DisclaimerBlockProps)
  | ({ _type: "accordionBlock" } & AccordionBlockProps)
  | ({ _type: "documentListBlock" } & DocumentListBlockProps)
  | ({ _type: "featuredDocumentsBlock" } & FeaturedDocumentsBlockProps);
