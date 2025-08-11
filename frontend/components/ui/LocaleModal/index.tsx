import { useState, useEffect } from "react";
import { locales, getLocaleLink } from "@/lib/i18n";
import { usePathname } from "next/navigation";
import styles from "./styles.module.css";

export function LocaleModal({ currentLocale }: { currentLocale: string }) {
  const currentPath = usePathname();
  const [links, setLinks] = useState<{ [key: string]: string }>({});

  console.log(currentLocale);

  useEffect(() => {
    async function buildLinks() {
      const result: { [key: string]: string } = {};
      for (const locale of locales) {
        result[locale.id] = await getLocaleLink(
          currentPath,
          locale.id,
          currentLocale
        );
      }
      setLinks(result);
    }
    if (currentPath) {
      buildLinks();
    }
  }, [currentPath]);

  return (
    <div className={styles.locales}>
      <div className={styles.heading}>
        <h3>Locales</h3>
      </div>
      <div className={styles.content}>
        <ul>
          {locales.map((locale) => {
            return (
              <li key={locale.id}>
                <a
                  href={links[locale.id] || `/${locale.id}`}
                  className={styles.locale}
                >
                  {locale.title} ({locale.id})
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
