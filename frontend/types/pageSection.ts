import { HeroBlockProps } from "./hero";
import { CardGridBlockProps } from "./cardGrid";
import { CarouselBlockProps } from "./carousel";
import { ContentBlockProps } from "./content";
import { StickyScrollBlockProps } from "./stickyScroll";
import { Link } from "./link";
import { FaqBlockProps } from "./faq";
import { TabsBlockProps } from "./tabs";
import { RichTextBlockProps } from "./richText";
import { AccordionBlockProps } from "./accordion";
import { DocumentListBlockProps } from "./documentList";
import { FeaturedDocumentsBlockProps } from "./featuredDocuments";
import { SingletonBlock } from "./singleton";
import { QuoteBlockProps } from "./quote";
import { AdditionalCategoriesProps } from "./additionalCategories";
import { WasHelpfulProps } from "./wasHelpful";

type CallToActionSection = { callToAction?: Link[] | Link };

export type PageSection =
  | ({ _type: "heroBlock" } & HeroBlockProps & CallToActionSection)
  | ({ _type: "cardGridBlock" } & CardGridBlockProps)
  | ({ _type: "carouselBlock" } & CarouselBlockProps)
  | ({ _type: "contentBlock" } & ContentBlockProps & CallToActionSection)
  | ({ _type: "stickyScrollBlock" } & StickyScrollBlockProps)
  | ({ _type: "faqBlock" } & FaqBlockProps)
  | ({ _type: "tabsBlock" } & TabsBlockProps)
  | ({ _type: "richTextBlock" } & RichTextBlockProps)
  | ({ _type: "quoteBlock" } & QuoteBlockProps)
  | ({ _type: "accordionBlock" } & AccordionBlockProps)
  | ({ _type: "documentListBlock" } & DocumentListBlockProps)
  | ({ _type: "featuredDocumentsBlock" } & FeaturedDocumentsBlockProps &
      CallToActionSection)
  | ({ _type: "additionalCategoriesBlock" } & AdditionalCategoriesProps)
  | ({ _type: "wasHelpfulBlock" } & WasHelpfulProps)
  | ({ _type: "singletonBlock" } & SingletonBlock);
