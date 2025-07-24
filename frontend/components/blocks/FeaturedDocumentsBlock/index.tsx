import { useRef } from "react";
import { RichText } from "@/components/ui/PortableTextRenderer";
import Link from "next/link";
import { FeaturedDocumentsBlockProps } from "@/types";
import { ArticleItem } from "@/types";

import { useStyleClasses } from "@/lib/hooks/useStyleClasses";
import { ArrowRight } from "lucide-react";
import { BlogArticleCard } from "@/components/cards/BlogArticleCard";

import styles from "./styles.module.css";
import { Carousel } from "quirk-ui";

export function FeaturedDocumentsBlock({
  heading,
  selectionMode,
  layout = "default",
  limit = 4,
  articles,
  manualArticles,
  documentType,
  sortBy,
  // filterMode,
  callToAction,
  styleOptions,
}: FeaturedDocumentsBlockProps) {
  const containerRef = useRef<HTMLDivElement>(null);

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

  const sortDocuments = (
    documents: ArticleItem[],
    sortBy: string = "newest"
  ) => {
    return [...documents].sort((a, b) => {
      switch (sortBy) {
        case "title":
          return (a.title || "").localeCompare(b.title || "");
        case "popular":
          return (b.helpfulYesCount || 0) - (a.helpfulYesCount || 0);
        case "newest":
        default:
          return (b.publishDate || "").localeCompare(a.publishDate || "");
      }
    });
  };

  const getCardComponent = (type: string) => {
    switch (type?.toLowerCase()) {
      case "blog":
        return BlogArticleCard;
      default:
        return null;
    }
  };

  const CardComponent = documentType ? getCardComponent(documentType) : null;

  const sortedDocuments = articlesToDisplay?.length
    ? sortDocuments(articlesToDisplay, sortBy)
    : [];

  const carouselItems =
    CardComponent && sortedDocuments
      ? sortedDocuments
          .slice(0, displayLimit)
          .map((article, index) => (
            <CardComponent
              key={article._id}
              article={article}
              className={styles.document}
              index={index}
              layout={layout}
              limit={displayLimit}
            />
          ))
      : [];

  return (
    articlesToDisplay?.length && (
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
                  href={
                    internalSlug ? `/${internalSlug}` : (externalUrl ?? "/")
                  }
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

          {layout === "carousel" ? (
            <div className={styles.carousel} ref={containerRef}>
              <Carousel
                autoplay={false}
                itemsPerPage={4}
                itemsPerRow={4}
                items={carouselItems ?? []}
                isSplit={false}
                externalRef={containerRef as React.RefObject<HTMLElement>}
              />
            </div>
          ) : (
            <div
              className={`${styles.documents} ${layoutClassMap} ${columnClassMap}`}
            >
              {/* GROQ does not allow us to pass limit value dynamically, so we limit the query here */}
              {sortedDocuments?.length &&
                sortedDocuments
                  .slice(0, displayLimit)
                  .map((document: ArticleItem, index) => {
                    return (
                      document?._type?.toLowerCase() === "blog" && (
                        <BlogArticleCard
                          key={document._id}
                          article={document}
                          className={styles.document}
                          index={index}
                          layout={layout}
                          limit={displayLimit}
                        />
                      )
                    );
                  })}
            </div>
          )}
        </article>
      </section>
    )
  );
}
