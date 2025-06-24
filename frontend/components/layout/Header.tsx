import { mapNavigation } from "@/lib/navigation";
import { fetchNavigation, urlForImage } from "@/sanity/client";
import Image from "next/image";

import NavbarWrapper from "./NavbarWrapper";

export default async function Header() {
  const navigationData = await fetchNavigation("main-navigation");
  const navItems = await mapNavigation(navigationData);

  const logoUrl = navigationData.logo
    ? urlForImage(navigationData.logo).quality(100).url()
    : null;

  const ImageContainer = ({ children }: { children: React.ReactNode }) => {
    const destination = navigationData.logoLink?.slug?.current;

    return destination ? (
      <a
        href={`${destination === "home" ? `/` : `/${destination}`}`}
        aria-label={navigationData.title}
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
      alt={
        navigationData.logo?.alt ||
        navigationData.logo?.description ||
        "Content image"
      }
      width={100}
      height={40}
      priority={true}
    />
  );

  return (
    <NavbarWrapper
      items={navItems}
      logo={
        logoUrl && navigationData.logoLink ? (
          <ImageContainer>{LogoImage}</ImageContainer>
        ) : (
          <>{LogoImage}</>
        )
      }
    />
  );
}
