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

export const blogPageWithPostsQuery = `
*[_type == "page" && slug.current == "blog"][0] {
  ...,
  "articles": *[_type == "blog" && parent._ref == ^.id] | order(publishDate desc) {
    _id,
    title,
    slug,
    excerpt,
    publishDate,
    categories[]->{
      _id,
      title,
      slug
    },
    featuredImage {
      asset->{
        url,
        altText,
        title,
        description
      }
    }
  }
}`;

export const articleBySlugQuery = `
*[_type == "blog" && slug.current == $slug][0]{
  ...,
  categories[]->{
    _id,
    title,
    slug
  },
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
  ...,
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
    ...,  
    _key,
    linkOptions{
      internalUrl->{
        slug { current }
      }
    }
  }
}`;
