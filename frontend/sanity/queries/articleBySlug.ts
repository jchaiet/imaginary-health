import { articleFragment, linkFragment, categoryFragment } from "./fragments";

export const articleBySlugQuery = `
*[_type == "blog" && slug.current == $slug][0]{
  ...,
  ${articleFragment},
  pageBuilder[]{
    ...,
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
