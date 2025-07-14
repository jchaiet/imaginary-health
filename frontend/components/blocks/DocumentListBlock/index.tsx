import { useEffect, useState, useCallback } from "react";
import { RichText } from "@/lib/PortableTextRenderer";
import { DocumentListBlockProps } from "@/types/documentList";
import { ArticleItem } from "@/types";
import { useStyleClasses } from "@/lib/hooks/useStyleClasses";
import { RefreshCw, XIcon, Settings2Icon } from "lucide-react";
import styles from "./styles.module.css";
import { CallToAction, Input, Select } from "quirk-ui";
import { BlogArticleCard } from "@/components/cards/BlogArticleCard";

const sortOptions = [
  { label: "Newest", value: "date-desc" },
  { label: "Oldest", value: "date-asc" },
  { label: "Title A-Z", value: "title-asc" },
  { label: "Title Z-A", value: "title-desc" },
];

export function DocumentListBlock({
  heading,
  layout = "grid",
  includeFilters,
  excludeFilters,
  limit = 3,
  categoryFilters,
  documentType,
  // filterMode,
  styleOptions,
}: DocumentListBlockProps) {
  const [articles, setArticles] = useState<ArticleItem[]>([]);
  const [totalCount, setTotalCount] = useState<number | null>(null);
  const [sort, setSort] = useState<
    "date-desc" | "data-asc" | "title-asc" | "title-desc"
  >("date-desc");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  // const [filterMode, setFilterMode] = useState<"any" | "all">("any");
  const [start, setStart] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const classNames = useStyleClasses(styleOptions);

  const layoutClass = {
    grid: styles.grid,
    list: styles.list,
  }[layout ?? "grid"];

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(e.target.value as typeof sort);
    setArticles([]);
    setStart(0);
    setHasMore(true);
  };

  const toggleFilters = () => {
    if (showFilters) {
      setShowFilters(false);
    } else {
      setShowFilters(true);
    }
  };

  const resetFilters = () => {
    setArticles([]);
    setStart(0);
    setHasMore(true);
    setSelectedCategories([]);
    setSearch("");
    setShowFilters(false);
  };

  const fetchArticles = async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);

    const queryParams = new URLSearchParams({
      start: String(start),
      limit: String(limit),
      sort: sort,
      documentType: documentType,
    });

    if (debouncedSearch) {
      queryParams.append("search", debouncedSearch);
    }

    selectedCategories.forEach((filter) =>
      queryParams.append("categories", filter)
    );

    includeFilters?.forEach((filter) =>
      queryParams.append("include", filter._id)
    );

    excludeFilters?.forEach((filter) =>
      queryParams.append("exclude", filter._id)
    );

    try {
      const res = await fetch(`/api/articles?${queryParams.toString()}`, {
        method: "GET",
      });
      const data = await res.json();

      setArticles((prev) => [...prev, ...data.articles]);
      setStart((prev) => prev + limit);

      setTotalCount(data.totalCount);

      if (start + data.articles.length >= data.totalCount) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Failed to load articles:", error);
      setHasMore(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResize = useCallback(() => {
    if (typeof window !== "undefined" && window.innerWidth > 768) {
      //setIsMobile(false);
      setShowFilters(false);
      if (typeof document !== "undefined") {
        document.body.style.overflow = "";
      }
    }
  }, []);

  useEffect(() => {
    const hasWindow = typeof window !== "undefined";
    const hasDocument = typeof document !== "undefined";

    if (hasWindow) {
      window.addEventListener("resize", handleResize);
    }

    return () => {
      if (hasWindow) {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.body.style.overflow = showFilters ? "hidden" : "";

      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [showFilters]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 1000);

    return () => clearTimeout(handler);
  }, [search]);

  useEffect(() => {
    fetchArticles();
  }, [debouncedSearch, sort, selectedCategories.join(",")]);

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

        <div className={styles.listContainer}>
          {categoryFilters?.length && (
            <div className={styles.filterToggle}>
              <CallToAction
                as="button"
                variant="secondary"
                onClick={toggleFilters}
                disabled={isLoading}
                icon={<Settings2Icon size={21} />}
                iconAlignemnt="left"
              >
                Filters
              </CallToAction>
              <CallToAction
                as="button"
                variant="link"
                onClick={resetFilters}
                disabled={
                  isLoading ||
                  (selectedCategories.length === 0 && search.length === 0)
                }
              >
                Reset
              </CallToAction>
            </div>
          )}
          {categoryFilters && (
            <div
              className={`${styles.listFilters} ${showFilters ? styles.show : styles.hide}`}
            >
              <div className={styles.filterHeader}>
                <h5>Filters</h5>
                <button onClick={() => toggleFilters()}>
                  <XIcon size={24} />
                </button>
              </div>
              <div className={styles.filterList}>
                {categoryFilters?.map((filter) => (
                  <label key={filter._id}>
                    <input
                      type="checkbox"
                      value={filter._id}
                      checked={selectedCategories.includes(filter._id)}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        const newSelection = checked
                          ? [...selectedCategories, filter._id]
                          : selectedCategories.filter((f) => f !== filter._id);

                        setArticles([]);
                        setStart(0);
                        setHasMore(true);
                        setSelectedCategories(newSelection);
                      }}
                    />
                    {filter.title}
                  </label>
                ))}
              </div>

              <CallToAction
                as="button"
                variant="secondary"
                onClick={toggleFilters}
                disabled={isLoading}
                className={styles.applyFilters}
              >
                Apply Filters
              </CallToAction>
            </div>
          )}

          <div className={styles.listWrapper}>
            <div className={styles.listHeader}>
              <div className={styles.listResults}>
                Results: <span>{totalCount}</span>
              </div>

              <div className={styles.listHeaderFilters}>
                <div className={styles.listSearch}>
                  <Input
                    type="text"
                    name="list-search"
                    placeholder="Search articles"
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setArticles([]);
                      setStart(0);
                      setHasMore(true);
                    }}
                  />
                  {search && (
                    <button
                      className={styles.clearSearch}
                      onClick={() => {
                        setSearch("");
                        setArticles([]);
                        setStart(0);
                        setHasMore(true);
                      }}
                    >
                      <XIcon size={21} />
                    </button>
                  )}
                </div>
                <div className={styles.listSort}>
                  <Select
                    id="list-sort"
                    name="list-sort"
                    options={sortOptions}
                    onChange={handleSortChange}
                  />
                </div>
              </div>
            </div>
            <div className={`${styles.list} ${layoutClass}`}>
              {articles &&
                articles.map(
                  (article: ArticleItem) =>
                    documentType == "blog" && (
                      <BlogArticleCard key={article._id} article={article} />
                    )
                )}
            </div>
            {hasMore && (
              <div className={styles.loadMore}>
                <CallToAction
                  as="button"
                  variant="primary"
                  onClick={fetchArticles}
                  disabled={isLoading}
                  icon={<RefreshCw size={21} />}
                  iconAlignemnt="left"
                  className={isLoading ? styles.buttonIsLoading : ""}
                >
                  {isLoading ? "Loading..." : "Load more"}
                </CallToAction>
              </div>
            )}
          </div>
        </div>
      </article>
    </section>
  );
}
