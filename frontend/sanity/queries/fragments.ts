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
    ...,
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
  icon,
  iconAlignment
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
    ...,
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
  },
  _type == "image" => {
    ...,
    ${imageAssetFragment}
  }
`;

export const headingFragment = `
  eyebrow[]{
    ...,
    ${richTextFragment}
  },
  title[]{
    ...,
    ${richTextFragment}
  },
  description[]{
    ...,
    ${richTextFragment}
  },
  disclaimer[]{
    ...,
    ${richTextFragment}
  },
  animateText,
  headingLayout
`;

export const tabItemFragment = `
    ...,
    tabText[]{
      ...,
      ${richTextFragment}
    },
    tabImage {
      ${imageAssetFragment}
    },
    tabLink {
      ${linkFragment}
    },
    tabGridItem[]{
      itemText[]{
        ...,
        ${richTextFragment}
      },
      itemImage {
        ${imageAssetFragment}
      }
    },
    tabDisclaimer[]{
      ...,
      ${richTextFragment}
    },
    callToAction{
      ${linkFragment}
    },
`;

export const stylesFragment = `
  theme,
  orientation,
  padding,
  maxWidth,
  layout,
  background
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
        image {
          ...,
          ${imageAssetFragment}
        },
        callToAction{
          ${callToActionFragment}
        }
      },
      blockSelection == "contentBlock" => blockContent.contentBlock{
        ...,
        _type,
        image {
          ...,
          ${imageAssetFragment}
        },
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
      blockSelection == "rating" => blockContent.rating{
        ...,
        _type,
        image{
          ${imageAssetFragment}
        },
        eyebrow[]{
          ...,
          ${richTextFragment}
        },
        rating,
        description[]{
          ...,
          ${richTextFragment}
        },
      },
    )
  }
`;

export const featuredDocumentsBlockFragment = `
  ...,
  heading {
    ${headingFragment}
  },
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
    locale == $locale &&
    site->identifier.current == $site &&
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
 heading {
    ${headingFragment}
  },
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
  heading {
    ${headingFragment}
  },
  callToAction {
    ${callToActionFragment}
  },
  items[]{
    ...,
    image {
      ...,
      ${imageAssetFragment}
    },
    callToAction{
      ${linkFragment}
    }
  },
  carouselOptions{
    ...,
    ratingSingleton->{
      blockSelection == "rating" => blockContent.rating{
        ...,
        _type,
        image{
          ${imageAssetFragment}
        },
        eyebrow[]{
          ...,
          ${richTextFragment}
        },
        rating,
        description[]{
          ...,
          ${richTextFragment}
        },
      },
    },
    description[]{
      ...,
      ${richTextFragment}
    }
  }
`;

export const contentBlockFragment = `
  ...,
  heading {
    ${headingFragment}
  },
  image {
   ...,
    ${imageAssetFragment}
  },
  callToAction {
    ${callToActionFragment}
  },
`;

export const heroBlockFragment = `
  ...,
  heading {
    ${headingFragment}
  },
  image {
    ${imageAssetFragment}
  },
  callToAction {
    ${callToActionFragment}
  },
`;

export const documentListBlockFragment = `
  ...,
  heading {
    ${headingFragment}
  },
  "articles": *[
    _type == ^.documentType && 
    locale == $locale &&
    site->identifier.current == $site &&
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

export const tabsBlockFragment = `
  ...,
  heading {
    ${headingFragment}
  },
  image {
    ...,
    ${imageAssetFragment}
  },
  callToAction {
    ${callToActionFragment}
  },
  items[]{
    ...,
    ${tabItemFragment}
    content {
      ...,
      ${tabItemFragment}
    }
  }
`;

export const cardGridBlockFragment = `
  ...,
  heading {
    ${headingFragment}
  },
  grid {
    columns {
      xs,
      sm,
      md,
      lg,
      xl
    },
    areas,
    gap,
    autoFitMinMax,
    items[]{
      ...,
      description[] {
        ${richTextFragment}
      },
      image {
        ...,
        ${imageAssetFragment}
      },
      callToAction{
        ${linkFragment}
      }
    },
    className
  },
  textReplaceOnHover,
  options,
  callToAction {
    ${callToActionFragment}
  },
  styleOptions {
    ${stylesFragment}
  }
`;
