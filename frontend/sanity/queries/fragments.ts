export const categoryFragment = `
  _id,
  title,
  slug
`;

export const imageAssetFragment = `
  asset->{
    _id,
    url,
    altText,
    title,
    description
  }
`;

export const linkFragment = `
  type,
  variant,
  label,
  ariaLabel,
  image {
    ${imageAssetFragment}
  },
  linkOptions {
    linkType,
    internalUrl->{
      _type,
      slug
    },
    externalUrl
  },
  modalContent,
  videoUrl,
  assetUrl,
  icon
`;

export const callToActionFragment = `
  items[]{
    ${linkFragment}
  },
  alignment
`;

export const articleFragment = `
  ...,
  _id,
  title,
  slug,
  excerpt,
  timeToRead,
  articleType,
  publishDate,
  categories[]->{
    ${categoryFragment}
  },
  featuredImage {
    ${imageAssetFragment}
  }
`;

export const richTextFragment = `
  ...,
  markDefs[]{
    ...,
    _type == "link" => {
      ...,
      internalUrl->{
        _id,
        slug { current },
        title
      }
    }
  }
`;

export const singletonFragment = `
  "singleton": referencedSingleton->{
    _id,
    identifier,
    title,
    blockSelection,
    "blockContent": select(
      blockSelection == "heroBlock" => blockContent.heroBlock{
        ...,
        _type,
        callToAction{
          ${callToActionFragment}
        }
      },
      blockSelection == "contentBlock" => blockContent.contentBlock{
        ...,
        _type,
        callToAction{
          ${callToActionFragment}
        }
      },
      blockSelection == "richTextBlock" => blockContent.richTextBlock{
        ...,
        _type,
        text[]{
          ${richTextFragment}
        },
        callToAction{
          ${callToActionFragment}
        }
      },
    )
  }
`;

export const featuredDocumentsBlockFragment = `
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
      (
        ^.filterMode == "any" &&
        (
          !defined(^.includeFilters) ||
          count(categories[@._ref in ^.^.includeFilters[]._ref]) > 0
        )
      ) ||
      (
        ^.filterMode == "all" &&             
        !defined(^.includeFilters) ||
        (
          count(^.includeFilters) > 0 &&
          count(categories[@._ref in ^.^.includeFilters[]._ref]) == count(coalesce(^.includeFilters, []))
        )
      )
    ) &&
    (
      !defined(^.excludeFilters) ||
      count(categories[@._ref in ^.^.excludeFilters[]._ref]) == 0
    )
  ] | order(publishDate desc)[0...25] {
    ${articleFragment}
  },
`;

export const accordionBlockFragment = `
 ...,
  callToAction {
    ${callToActionFragment}
  },
},
_type == "cardGridBlock" => {
  ...,
  callToAction {
    ${callToActionFragment}
  },
  grid {
    ...,
    items[]{
      ...,
      callToAction{
        ${linkFragment}
      }
    }
  }
`;

export const carouselBlockFragment = `
  ...,
  callToAction {
    ${callToActionFragment}
  },
  items[]{
    ...,
    callToAction{
      ${linkFragment}
    }
  }
`;

export const contentBlockFragment = `
  ...,
  callToAction {
    ${callToActionFragment}
  },
`;

export const heroBlockFragment = `
  ...,
  callToAction {
    ${callToActionFragment}
  },
`;

export const documentListBlockFragment = `
  ...,
  "articles": *[
    _type == ^.documentType && 
    parent._ref == ^.id &&
    (
      !defined(^.includeFilters) ||
      count(categories[@._ref in ^.^.includeFilters[]._ref]) > 0
    ) &&
    (
      !defined(^.excludeFilters) ||
      count(categories[@._ref in ^.^.excludeFilters[]._ref]) == 0
    )
  ] | order(publishDate desc) {
    ${articleFragment}
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
`;
