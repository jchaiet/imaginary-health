"use client";
import Image from "next/image";
import { Link } from "@/types";
import { Navbar, type NavItem } from "quirk-ui";
import { useEffect, useState } from "react";

type HeaderProps = {
  navItems: NavItem[];
  utilityItems: Link[];
  alignment: "left" | "center" | "right";
  logoUrl: string | null;
  logoAlt: string;
  logoLinkSlug?: string;
};

export default function Header({
  navItems,
  utilityItems,
  alignment,
  logoUrl,
  logoAlt,
  logoLinkSlug,
}: HeaderProps) {
  // const [isAtTop, setIsAtTop] = useState(true);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     setIsAtTop(window.scrollY === 0);
  //   };
  //   if (typeof window !== "undefined") {
  //     window.addEventListener("scroll", handleScroll);
  //     return () => window.removeEventListener("scroll", handleScroll);
  //   }
  // }, []);

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
