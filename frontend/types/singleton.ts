import { ContentBlockProps } from "./content";
import { RichTextBlockProps } from "./richText";
import { Link } from "./link";
import { QuoteBlockProps } from "./quote";

export interface FetchedSingletonBlock {
  _id: string;
  identifier: string;
  title: string;
  blockSelection: "contentBlock" | "richTextBlock" | "quoteBlock";
  blockContent:
    | ({ _type: "contentBlock" } & ContentBlockProps & CallToActionSection)
    | ({ _type: "richTextBlock" } & RichTextBlockProps)
    | ({ _type: "quoteBlock" } & QuoteBlockProps);
}

export type SingletonBlock = {
  _type: "singletonBlock";
  singleton: FetchedSingletonBlock;
};

type CallToActionSection = { callToAction?: Link[] | Link };
