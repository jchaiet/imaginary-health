import {
  articleFragment,
  featuredDocumentsBlockFragment,
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
      ${featuredDocumentsBlockFragment}
    }
  }
}`;
