import { RichText } from "@/lib/PortableTextRenderer";
import Link from "next/link";
import { type ArticleItem, DocumentListBlockProps } from "@/types/documentList";
import { useStyleClasses } from "@/lib/hooks/useStyleClasses";
import { urlForImage } from "@/sanity/client";
import { ArrowUpRight } from "lucide-react";
import styles from "./styles.module.css";
import Image from "next/image";

export function DocumentListBlock({
  heading,
  layout = "grid",
  limit,
  filterByCategory,
  styleOptions,
  articles,
}: DocumentListBlockProps) {
  const classNames = useStyleClasses(styleOptions);

  const layoutClass = {
    grid: styles.grid,
    list: styles.list,
  }[layout ?? "grid"];

  return (
    <section className={`${styles.documentList} ${classNames}`}>
      <article className={styles.container}>
        <div className={styles.heading}>
          {heading?.title && (
            <RichText className={styles.title} blocks={heading?.title} />
          )}
          {heading?.description && (
            <RichText
              className={styles.description}
              blocks={heading?.description}
            />
          )}
        </div>

        <div className={`${styles.list} ${layoutClass}`}>
          {articles &&
            articles.map((article: ArticleItem) => {
              console.log(article.categories);
              const imageUrl =
                article.featuredImage &&
                urlForImage(article.featuredImage).quality(100).url();
              const alt = article.featuredImage?.alt;
              const href = `/blog/${article.slug.current}`;
              const mainCategory = article.categories?.length
                ? article.categories[0]
                : null;

              return (
                <Link key={article._id} href={href} className={styles.item}>
                  <div className={styles.itemImage}>
                    {mainCategory && (
                      <div className={styles.category}>
                        {mainCategory.title}
                      </div>
                    )}
                    <Image
                      src={imageUrl ?? ""}
                      alt={
                        alt ||
                        article?.featuredImage?.description ||
                        "Content image"
                      }
                      width={600}
                      height={400}
                      priority={true}
                    />
                  </div>
                  <div className={styles.itemContent}>
                    <div className={styles.itemTitle}>
                      <h3>{article.title}</h3>
                      <div className={styles.callToAction}>
                        {/* <div className={styles.label}>Read more</div> */}
                        <div className={styles.icon}>
                          <ArrowUpRight size={45} />
                        </div>
                      </div>
                    </div>
                    {article.excerpt && <p>{article.excerpt}</p>}
                  </div>
                </Link>
              );
            })}
        </div>
      </article>
    </section>
  );
}
