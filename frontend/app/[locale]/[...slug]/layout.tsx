export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const currentLocale = locale || "en-us";

  return (
    <html lang={currentLocale}>
      <body>{children}</body>
    </html>
  );
}
