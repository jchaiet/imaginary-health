/* Site */
import { siteType } from "./siteType";
import { siteSettingsType } from "./siteSettingsType";
import { navigationType } from "./navigation/navigationType";
import { navigationItemType } from "./navigation/navigationItemType";
import { navigationGroupType } from "./navigation/navigationGroupType";

import { pageType } from "./pageType";
import { pageMetadataType } from "./pageMetadataType";
import { blogType } from "./blogType";

/* Objects */
import { categoryType } from "./objects/categoryType";
import { headingType } from "./objects/headingType";
import { callToActionType } from "./objects/callToActionType";
import { linkType } from "./objects/linkType";
import { richTextType } from "./objects/richTextType";
import { cardType } from "./cards/cardType";
import { gridType } from "./objects/gridType";
import { dividerType } from "./objects/dividerType";
import { ratingType } from "./objects/ratingType";
import { imageWithLayoutType } from "./objects/imageWidthLayoutType";
import { redirectType } from "./objects/redirectType";

/* Blocks */
import { heroBlockType } from "./blocks/heroBlockType";
import { cardGridBlockType } from "./blocks/cardGridBlockType";
import { carouselBlockType } from "./blocks/carouselBlockType";
import { contentBlockType } from "./blocks/contentBlockType";
import { stickyScrollBlockType } from "./blocks/stickyScrollBlockType";
import { faqBlockType } from "./blocks/faqBlockType";
import { tabsBlockType } from "./blocks/tabsBlocktType";
import { richTextBlockType } from "./blocks/richTextBlockType";
import { accordionBlockType } from "./blocks/accordionBlockType";
import { documentBlockType } from "./blocks/documentListBlockType";
import { featuredDocumentsBlockType } from "./blocks/featuredDocumentsBlockType";
import { quoteBlockType } from "./blocks/quoteBlockType";

/* Singletons */
import { singletonType } from "./singletonType";
import { singletonBlockType } from "./blocks/singletonBlockType";

export const schemaTypes = [
  siteType,
  siteSettingsType,
  pageType,
  pageMetadataType,
  blogType,
  navigationType,
  navigationItemType,
  navigationGroupType,

  categoryType,
  headingType,
  callToActionType,
  linkType,
  richTextType,
  cardType,
  gridType,
  dividerType,
  ratingType,
  imageWithLayoutType,
  redirectType,

  heroBlockType,
  cardGridBlockType,
  carouselBlockType,
  contentBlockType,
  stickyScrollBlockType,
  faqBlockType,
  tabsBlockType,
  richTextBlockType,
  accordionBlockType,
  documentBlockType,
  featuredDocumentsBlockType,
  quoteBlockType,

  singletonType,
  singletonBlockType,
];
