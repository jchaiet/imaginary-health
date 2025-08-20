import "./globals.css";
import "quirk-ui/styles.css";

// import { SanityLiveVisualEditing } from "@/components/preview/SanityLiveVisualEditing";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
