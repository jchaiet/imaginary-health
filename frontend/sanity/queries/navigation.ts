import {
  imageAssetFragment,
  linkFragment,
  callToActionFragment,
} from "./fragments";

export const navigationQuery = `
*[_type == "navigation" && slug.current == $slug][0]{
  ...,
  navigationType,
  navigationGroups[]{
    _id,
    _key,
    title,
    primaryItems[]{
      title,
      itemType,
      internalUrl->{
        _type,
        slug
      },
      externalUrl,
      children[]{
        title,
        itemType,
        internalUrl->{
          _type,
          slug
        },
        externalUrl,
      }
    },
    secondaryItems[]{
      title,
      itemType,
      internalUrl->{
        _type,
        slug
      },
      externalUrl,
      children[]{
        title,
        itemType,
        internalUrl->{
          _type,
          slug
        },
        externalUrl,
      }
    },
    spotlight {
      title,
      description,
      image {
        ${imageAssetFragment}
      },
      callToAction {
        ${linkFragment}
      }
    }
  },
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
    ${linkFragment}
  }
}`;
