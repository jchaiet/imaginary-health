import React from "react";
import { CallToAction, Modal } from "quirk-ui";
import { Link } from "@/types";

export function CallToActions(ctas: Link[]) {
  if (!ctas?.length) return null;
  return (
    <>
      {ctas.slice(0, 3).map((cta, index) => {
        switch (cta.type) {
          case "link":
            return (
              <CallToAction
                key={index}
                as="a"
                variant="primary"
                href={cta.resolvedUrl || "#"}
                target={
                  cta.linkOptions?.linkType === "external" ? "_blank" : "_self"
                }
                rel={
                  cta.linkOptions?.linkType === "external"
                    ? "noopener noreferrer"
                    : ""
                }
              >
                {cta.label}
              </CallToAction>
            );
          case "modal":
            return (
              <Modal
                key={index}
                trigger={
                  <CallToAction as="button" variant="ghost">
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
                  <CallToAction as="button" variant="ghost">
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
                variant="ghost"
                href={cta.resolvedUrl || "#"}
                download
                target="_blank"
                rel="noopener noreferrer"
              >
                {cta.label}
              </CallToAction>
            );
        }
      })}
    </>
  );
}
