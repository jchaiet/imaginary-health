"use client";
import React, { useState, useEffect } from "react";
import { ButtonGroup, CallToAction, Modal } from "quirk-ui";
import { Link } from "@/types";

type CallToActionsProps = {
  items: Link[];
  alignment: "left" | "center" | "right";
  className?: string;
};

export async function CallToActions({
  items,
  alignment,
  className,
}: CallToActionsProps) {
  const [hrefs, setHrefs] = useState<(string | undefined)[]>([]);

  useEffect(() => {
    if (!items?.length) return;
    const results = items.map((item) => {
      if (item.type !== "link") return undefined;

      const options = item.linkOptions;

      if (options?.linkType === "external" && options.externalUrl) {
        return options.externalUrl;
      }

      if (options?.linkType === "internal" && options.internalUrl?.slug) {
        return `/${options.internalUrl?.slug.current}`;
      }

      return "#";
    });

    setHrefs(results);
  }, [items]);

  if (!items?.length) return null;

  return (
    <ButtonGroup className={className} alignment={alignment}>
      {items.slice(0, 3).map((cta, index) => {
        const href = hrefs[index] ?? "#";

        switch (cta.type) {
          case "link":
            return (
              <CallToAction
                key={index}
                as="a"
                variant={cta.variant ?? "primary"}
                href={href}
                target={
                  cta.linkOptions?.linkType === "external" ? "_blank" : "_self"
                }
                rel={
                  cta.linkOptions?.linkType === "external"
                    ? "noopener noreferrer"
                    : ""
                }
                aria-label={cta.ariaLabel || cta.label}
              >
                {cta.label}
              </CallToAction>
            );
          case "modal":
            return (
              <Modal
                key={index}
                trigger={
                  <CallToAction as="button" variant={cta.variant ?? "primary"}>
                    {cta.label}
                  </CallToAction>
                }
                content={cta.modalContent}
              />
            );
          case "video":
            return (
              <Modal
                key={index}
                trigger={
                  <CallToAction as="button" variant={cta.variant ?? "primary"}>
                    {cta.label}
                  </CallToAction>
                }
                content={<video src={cta.videoUrl} controls autoPlay />}
              />
            );
          case "download":
            return (
              <CallToAction
                key={index}
                as="a"
                variant={cta.variant ?? "primary"}
                href={href}
                download
                target="_blank"
                rel="noopener noreferrer"
                aria-label={cta.ariaLabel || cta.label}
              >
                {cta.label}
              </CallToAction>
            );
        }
      })}
    </ButtonGroup>
  );
}
