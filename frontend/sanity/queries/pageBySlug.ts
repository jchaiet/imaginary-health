import {
  imageAssetFragment,
  categoryFragment,
  callToActionFragment,
  articleFragment,
  linkFragment,
} from "./fragments";

export const pageBySlugQuery = `
*[_type == "page" && slug.current == $slug][0]{
  ...,
  image {
    ${imageAssetFragment}
  },
  pageBuilder[]{
    ...,
    callToAction {
      ${callToActionFragment}
    },
    _type == "accordionBlock" => {
      ...,
      callToAction {
        ${callToActionFragment}
      },
    },
    _type == "cardGridBlock" => {
      ...,
      callToAction {
        ${callToActionFragment}
      },
      grid {
        ...,
        items[]{
          ...,
          callToAction{
            ${linkFragment}
          }
        }
      }
    },
    _type == "carouselBlock" => {
      ...,
      callToAction {
        ${callToActionFragment}
      },
      items[]{
        ...,
        callToAction{
          ${linkFragment}
        }
      }
    },
    _type == "contentBlock" => {
      ...,
      callToAction {
        ${callToActionFragment}
      },
    },
    _type == "heroBlock" => {
      ...,
      callToAction {
        ${callToActionFragment}
      },
    },
    _type == "documentListBlock" => {
      ...,
      "articles": *[
        _type == ^.documentType && 
        parent._ref == ^.id &&
        (
          !defined(^.includeFilters) ||
          count(categories[@._ref in ^.^.includeFilters[]._ref]) > 0
        ) &&
        (
          !defined(^.excludeFilters) ||
          count(categories[@._ref in ^.^.excludeFilters[]._ref]) == 0
        )
      ] | order(publishDate desc) {
        ${articleFragment}
      },
      categoryFilters[]->{
        ${categoryFragment}
      },
      includeFilters[]->{
        ${categoryFragment}
      },
      excludeFilters[]->{
        ${categoryFragment}
      }
    },
    _type == "featuredDocumentsBlock" => {
      ...,
      manualArticles[]->{
        ${articleFragment}
      },
      callToAction {
        ${linkFragment}
      },
      categoryFilters[]->{
        ${categoryFragment}
      },
      includeFilters[]->{
        ${categoryFragment}
      },
      excludeFilters[]->{
        ${categoryFragment}
      },
      "articles": *[
        _type == ^.documentType && 
        (
          (
            ^.filterMode == "any" &&
            (
              !defined(^.includeFilters) ||
              count(categories[@._ref in ^.^.includeFilters[]._ref]) > 0
            )
          ) ||
          (
            ^.filterMode == "all" &&             
            !defined(^.includeFilters) ||
            (
              count(^.includeFilters) > 0 &&
              count(categories[@._ref in ^.^.includeFilters[]._ref]) == count(coalesce(^.includeFilters, []))
            )
          )
        ) &&
        (
          !defined(^.excludeFilters) ||
          count(categories[@._ref in ^.^.excludeFilters[]._ref]) == 0
        )
      ] | order(publishDate desc)[0...25] {
        ${articleFragment}
      }
    }
  }
}`;
