"use client";

import { HeroBlock } from "@/components/blocks/HeroBlock";
import { CardGridBlock } from "@/components/blocks/CardGridBlock";
import { PageSection } from "@/types/page";

export function PageBuilder({ sections }: { sections: PageSection[] }) {
  console.log("SECTIONS", sections);
  return (
    <>
      {sections?.map((section, i) => {
        switch (section._type) {
          case "hero":
            return <HeroBlock key={i} {...section} />;
          case "cardGrid":
            return <CardGridBlock key={i} {...section} />;
          default:
            const unknownSection = section as { _type?: string };
            console.warn("Unknown block type", unknownSection._type, section);
            return <div key={i}>Unknown block: {unknownSection._type}</div>;
        }
      })}
    </>
  );
}
