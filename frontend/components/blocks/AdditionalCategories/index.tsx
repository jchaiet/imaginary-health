import React from "react";
import { CategoryProps } from "@/types";
import { AdditionalCategoriesProps } from "@/types/additionalCategories";
import styles from "./styles.module.css";
import { LocaleLink } from "@/components/ui/LocaleLink";

export function AdditionalCategories({
  categories,
  type,
}: AdditionalCategoriesProps) {
  if (categories?.length === 0) return;
  return (
    <section
      className={`${styles.additionalCategories} ${type == "article" ? "blog" : ""}`}
    >
      <article className={styles.container}>
        <div className={styles.categories}>
          <p>In this article:</p>

          <div className={styles.list}>
            {categories?.length &&
              categories.map(
                (category: CategoryProps) =>
                  category.slug.current.includes("keyword") && (
                    <LocaleLink
                      href={`/blog?category=${category.slug.current}`}
                      className={styles.category}
                      key={category._id}
                    >
                      {category.title}
                    </LocaleLink>
                  )
              )}
          </div>
        </div>
      </article>
    </section>
  );
}
