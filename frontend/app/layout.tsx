import { Roboto_Flex } from "next/font/google";

import "./globals.css";
import "quirk-ui/styles.css";

// import { SanityLiveVisualEditing } from "@/components/preview/SanityLiveVisualEditing";

const roboto = Roboto_Flex({
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
