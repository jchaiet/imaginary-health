import { RichText } from "@/lib/PortableTextRenderer";
import Link from "next/link";
import { FeaturedDocumentsBlockProps } from "@/types";
import { ArticleItem } from "@/types";

import { useStyleClasses } from "@/lib/hooks/useStyleClasses";
import { urlForImage } from "@/sanity/client";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";

import styles from "./styles.module.css";

export function FeaturedDocumentsBlock({
  heading,
  selectionMode,
  layout = "default",
  limit = 4,
  articles,
  manualArticles,
  // filterMode,
  callToAction,
  styleOptions,
}: FeaturedDocumentsBlockProps) {
  const articlesToDisplay =
    selectionMode === "manual" ? manualArticles : articles;
  const displayLimit =
    selectionMode === "manual" ? manualArticles?.length : limit;

  const classNames = useStyleClasses(styleOptions);
  const headingLayoutClass = {
    horizontal: styles.headingHorizontal,
    vertical: styles.headingVertical,
  }[heading.headingLayout ?? "horizontal"];

  const layoutClassMap = {
    default: styles.default,
    featuredTop: styles.featuredTop,
    featuredLeft: styles.featuredLeft,
    twoColumn: styles.twoColumn,
  }[layout ?? "default"];

  const columnClassMap = {
    "1": styles.col1,
    "2": styles.col2,
    "3": styles.col3,
    "4": styles.col4,
  }[displayLimit ?? "1"];

  const styleClass = {
    default: styles.default,
    split: styles.split,
    "full-bleed": styles.fullBleed,
  }[styleOptions?.layout ?? "default"];

  const label = callToAction?.label;
  const linkType = callToAction?.linkOptions?.linkType;
  const internalSlug =
    linkType == "internal"
      ? callToAction?.linkOptions?.internalUrl?.slug?.current
      : undefined;
  const externalUrl =
    linkType === "external"
      ? callToAction?.linkOptions?.externalUrl
      : undefined;

  return (
    <section
      className={`${styles.featuredDocuments} ${classNames} ${styleClass}`}
    >
      <article className={styles.container}>
        <div className={`${styles.heading} ${headingLayoutClass}`}>
          <div className={styles.flex}>
            {heading.eyebrow && (
              <RichText className={styles.eyebrow} blocks={heading.eyebrow} />
            )}
            <RichText className={styles.title} blocks={heading.title} />

            {callToAction?.label && (
              <Link
                href={internalSlug ? `/${internalSlug}` : (externalUrl ?? "/")}
              >
                {label}
                <ArrowRight size={18} />
              </Link>
            )}
          </div>

          {heading.description && (
            <RichText
              className={styles.subheading}
              blocks={heading.description}
            />
          )}
          {heading.disclaimer && (
            <RichText
              className={styles.disclaimer}
              blocks={heading.disclaimer}
            />
          )}
        </div>

        <div
          className={`${styles.documents} ${layoutClassMap} ${columnClassMap}`}
        >
          {/* GROQ does not allow us to pass limit value dynamically, so we limit the query here */}
          {articlesToDisplay?.length &&
            articlesToDisplay
              .slice(0, displayLimit)
              .map((document: ArticleItem) => {
                const imageUrl =
                  document.featuredImage &&
                  urlForImage(document.featuredImage).quality(100).url();
                const alt = document.featuredImage?.alt;
                const href = `/blog/${document.slug.current}`;
                const mainCategory = document.categories?.length
                  ? document.categories[0]
                  : null;

                return (
                  <Link
                    key={document._id}
                    href={href}
                    className={styles.document}
                  >
                    <div className={styles.documentImage}>
                      <Image
                        src={imageUrl ?? ""}
                        alt={
                          alt ||
                          document?.featuredImage?.description ||
                          "Content image"
                        }
                        width={600}
                        height={400}
                        priority={true}
                      />
                    </div>
                    <div className={styles.documentContent}>
                      {mainCategory && (
                        <div className={styles.documentEyebrow}>
                          {mainCategory.title}
                        </div>
                      )}
                      <div className={styles.documentTitle}>
                        <h3>{document.title}</h3>
                        <div className={styles.callToAction}>
                          {/* <div className={styles.label}>Read more</div> */}
                          <div className={styles.icon}>
                            <ArrowUpRight size={45} />
                          </div>
                        </div>
                      </div>
                      {document.excerpt && (
                        <p className={styles.documentExcerpt}>
                          {document.excerpt}
                        </p>
                      )}
                    </div>
                  </Link>
                );
              })}
        </div>
      </article>
    </section>
  );
}
