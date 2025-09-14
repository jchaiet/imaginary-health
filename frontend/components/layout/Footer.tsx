import {
  Footer as FooterNav,
  type NavItem,
  type UtilityItem,
} from "quirk-ui/core";
import { RichText } from "quirk-ui/next";

import Image from "next/image";
import { PortableTextBlock } from "next-sanity";

export type FooterProps = {
  navItems: NavItem[];
  utilityItems?: UtilityItem[];
  alignment?: "left" | "center" | "right";
  logoUrl?: string | null;
  logoAlt?: string;
  logoLinkSlug?: string;
  variant: "default" | "minimal";
  socialItems?: NavItem[];
  primaryInfo?: PortableTextBlock[];
  secondaryInfo?: PortableTextBlock[];
};

export default function Footer({
  navItems,
  utilityItems,
  // alignment = "left",
  logoUrl,
  logoAlt,
  logoLinkSlug,
  socialItems,
  primaryInfo,
  secondaryInfo,
}: FooterProps) {
  const ImageContainer = ({ children }: { children: React.ReactNode }) => {
    const destination = logoLinkSlug;
    return destination ? (
      <a
        href={`${destination === "home" ? `/` : `/${destination}`}`}
        aria-label={logoAlt}
      >
        {children}
      </a>
    ) : (
      <>{children}</>
    );
  };

  const LogoImage = logoUrl ? (
    <Image
      src={logoUrl ?? ""}
      alt={logoAlt || "Content image"}
      width={150}
      height={50}
      priority={true}
      style={{ width: "auto" }}
    />
  ) : null;

  const enhancedUtilityItems: UtilityItem[] | undefined = utilityItems?.map(
    (item) => {
      if (item.imageSrc) {
        return {
          ...item,
          label: (
            <Image
              src={item.imageSrc}
              alt={item.imageAlt || item.ariaLabel || "Item image"}
              width={175}
              height={59}
            />
          ),
          displayType: "image",
        };
      }

      return item;
    }
  );

  if (!navItems || !Array.isArray(navItems)) {
    return null;
  }

  return (
    <FooterNav
      logo={
        logoLinkSlug ? (
          <ImageContainer>{LogoImage}</ImageContainer>
        ) : (
          <>{LogoImage}</>
        )
      }
      items={navItems}
      primaryInfo={primaryInfo ? <RichText blocks={primaryInfo} /> : null}
      secondaryInfo={secondaryInfo ? <RichText blocks={secondaryInfo} /> : null}
      socialItems={socialItems}
      utilityItems={enhancedUtilityItems}
      copyright="&copy; 2025 Imaginary Health"
    />
  );
}
