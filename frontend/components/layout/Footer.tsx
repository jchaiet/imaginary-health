import { Footer as FooterNav } from "quirk-ui";
import type { NavItem, UtilityItem } from "quirk-ui";
import Image from "next/image";
import { PortableTextBlock } from "next-sanity";
import { RichText } from "@/components/ui/PortableTextRenderer";

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

  const LogoImage = (
    <Image
      src={logoUrl ?? ""}
      alt={logoAlt || "Content image"}
      width={100}
      height={40}
      priority={true}
    />
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
      utilityItems={utilityItems}
      copyright="&copy; 2025 Imaginary Health"
    />
  );
}
