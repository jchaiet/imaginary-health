import type { Metadata } from "next";
import { Roboto_Flex } from "next/font/google";
import { VisualEditing } from "next-sanity";
import { draftMode } from "next/headers";
import { DisableDraftMode } from "@/components/preview/DisableDraftMode";
import { fetchSiteSettings, urlForImage } from "@/sanity/client";
import "./globals.css";
import "quirk-ui/styles.css";
import { HeroProvider } from "@/context/HeroContext";
import { ThemeWrapper } from "@/lib/ThemeWrapper";
// import { SanityLiveVisualEditing } from "@/components/preview/SanityLiveVisualEditing";

const roboto = Roboto_Flex({
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await fetchSiteSettings();
  return {
    title: settings?.title || "My Site",
    description: settings?.description,
    icons: {
      icon: settings?.favicon
        ? urlForImage(settings?.favicon).quality(100).url()
        : "/favicon.ico",
    },
    openGraph: {
      title: settings?.defaultSEO?.title,
      description: settings?.defaultSEO?.description,
      images: [
        {
          url: settings?.defaultSEO?.image
            ? urlForImage(settings?.defaultSEO?.image).quality(100).url()
            : "/og-image.png",
          width: 800,
          height: 600,
          alt: settings?.defaultSEO?.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: settings?.defaultSEO?.title,
      description: settings?.defaultSEO?.description,
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeWrapper>
      <HeroProvider>
        <html
          lang="en"
          style={{ overflow: "visible", scrollBehavior: "smooth" }}
        >
          <body className={roboto.className}>
            {(await draftMode()).isEnabled && (
              <>
                {/* <SanityLiveVisualEditing /> */}
                <DisableDraftMode />
                <VisualEditing />
              </>
            )}
            {children}
          </body>
        </html>
      </HeroProvider>
    </ThemeWrapper>
  );
}
