import { Roboto_Flex } from "next/font/google";

import "./globals.css";
import "quirk-ui/styles.css";
import { ThemeWrapper } from "@/lib/ThemeWrapper";
import { AppProviders } from "./providers";
import { defaultLocale } from "@/lib/i18n";

const roboto = Roboto_Flex({
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={defaultLocale}>
      <body className={roboto.className}>
        <ThemeWrapper>
          <AppProviders currentLocale="en-us">{children}</AppProviders>{" "}
        </ThemeWrapper>
      </body>
    </html>
  );
}
