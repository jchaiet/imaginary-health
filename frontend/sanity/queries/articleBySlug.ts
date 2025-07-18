import {
  articleFragment,
  linkFragment,
  categoryFragment,
  callToActionFragment,
  singletonFragment,
} from "./fragments";

export const articleBySlugQuery = `
*[_type == "blog" && slug.current == $slug][0]{
  ...,
  ${articleFragment},
  pageBuilder[]{
    ...,
    _type == "singletonBlock" => {
      ${singletonFragment}
    },
    _type == "featuredDocumentsBlock" => {
      ...,
      manualArticles[]->{
        ${articleFragment}
      },
      callToAction {
        ${linkFragment}
      },
      includeFilters[]->{
        ${categoryFragment}
      },
      excludeFilters[]->{
        ${categoryFragment}
      },
      "articles": *[
        _type == ^.documentType && 
        _id != ^.^._id &&
        (
          !defined(^.includeFilters) ||
          count(categories[@._ref in ^.^.includeFilters[]._ref]) > 0
        ) &&
        (
          !defined(^.excludeFilters) ||
          count(categories[@._ref in ^.^.excludeFilters[]._ref]) == 0
        )
      ] | order(publishDate desc)[0...25] {
        ${articleFragment}
      },
    }
  }
}`;
