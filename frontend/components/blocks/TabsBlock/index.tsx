"use client";
import React, { useEffect, useState } from "react";
import { RichText } from "@/components/ui/PortableTextRenderer";
import Image from "next/image";
import { resolveLinkURL, urlForImage } from "@/sanity/client";
//import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";
import styles from "./styles.module.css";
import { TabsBlockProps } from "@/types/tabs";
import { useStyleClasses } from "@/lib/hooks/useStyleClasses";
import { CallToAction, Tabs } from "quirk-ui";
import { CallToActions } from "@/components/ui/CallToActions";

export function TabsBlock({
  heading,
  image,
  items,
  callToAction,
  styleOptions,
}: TabsBlockProps) {
  const [tabLinkUrls, setTabLinkUrls] = useState<(string | undefined)[]>([]);

  useEffect(() => {
    async function getTabUrls() {
      const results = await Promise.all(
        items.map((item) =>
          item?.content?.tabLink
            ? resolveLinkURL(item?.content?.tabLink)
            : undefined
        )
      );

      setTabLinkUrls(results);
    }

    getTabUrls();
  }, [items]);

  const imageUrl = image ? urlForImage(image).quality(100).url() : null;
  //const prefersReducedMotion = usePrefersReducedMotion();
  const classNames = useStyleClasses(styleOptions);

  const layout = styleOptions?.layout ?? "default";

  const headingLayoutClass = {
    horizontal: styles.headingHorizontal,
    vertical: styles.headingVertical,
  }[heading.headingLayout ?? "horizontal"];

  const styleClass = {
    default: styles.default,
    split: styles.split,
    "full-bleed": styles.fullBleed,
  }[styleOptions?.layout ?? "default"];

  const orientationMap = {
    orientationHorizontal: "horizontal",
    orientationVertical: "vertical",
  } as const;

  type OrientationKey = keyof typeof orientationMap;

  const orientationValue =
    orientationMap[
      (styleOptions?.orientation ?? "orientationHorizontal") as OrientationKey
    ];

  const themeMap = {
    themeDefault: "default",
    themeLight: "light",
    themeDark: "dark",
    themeTransparent: "transparent",
  } as const;

  type ThemeKey = keyof typeof themeMap;

  const themeValue =
    themeMap[(styleOptions?.theme ?? "themeDefault") as ThemeKey];

  const ImageBlock = () =>
    image && imageUrl ? (
      <div className={styles.image}>
        <Image
          src={imageUrl}
          alt={image?.alt || image?.description || "Tabs image"}
          width={600}
          height={658}
          priority={true}
        />
      </div>
    ) : null;

  const TabsBlock = (
    <Tabs defaultIndex={0} orientation={orientationValue} theme={themeValue}>
      <Tabs.List>
        {items.map((item, index) => (
          <Tabs.Trigger key={item.title} index={index}>
            {item.title}
          </Tabs.Trigger>
        ))}
      </Tabs.List>

      {items.map((item, index) => (
        <Tabs.Panel key={item.title} index={index}>
          <div
            className={`${styles.tabContent} ${styles[orientationValue]}`}
            key={index}
          >
            {item.content?.tabImage && (
              <div className={styles.tabImage}>
                <Image
                  src={urlForImage(item.content?.tabImage).width(250).url()}
                  alt={item.content?.tabImage.alt || "Tab item image"}
                  width={250}
                  height={250}
                />
              </div>
            )}
            <div className={styles.tabText}>
              {item.content?.tabText && (
                <RichText blocks={item.content.tabText} />
              )}

              {item.content?.tabGridItem &&
                Array.isArray(item.content?.tabGridItem) && (
                  <div className={styles.gridItems}>
                    {item.content.tabGridItem.map((gridItem, i) => (
                      <div key={i} className={styles.gridItem}>
                        {gridItem.itemImage && (
                          <Image
                            src={urlForImage(gridItem.itemImage)
                              .width(200)
                              .url()}
                            alt={gridItem.itemImage.alt || "Grid item image"}
                            width={200}
                            height={200}
                          />
                        )}
                        {gridItem.itemText && (
                          <RichText blocks={gridItem.itemText} />
                        )}
                      </div>
                    ))}
                  </div>
                )}

              {tabLinkUrls[index] && tabLinkUrls[index] !== "#" && (
                <CallToAction
                  key={index}
                  as="a"
                  variant={item.content?.tabLink?.variant ?? "primary"}
                  href={tabLinkUrls[index] ?? "#"}
                  target={
                    item.content?.tabLink?.linkOptions?.linkType === "external"
                      ? "_blank"
                      : "_self"
                  }
                  rel={
                    item.content?.tabLink?.linkOptions?.linkType === "external"
                      ? "noopener noreferrer"
                      : ""
                  }
                  aria-label={
                    item.content?.tabLink?.ariaLabel ||
                    item.content?.tabLink?.label
                  }
                >
                  {item.content?.tabLink?.label}
                </CallToAction>
              )}

              {item.content?.tabDisclaimer && (
                <RichText blocks={item.content.tabDisclaimer} />
              )}
            </div>
          </div>
        </Tabs.Panel>
      ))}
    </Tabs>
  );

  //For split layouts
  if (layout === "split") {
    return (
      <section className={`${styles.tabs} ${styles.split} ${classNames}`}>
        <article className={styles.container}>
          <div className={`${styles.heading} ${headingLayoutClass}`}>
            <div>
              {heading.eyebrow && (
                <RichText className={styles.eyebrow} blocks={heading.eyebrow} />
              )}
              <RichText className={styles.title} blocks={heading.title} />
            </div>

            {heading.description && (
              <RichText
                className={styles.subheading}
                blocks={heading.description}
              />
            )}
            {callToAction && (
              <CallToActions
                className={styles.cta}
                items={callToAction.items}
                alignment={callToAction.alignment}
              />
            )}
            {heading.disclaimer && (
              <RichText
                className={styles.disclaimer}
                blocks={heading.disclaimer}
              />
            )}

            <div className={styles.tabsContainer}>{TabsBlock}</div>
          </div>
          {ImageBlock()}
        </article>
      </section>
    );
  }

  if (layout === "default") {
    return (
      <section className={`${styles.tabs} ${styleClass} ${classNames}`}>
        <article className={styles.container}>
          {ImageBlock()}
          <div className={`${styles.heading} ${headingLayoutClass}`}>
            <RichText className={styles.title} blocks={heading.title} />

            {(heading?.description || callToAction?.items) && (
              <div className={styles.text}>
                {heading.description && (
                  <RichText
                    className={styles.description}
                    blocks={heading.description}
                  />
                )}
              </div>
            )}
          </div>
          <div className={styles.tabsContainer}>{TabsBlock}</div>
          {callToAction && (
            <CallToActions
              className={styles.cta}
              items={callToAction.items}
              alignment={callToAction.alignment}
            />
          )}
          {heading.disclaimer && (
            <RichText
              className={styles.disclaimer}
              blocks={heading.disclaimer}
            />
          )}
        </article>
      </section>
    );
  }

  if (layout === "full-bleed") {
    return (
      <section className={`${styles.tabs} ${styleClass} ${classNames}`}>
        <article className={styles.container}>
          {imageUrl && (
            <Image
              src={imageUrl ?? ""}
              alt={image?.alt || image?.description || "Card image"}
              fill
              priority={true}
              style={{ objectFit: "cover" }}
              draggable={false}
              sizes="(min-width: 500px) 500px, 100vw"
            />
          )}

          <div className={styles.overlay}>
            <div className={`${styles.heading} ${headingLayoutClass}`}>
              <RichText className={styles.title} blocks={heading.title} />

              {heading.description && (
                <RichText
                  className={styles.subheading}
                  blocks={heading.description}
                />
              )}

              <div className={styles.tabsContainer}>{TabsBlock}</div>
            </div>

            {callToAction && (
              <CallToActions
                className={styles.cta}
                items={callToAction.items}
                alignment={callToAction.alignment}
              />
            )}
            {heading.disclaimer && (
              <RichText
                className={styles.disclaimer}
                blocks={heading.disclaimer}
              />
            )}
          </div>
        </article>
      </section>
    );
  }
}
