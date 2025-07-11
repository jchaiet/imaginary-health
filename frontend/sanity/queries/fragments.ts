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
