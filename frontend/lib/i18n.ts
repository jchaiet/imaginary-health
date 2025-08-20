export const locales = [
  { id: "en-us", title: "English (US)" },
  { id: "es-us", title: "Spanish (US)" },
];

export const defaultLocale = "en-us";

export function isValidLocale(locale: string): boolean {
  return locales.some((loc) => loc.id === locale);
}

export function resolveLocale(localeParam?: string): string {
  if (!localeParam) return defaultLocale;

  const normalized = localeParam.toLowerCase();
  return isValidLocale(normalized) ? normalized : defaultLocale;
}

function nextPathToSanitySlug(path: string) {
  const segments = path.replace(/^\/+/, "").split("/");

  //Remove locale prefix if preset
  if (isValidLocale(segments[0])) segments.shift();

  if (segments[0] === "blog" && segments[1] === "articles") {
    return segments.slice(2).join("/");
  }

  return segments.join("/");
}

async function pageExists(locale: string, slug: string): Promise<boolean> {
  return fetch(`/api/page-exists?locale=${locale}&slug=${slug}`)
    .then((res) => res.json())
    .then((data) => data.exists);
}

export async function getLocaleLink(
  currentPath: string,
  targetLocale: string,
  currentLocale: string
): Promise<string> {
  if (!isValidLocale(targetLocale)) {
    throw new Error(`Invalid locale: ${targetLocale}`);
  }

  if (currentLocale === targetLocale) {
    return currentPath;
  }

  const slug = nextPathToSanitySlug(currentPath, currentLocale);
  //Special case for en-us homepage
  if (!slug) {
    return targetLocale === defaultLocale ? `/` : `/${targetLocale}`;
  }

  if (slug) {
    const exists = await pageExists(targetLocale, slug);
    if (exists) {
      //Blog articles
      if (currentPath.includes("/blog/articles/")) {
        return targetLocale === defaultLocale
          ? `/blog/articles/${slug}`
          : `/${targetLocale}/blog/articles/${slug}`;
      }

      //Standard pages
      return targetLocale === defaultLocale
        ? `/${slug}`
        : `/${targetLocale}/${slug}`;
    }
  }

  return targetLocale === defaultLocale ? `/` : `/${targetLocale}`;
}
