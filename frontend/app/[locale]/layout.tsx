import type { Metadata } from "next";
import { Roboto_Flex } from "next/font/google";
import { VisualEditing } from "next-sanity";
import { draftMode } from "next/headers";
import { DisableDraftMode } from "@/components/preview/DisableDraftMode";
import { fetchSiteSettings, urlForImage } from "@/sanity/client";
import "../globals.css";
import "quirk-ui/styles.css";
import { HeroProvider } from "@/context/HeroContext";
import { ThemeWrapper } from "@/lib/ThemeWrapper";
import { resolveLocale } from "@/lib/i18n";
import { LocaleProvider } from "@/context/LocaleContext";
import { setRequestLocale } from "@/lib/requestLocale";
// import { SanityLiveVisualEditing } from "@/components/preview/SanityLiveVisualEditing";

const roboto = Roboto_Flex({
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await fetchSiteSettings();

  const faviconUrl = settings?.siteIcon?.favicon
    ? urlForImage(settings.siteIcon.favicon)
        .width(32)
        .height(32)
        .quality(100)
        .url()
    : "/favicon.ico";

  return {
    title: settings?.title || "My Site",
    description: settings?.description,
    icons: {
      icon: [faviconUrl && { url: faviconUrl, sizes: "32x32" }].filter(
        Boolean
      ) as { url: string; sizes?: string }[],
      apple: settings?.siteIcon?.appleTouchIcon
        ? urlForImage(settings?.siteIcon?.appleTouchIcon).quality(100).url()
        : undefined,
      other: settings?.siteIcon?.maskIcon
        ? [
            {
              rel: "mask-icon",
              url: urlForImage(settings?.siteIcon?.appleTouchIcon)
                .quality(100)
                .url(),
            },
          ]
        : [],
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
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  const currentLocale = resolveLocale(locale);

  setRequestLocale(currentLocale);

  const { isEnabled } = await draftMode();

  return (
    <html lang={currentLocale}>
      <body className={roboto.className}>
        <ThemeWrapper>
          <HeroProvider>
            <LocaleProvider localeParam={currentLocale}>
              {isEnabled && (
                <>
                  {/* <SanityLiveVisualEditing /> */}
                  <DisableDraftMode />
                  <VisualEditing />
                </>
              )}

              {children}
            </LocaleProvider>
          </HeroProvider>
        </ThemeWrapper>
      </body>
    </html>
  );
}
