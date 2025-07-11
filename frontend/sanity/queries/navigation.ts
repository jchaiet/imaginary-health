import { imageAssetFragment } from "./fragments";

export const navigationQuery = `
*[_type == "navigation" && slug.current == $slug][0]{
  ...,
  logo {
    ${imageAssetFragment}
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
