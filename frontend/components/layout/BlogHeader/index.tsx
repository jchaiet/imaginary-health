"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { type NavItem } from "quirk-ui";
import { ChevronDown, ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";

import styles from "./styles.module.css";

type BlogHeaderProps = {
  title: string;
  navItems: NavItem[];
  alignment: "left" | "center" | "right";
};

export default function BlogHeader({
  title = "Blog",
  navItems,
  // alignment = "right",
}: BlogHeaderProps) {
  const [openPath, setOpenPath] = useState<string | null>(null);
  const [showMobileItems, setShowMobileItems] = useState(false);

  const pathname = usePathname();

  const navRef = useRef<HTMLDivElement>(null);
  const mobileNavRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<Map<string, HTMLButtonElement | null>>(new Map());

  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (navRef.current && !navRef.current.contains(e.target as Node)) {
      setOpenPath(null);
    }

    if (
      mobileNavRef.current &&
      !mobileNavRef.current.contains(e.target as Node)
    ) {
      setShowMobileItems(false);
    }
  }, []);

  useEffect(() => {
    const hasDocument = typeof document !== "undefined";

    if (hasDocument) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      if (hasDocument) {
        document.removeEventListener("click", handleClickOutside);
      }
    };
  }, []);

  const toggleMobileItems = () => {
    setShowMobileItems((prev) => !prev);
  };

  const togglePath = (path: string) => {
    setOpenPath((prev) => (prev === path ? null : path));
  };

  const renderLinks = (links: NavItem[], parentPath = "") => {
    return links.map((link) => {
      const path = `${parentPath}/${link.label}`;
      const isOpen = openPath === path;
      const hasSublinks = link.sublinks?.length;

      const isAnySubLinkActive = link.sublinks?.some(
        (sublink) => pathname === sublink.href
      );

      const setButtonRef = (el: HTMLButtonElement | null) => {
        buttonRefs.current.set(path, el);
      };

      return (
        <div
          key={path}
          className={`${styles.linkWrapper} ${
            !parentPath ? styles.parent : ""
          }`}
        >
          <div className={styles.linkItem}>
            {link.href ? (
              <a
                href={link.href}
                className={`${styles.link} ${pathname === link.href ? styles.active : ""}`}
                target={link.isExternal ? "_blank" : "_self"}
                rel={link.isExternal ? "noopener noreferrer" : undefined}
                onClick={() => {
                  setOpenPath(null);
                  link.onClick?.();
                }}
                onMouseEnter={() => {
                  if (!parentPath) setOpenPath(null);
                }}
                role="menuitem"
              >
                {link.label}
              </a>
            ) : (
              <button
                ref={setButtonRef}
                aria-haspopup={hasSublinks ? "true" : undefined}
                aria-expanded={isOpen}
                className={`${styles.sublinkToggle} ${
                  isOpen ? styles.open : ""
                } ${isAnySubLinkActive ? styles.active : ""}`}
                onClick={() => togglePath(path)}
                onMouseEnter={() => {
                  setOpenPath(path);
                }}
              >
                {link.label}
                {hasSublinks && (
                  <ChevronDown size={18} className={styles.chevron} />
                )}
              </button>
            )}
          </div>

          {hasSublinks && (
            <div
              className={`${styles.sublinks} ${isOpen ? styles.show : ""}`}
              onMouseLeave={() => togglePath(path)}
              role="menu"
              aria-label={`${link.label} submenu`}
            >
              <div>
                <div className={styles.sublinksInner}>
                  <div className={styles.sublinksColumn}>
                    {renderLinks(link.sublinks!, path)}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <>
      <nav className={styles.blogHeader}>
        <div className={styles.container}>
          <div className={styles.title}>{title}</div>
          <div ref={mobileNavRef} className={styles.itemsMobile}>
            <ChevronRight size={16} className={styles.chevronBreadcrumb} />
            <button
              className={styles.mobileItemsToggle}
              onClick={() => toggleMobileItems()}
            >
              {navItems &&
                navItems.find((item) => item.href === pathname)?.label}
              <ChevronDown size={16} />
            </button>
            <div
              className={`${styles.links} ${showMobileItems ? styles.open : ""}`}
            >
              {renderLinks(navItems)}
            </div>
          </div>
          <div ref={navRef} className={styles.items}>
            {renderLinks(navItems)}
          </div>
        </div>
      </nav>

      <hr className={styles.border} />
    </>
  );
}
