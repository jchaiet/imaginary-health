export const locales = [
  { id: "en-us", title: "English (US)" },
  { id: "es-us", title: "Spanish (US)" },
];
export const defaultLocale = "en-us";

export function isValidLocale(locale: string): boolean {
  return locales.some((loc) => loc.id === locale);
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

  const slug =
    currentLocale === defaultLocale
      ? currentPath.replace(/^\/+/, "")
      : currentPath.replace(/^\/+/, "").split("/").slice(1).join("/");

  if (currentLocale === targetLocale) {
    return currentPath;
  }

  if (slug) {
    const exists = await pageExists(targetLocale, slug);
    if (exists) {
      return `/${targetLocale}/${slug}`;
    }
  }

  return `/${targetLocale}`;
}
