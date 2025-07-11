"use client";
import Image from "next/image";
import { Link } from "@/types";
import { Navbar, type NavItem } from "quirk-ui";
// import styles from "./styles.module.css";

type HeaderProps = {
  navItems: NavItem[];
  utilityItems: Link[];
  alignment: "left" | "center" | "right";
  logoUrl: string | null;
  logoAlt: string;
  logoLinkSlug?: string;
  variant: "default" | "minimal";
};

export default function Header({
  navItems,
  utilityItems,
  alignment,
  logoUrl,
  logoAlt,
  logoLinkSlug,
  // variant,
}: HeaderProps) {
  // const { isFullbleedHeroAtTop } = useHeroContext();

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
    <Navbar
      isTransparent
      isSticky
      variant="default"
      alignment={alignment}
      items={navItems ?? []}
      utilityItems={utilityItems ?? []}
      logo={
        logoLinkSlug ? (
          <ImageContainer>{LogoImage}</ImageContainer>
        ) : (
          <>{LogoImage}</>
        )
      }
    />
  );
}
