"use client";

import { HeroBlock } from "@/components/blocks/HeroBlock";
import { CardGridBlock } from "@/components/blocks/CardGridBlock";
import { CarouselBlock } from "@/components/blocks/CarouselBlock";
import { ContentBlock } from "@/components/blocks/ContentBlock";
import { StickyScrollBlock } from "@/components/blocks/StickyScrollBlock";
import { PageSection } from "@/types/page";
import { FaqBlock } from "@/components/blocks/FaqBlock";

export function PageBuilder({ sections }: { sections: PageSection[] }) {
  console.log("SECTIONS", sections);
  return (
    <>
      {sections?.map((section, i) => {
        switch (section._type) {
          case "heroBlock":
            return <HeroBlock key={i} {...section} />;
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
          default:
            const unknownSection = section as { _type?: string };
            console.warn("Unknown block type", unknownSection._type, section);
            return <div key={i}>Unknown block: {unknownSection._type}</div>;
        }
      })}
    </>
  );
}
