import { Roboto_Flex } from "next/font/google";
import { VisualEditing } from "next-sanity";
import { draftMode } from "next/headers";
import { DisableDraftMode } from "@/components/preview/DisableDraftMode";
import "../../globals.css";
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

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string; site: string }>;
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
