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

export const navigationQuery = `
*[_type == "navigation" && slug.current == $slug][0]{
  title,
  slug,
  logo {
    asset->{
      _id,
      url,
      altText,
      title,
      description
    }
  },
  logoLink->{
   _type,
    title,
    slug { current }
  },
  primaryItems[]{
    _key,
    title,
    itemType,
    externalLink,
    internalLink->{
      _type,
      title,
      slug { current }
    },
    children[]{
      _key,
      title,
      itemType,
      externalLink,
      internalLink->{
       _type,
       title,
       slug { current }
      }
    }
  },
  utilityItems[]{
    title,
    "url": link,
    style
  }
}`;
