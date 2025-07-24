import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { urlForImage } from "@/sanity/client";
import { RichText } from "@/components/ui/PortableTextRenderer";
import { toPlainText } from "next-sanity";
import { StickyScrollBlockProps } from "@/types";

import styles from "./styles.module.css";

export function StickyScrollBlock({
  heading,
  items,
  showNumbers,
}: StickyScrollBlockProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const itemRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          const newId = visible[0].target.getAttribute("id");
          if (newId) setActiveId(newId);
        }
      },
      {
        rootMargin: "-45% 0px -45% 0px",
        threshold: 0.1,
      }
    );

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    observerRef.current = observer;

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section className={styles.layout}>
      <article className={styles.container}>
        <div className={styles.heading}>
          <RichText className={styles.title} blocks={heading.title} />

          {heading.description && (
            <RichText
              className={styles.description}
              blocks={heading.description}
            />
          )}
        </div>

        <div className={styles.scroll}>
          <nav className={styles.sidebar}>
            <ul>
              {items.map((item, index) => (
                <li key={item._key}>
                  <button
                    type="button"
                    className={`${styles.link} ${activeId === item._key ? styles.active : ""}`}
                    onClick={() => {
                      setActiveId(item._key);
                      const el = document.getElementById(item._key);
                      el?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                    }}
                  >
                    {showNumbers && (
                      <div className={styles.number}>{index + 1}</div>
                    )}
                    {item.title && toPlainText(item.title)}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.content}>
            {items.map((item, index) => {
              const imageUrl =
                item.image && item.image.asset
                  ? urlForImage(item.image).quality(100).url()
                  : null;

              return (
                <section
                  ref={(el) => {
                    itemRefs.current[index] = el;
                  }}
                  key={item._key}
                  id={item._key}
                  className={styles.item}
                >
                  <div className={styles.text}>
                    {item.title && (
                      <RichText className={styles.title} blocks={item.title} />
                    )}
                    {item.description && (
                      <RichText
                        className={styles.description}
                        blocks={item.description}
                      />
                    )}
                  </div>
                  {item.image && imageUrl && (
                    <div className={styles.image}>
                      <Image
                        src={imageUrl}
                        alt={
                          item.image?.alt ||
                          item.image?.description ||
                          "Content image"
                        }
                        width={600}
                        height={400}
                        priority={true}
                      />
                    </div>
                  )}
                </section>
              );
            })}
          </div>
        </div>
      </article>
    </section>
  );
}
