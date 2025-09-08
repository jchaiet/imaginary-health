import {
  articleFragment,
  featuredDocumentsBlockFragment,
  singletonFragment,
  callToActionFragment,
  carouselBlockFragment,
  accordionBlockFragment,
  contentBlockFragment,
  heroBlockFragment,
  documentListBlockFragment,
  tabsBlockFragment,
  cardGridBlockFragment,
} from "./fragments";

export const articleBySlugQuery = `
*[
  _type == "blog" && 
  slug.current == $slug && 
  locale == $locale &&
  site->identifier.current == $site
][0]{
  ...,
  ${articleFragment},
  pageBuilder[]{
    ...,
    _type == "singletonBlock" => {
      ${singletonFragment}
    },
    _type == "featuredDocumentsBlock" => {
      ${featuredDocumentsBlockFragment}
    },
    callToAction {
      ${callToActionFragment}
    },
    _type == "accordionBlock" => {
      ${accordionBlockFragment}
    },
    _type == "carouselBlock" => {
      ${carouselBlockFragment}
    },
    _type == "contentBlock" => {
      ${contentBlockFragment}
    },
    _type == "heroBlock" => {
      ${heroBlockFragment}
    },
    _type == "documentListBlock" => {
      ${documentListBlockFragment}
    },
    _type == "featuredDocumentsBlock" => {
      ${featuredDocumentsBlockFragment}
    },
    _type == "tabsBlock" => {
      ${tabsBlockFragment}
    },
    _type == "cardGridBlock" => {
      ${cardGridBlockFragment}
    }
  }
}`;
