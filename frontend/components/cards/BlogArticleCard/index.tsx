import React from "react";
import { urlForImage } from "@/sanity/client";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { ArticleItem } from "@/types";
import Link from "next/link";
import styles from "./styles.module.css";

type BlogArticleProps = {
  article: ArticleItem;
  className?: string;
  index?: number;
  layout?: string;
  limit?: number;
};

export function BlogArticleCard({
  article,
  className = "",
  index,
  layout,
  limit,
}: BlogArticleProps) {
  const imageUrl =
    article.featuredImage &&
    urlForImage(article.featuredImage).quality(100).url();
  const alt = article.featuredImage?.alt;
  const href = `/blog/articles/${article.slug.current}`;
  const mainCategory = article.categories?.length
    ? article.categories[0]
    : null;

  return (
    <Link
      href={href}
      className={`${styles.item} ${className ?? ""} ${index === 0 ? styles.first : styles.notFirst} ${layout ? styles[layout] : ""} ${limit === 1 ? styles.single : ""}`}
    >
      <div className={styles.itemImage}>
        {article.articleType && (
          <div className={styles.category}>{article.articleType}</div>
        )}
        <Image
          src={imageUrl ?? ""}
          alt={alt || article?.featuredImage?.description || "Content image"}
          width={600}
          height={400}
          priority={true}
        />
      </div>
      <div className={styles.itemContent}>
        {mainCategory && (
          <div className={styles.itemEyebrow}>{mainCategory.title}</div>
        )}
        <div className={styles.itemTitle}>
          <h3>{article.title}</h3>
          <div className={styles.callToAction}>
            {/* <div className={styles.label}>Read more</div> */}
            <div className={styles.icon}>
              <ArrowUpRight size={45} />
            </div>
          </div>
        </div>
        {article.excerpt && (
          <p className={styles.itemExcerpt}>{article.excerpt}</p>
        )}
      </div>
    </Link>
  );
}
