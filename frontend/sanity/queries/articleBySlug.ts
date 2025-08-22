import {
  articleFragment,
  featuredDocumentsBlockFragment,
  singletonFragment,
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
    }
  }
}`;
