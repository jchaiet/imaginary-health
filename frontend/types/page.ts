import { HeroProps } from "./hero";
import { CardGridProps } from "./cardGrid";

export type PageSection =
  | ({ _type: "hero" } & HeroProps)
  | ({ _type: "cardGrid" } & CardGridProps);
