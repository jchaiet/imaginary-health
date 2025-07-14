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
          count(coalesce(^.^.includeFilters, [])) == 0 ||
          count(categories[@._ref in ^.^.includeFilters[]._ref]) > 0
        ) &&
        (
          count(coalesce(^.^.excludeFilters, [])) == 0 ||
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
      "articles": *[
        _type == ^.documentType && 
        parent._ref == ^.id &&
        (
          count(coalesce(^.^.includeFilters, [])) == 0 ||
          count(categories[@._ref in ^.^.includeFilters[]._ref]) > 0
        ) &&
        (
          count(coalesce(^.^.excludeFilters, [])) == 0 ||
          count(categories[@._ref in ^.^.excludeFilters[]._ref]) == 0
        )
      ] | order(publishDate desc)[0...25] {
        ${articleFragment}
      },
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
      }
    }
  }
}`;
