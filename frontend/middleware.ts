import { NextResponse, NextRequest } from "next/server";
import { locales, defaultLocale } from "./lib/i18n";

// export default createMiddleware(routing);
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Skip Next internals & API routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return;
  }

  //Redirect any /en-us/* path to the same path without the /en-us prefix
  if (
    pathname === `/${defaultLocale}` ||
    pathname.startsWith(`/${defaultLocale}/`)
  ) {
    const url = req.nextUrl.clone();
    url.pathname = pathname.replace(`/${defaultLocale}`, "") || "/";

    return NextResponse.redirect(url);
  }

  //If pathname doesn't start with any locale, rewrite internally to /en-us
  const hasLocalePrefix = locales.some(
    ({ id }) => pathname === `/${id}` || pathname.startsWith(`/${id}/`)
  );

  if (!hasLocalePrefix) {
    const url = req.nextUrl.clone();
    url.pathname = `/${defaultLocale}${pathname}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();

  // // Check if the pathname starts with any locale
  // const pathnameIsMissingLocale = locales.every(
  //   (locale) => !pathname.startsWith(`/${locale}`)
  // );

  // if (pathnameIsMissingLocale) {
  //   // Rewrite to `/en/...` internally, but keep `/...` in the browser
  //   const url = req.nextUrl.clone();
  //   url.pathname = `/${defaultLocale}${pathname}`;
  //   console.log("path", url.pathname);
  //   return NextResponse.rewrite(url);
  // }
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
