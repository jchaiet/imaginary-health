import React from "react";
import { ButtonGroup, CallToAction, Modal } from "quirk-ui";
import { Link } from "@/types";

type CallToActionsProps = {
  items: Link[];
  alignment: "left" | "center" | "right";
  className?: string;
};

export function CallToActions({
  items,
  alignment,
  className,
}: CallToActionsProps) {
  if (!items?.length) return null;
  return (
    <ButtonGroup className={className} alignment={alignment}>
      {items.slice(0, 3).map((cta, index) => {
        switch (cta.type) {
          case "link":
            return (
              <CallToAction
                key={index}
                as="a"
                variant={cta.variant ?? "primary"}
                href={cta.resolvedUrl || "#"}
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
                href={cta.resolvedUrl || "#"}
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
