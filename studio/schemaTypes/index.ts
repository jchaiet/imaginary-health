import { pageType } from "./pageType";
import { pageMetadataType } from "./pageMetadataType";
import { linkType } from "./objects/linkType";
import { richTextType } from "./objects/richTextType";
import { heroBlockType } from "./blocks/heroBlockType";
import { cardGridBlockType } from "./blocks/cardGridBlockType";
import { carouselBlockType } from "./blocks/carouselBlockType";
import { contentBlockType } from "./blocks/contentBlockType";
import { cardType } from "./cards/cardType";

export const schemaTypes = [
  pageType,
  pageMetadataType,
  linkType,
  richTextType,
  heroBlockType,
  cardGridBlockType,
  carouselBlockType,
  contentBlockType,
  cardType,
];
