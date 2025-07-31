import {
  imageAssetFragment,
  callToActionFragment,
  carouselBlockFragment,
  featuredDocumentsBlockFragment,
  accordionBlockFragment,
  contentBlockFragment,
  heroBlockFragment,
  documentListBlockFragment,
  tabsBlockFragment,
} from "./fragments";

export const pageBySlugQuery = `
*[_type == "page" && slug.current == $slug][0]{
  ...,
  metadata { title, robots, description },
  image {
    ${imageAssetFragment}
  },
  pageBuilder[]{
    ...,
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
    }
  }
}`;
