import { Roboto_Flex } from "next/font/google";
import { VisualEditing } from "next-sanity";
import { draftMode } from "next/headers";
import { DisableDraftMode } from "@/components/preview/DisableDraftMode";
import "../../globals.css";
import "quirk-ui/styles.css";
// import { HeroProvider } from "@/context/HeroContext";
import { AppProviders } from "@/app/providers";

import { ThemeWrapper } from "@/lib/ThemeWrapper";
import { resolveLocale } from "@/lib/i18n";
import { setRequestLocale } from "@/lib/requestLocale";
import { ClientAppProviders } from "@/lib/AppProviders";
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
          <ClientAppProviders currentLocale={currentLocale}>
            {isEnabled && (
              <>
                {/* <SanityLiveVisualEditing /> */}
                <DisableDraftMode />
                <VisualEditing />
              </>
            )}

            {children}
          </ClientAppProviders>
        </ThemeWrapper>
      </body>
    </html>
  );
}
