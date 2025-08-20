import { useState, useEffect } from "react";
import { locales, getLocaleLink } from "@/lib/i18n";
import { usePathname } from "next/navigation";
import styles from "./styles.module.css";
import { useLocaleContext } from "@/context/LocaleContext";
import Link from "next/link";

type LocaleModalProps = {
  links: { [key: string]: string };
};

export function LocaleModal({ links }: LocaleModalProps) {
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
                <Link
                  href={links[locale.id] || `/${locale.id}`}
                  className={styles.locale}
                >
                  <span>
                    {locale.title}
                    <span>({locale.id})</span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
