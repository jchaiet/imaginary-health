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
  assetUrl
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
      internalLink->{
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
