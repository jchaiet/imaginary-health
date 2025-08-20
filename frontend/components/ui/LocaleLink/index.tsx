"use client";

import Link, { LinkProps } from "next/link";
import { useLocaleContext } from "@/context/LocaleContext";
import { defaultLocale } from "@/lib/i18n";

type Props = LinkProps & {
  children: React.ReactNode;
  className?: string;
};

export function LocaleLink({ href, children, className, ...rest }: Props) {
  const { locale } = useLocaleContext();

  let localizedHref = href.toString();

  if (locale !== defaultLocale) {
    //Prepend locale if not default
    localizedHref = `/${locale}${localizedHref}`;
  }

  return (
    <Link href={localizedHref} className={className} {...rest}>
      {children}
    </Link>
  );
}
