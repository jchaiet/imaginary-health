"use client";
// import { HeroBlock } from "@/components/blocks/HeroBlock";
//import { CardGridBlock } from "@/components/blocks/CardGridBlock";
//import { CarouselBlock } from "@/components/blocks/CarouselBlock";
//import { ContentBlock } from "@/components/blocks/ContentBlock";
//import { StickyScrollBlock } from "@/components/blocks/StickyScrollBlock";

//import { FaqBlock } from "@/components/blocks/FaqBlock";
//import { TabsBlock } from "@/components/blocks/TabsBlock";
//import { RichTextBlock } from "@/components/blocks/RichTextBlock";
//import { AccordionBlock } from "@/components/blocks/AccordionBlock";
//import { DocumentListBlock } from "@/components/blocks/DocumentListBlock";
// import { FeaturedDocumentsBlock } from "@/components/blocks/FeaturedDocumentsBlock";
// import { QuoteBlock } from "@/components/blocks/QuoteBlock";
// import { AdditionalCategories } from "@/components/blocks/AdditionalCategories";
// import WasHelpfulBlock from "@/components/blocks/WasHelpfulBlock";

// import { PageSection } from "@/types/pageSection";
// import { SingletonBlock } from "@/types/singleton";
// import { ContentBlockProps } from "@/types";
// import { RichTextBlockProps } from "@/types/richText";
// import { QuoteBlockProps } from "@/types/quote";

import {
  type ContentBlockProps,
  type PageSection,
  type QuoteBlockProps,
  type RichTextBlockProps,
  type SingletonBlockProps,
  AccordionBlock,
  AdditionalCategoriesBlock,
  CardGridBlock,
  CarouselBlock,
  ContentBlock,
  DocumentListBlock,
  FaqBlock,
  FeaturedDocumentsBlock,
  HeroBlock,
  QuoteBlock,
  RichTextBlock,
  StickyScrollBlock,
  TabsBlock,
  WasHelpfulBlock,
} from "quirk-ui/next";

export function PageBuilder({
  sections,
  pageData,
}: {
  sections: PageSection[];
  pageData: {
    timeToRead: number;
    categories?: {
      _id: string;
      title: string;
      slug: { current: string };
    }[];
    articleType: string;
  };
}) {
  console.log("SECTIONS", sections);
  return (
    <>
      {sections?.map((section, i) => {
        switch (section._type) {
          case "heroBlock":
            return <HeroBlock key={i} {...section} pageData={pageData} />;
          case "cardGridBlock":
            return <CardGridBlock key={i} {...section} />;
          case "carouselBlock":
            return <CarouselBlock key={i} {...section} />;
          case "contentBlock":
            return <ContentBlock key={i} {...section} />;
          case "stickyScrollBlock":
            return <StickyScrollBlock key={i} {...section} />;
          case "faqBlock":
            return <FaqBlock key={i} {...section} />;
          case "tabsBlock":
            return <TabsBlock key={i} {...section} />;
          case "richTextBlock":
            return <RichTextBlock key={i} {...section} />;
          case "quoteBlock":
            return <QuoteBlock key={i} {...section} />;
          case "accordionBlock":
            return <AccordionBlock key={i} {...section} />;
          case "documentListBlock":
            return <DocumentListBlock key={i} {...section} />;
          case "featuredDocumentsBlock":
            return <FeaturedDocumentsBlock key={i} {...section} />;
          case "additionalCategoriesBlock":
            return <AdditionalCategoriesBlock key={i} {...section} />;
          case "wasHelpfulBlock":
            return <WasHelpfulBlock key={i} {...section} />;

          case "singletonBlock":
            const singletonBlock = section as SingletonBlockProps;
            const fetchedSingleton = singletonBlock.singleton;

            switch (fetchedSingleton.blockSelection) {
              case "contentBlock":
                return (
                  <ContentBlock
                    key={i}
                    {...(fetchedSingleton.blockContent as ContentBlockProps)}
                  />
                );
              case "richTextBlock":
                return (
                  <RichTextBlock
                    key={i}
                    {...(fetchedSingleton.blockContent as RichTextBlockProps)}
                  />
                );
              case "quoteBlock":
                return (
                  <QuoteBlock
                    key={i}
                    {...(fetchedSingleton.blockContent as QuoteBlockProps)}
                  />
                );
              default:
                console.warn(
                  "Unknown singleton block type",
                  fetchedSingleton.blockSelection,
                  fetchedSingleton
                );
                return (
                  <div key={i}>
                    Unknown singleton block type:{" "}
                    {fetchedSingleton.blockSelection}
                  </div>
                );
            }

          default:
            const unknownSection = section as { _type?: string };
            console.warn("Unknown block type", unknownSection._type, section);
            return <div key={i}>Unknown block: {unknownSection._type}</div>;
        }
      })}
    </>
  );
}
