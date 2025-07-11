import { articleFragment } from "./fragments";

export const articleBySlugQuery = `
*[_type == "blog" && slug.current == $slug][0]{
  ...,
  ${articleFragment},
  pageBuilder[]{
    ...
  }
}`;
