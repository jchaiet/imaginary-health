export type InternalLinkOptions = {
  linkType: "internal";
  internalUrl: {
    _type: "reference";
    _ref: string;
  };
};

export type ExternalLinkOptions = {
  linkType: "external";
  externalUrl: string;
};

export type LinkOptions = InternalLinkOptions | ExternalLinkOptions;

export type Link = {
  _type: "link";
  type: "link" | "modal" | "video" | "download";
  label: string;
  linkOptions?: LinkOptions;
  modalContent?: string;
  videoUrl?: string;
  assetUrl: string;
  resolvedUrl?: string;
};
