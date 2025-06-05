import { HeroBlockProps } from "./hero";
import { CardGridBlockProps } from "./cardGrid";
import { CarouselBlockProps } from "./carousel";
import { ContentBlockProps } from "./content";

export type PageSection =
  | ({ _type: "heroBlock" } & HeroBlockProps)
  | ({ _type: "cardGridBlock" } & CardGridBlockProps)
  | ({ _type: "carouselBlock" } & CarouselBlockProps)
  | ({ _type: "contentBlock" } & ContentBlockProps);
