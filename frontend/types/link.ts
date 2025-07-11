export type InternalLinkOptions = {
  linkType: "internal";
  internalUrl: {
    slug: {
      current: string;
    };
  };
};

export type ExternalLinkOptions = {
  linkType: "external";
  externalUrl: string;
};

export type LinkOptions = InternalLinkOptions | ExternalLinkOptions;

export type Link = {
  _type: "link";
  type: "none" | "link" | "modal" | "video" | "download";
  label: string;
  ariaLabel: string;
  linkOptions?: LinkOptions;
  modalContent?: string;
  videoUrl?: string;
  assetUrl: string;
  resolvedUrl?: string;
  variant:
    | "primary"
    | "primaryInverted"
    | "secondary"
    | "secondaryInverted"
    | "link"
    | "linkInverted"
    | "underline"
    | "underlineInverted";
};
