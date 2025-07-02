/* Site */
import { siteSettingsType } from "./siteSettingsType";
import { navigationType } from "./navigation/navigationType";
import { navigationItemType } from "./navigation/navigationItemType";
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

/* Blocks */
import { heroBlockType } from "./blocks/heroBlockType";
import { cardGridBlockType } from "./blocks/cardGridBlockType";
import { carouselBlockType } from "./blocks/carouselBlockType";
import { contentBlockType } from "./blocks/contentBlockType";
import { stickyScrollBlockType } from "./blocks/stickyScrollBlockType";
import { faqBlockType } from "./blocks/faqBlockType";
import { tabsBlockType } from "./blocks/tabsBlocktType";
import { disclaimerBlockType } from "./blocks/disclaimerBlockType";
import { accordionBlockType } from "./blocks/accordionBlockType";
import { documentBlockType } from "./blocks/documentListBlockType";

export const schemaTypes = [
  siteSettingsType,
  pageType,
  pageMetadataType,
  blogType,
  categoryType,
  navigationType,
  navigationItemType,
  heroBlockType,
  cardGridBlockType,
  carouselBlockType,
  contentBlockType,
  stickyScrollBlockType,
  faqBlockType,
  tabsBlockType,
  disclaimerBlockType,
  accordionBlockType,
  documentBlockType,
  headingType,
  callToActionType,
  linkType,
  richTextType,
  cardType,
  gridType,
];
