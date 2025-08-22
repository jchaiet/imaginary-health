import { imageAssetFragment } from "./fragments";

export const siteQuery = `
*[_type == "site" && identifier.current == $siteId][0]{
  ...,
  logo {
    ${imageAssetFragment}
  },
  siteIcon {
    favicon {
      ${imageAssetFragment}
    },
    appleTouchIcon {
      ${imageAssetFragment}
    },
    maskIcon {
      ${imageAssetFragment}
    },
  },
  "site": identifier.current
}
`;
