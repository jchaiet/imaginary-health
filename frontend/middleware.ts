import { NextResponse, NextRequest } from "next/server";
import { locales, defaultLocale } from "./lib/i18n";

// export default createMiddleware(routing);
export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const hostname = req.headers.get("host");

  if (!hostname) return NextResponse.next();

  //Site mapping
  const siteMapping = {
    "imaginary-health.vercel.app": "imaginary-health",
    "thems-site.vercel.app": "thems",
    "localhost:3000": process.env.SITE_ID,
  };

  const site = siteMapping[hostname as keyof typeof siteMapping];

  if (!site) return NextResponse.next();

  const { pathname } = url;

  // Skip Next internals & API routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const hasLocalePrefix = locales.some(
    ({ id }) => pathname === `/${id}` || pathname.startsWith(`/${id}/`)
  );

  //Redirect any /en-us/* path to the same path without the /en-us prefix
  if (
    pathname === `/${defaultLocale}` ||
    pathname.startsWith(`/${defaultLocale}/`)
  ) {
    const newPathname = pathname.replace(`/${defaultLocale}`, "") || "/";
    url.pathname = `/${site}${newPathname}`;

    return NextResponse.redirect(url);
  }

  //If pathname doesn't start with any locale, rewrite internally to /en-us
  if (!hasLocalePrefix) {
    url.pathname = `/${site}/${defaultLocale}${pathname}`;
    return NextResponse.rewrite(url);
  }

  url.pathname = `/${site}${pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
