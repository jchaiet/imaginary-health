export const allSlugsQuery = `*[_type == "page && defined(slug.current)][]{
"slug": slug.current
}`;

export const pageBySlugQuery = `
*[_type == "page" && slug.current == $slug][0]{
  ...,
  image {
    asset->{
      _id,
      url,
      altText,
      title,
      description
    }
  }
}`;
