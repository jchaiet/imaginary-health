"use client";
import React, { useState, useEffect } from "react";
import { SanityImage } from "@/types";

import Image from "next/image";
import { Input, Text } from "quirk-ui/core";
import { LocaleLink } from "quirk-ui/next";
import { ChevronRight, Search, XIcon, RefreshCw } from "lucide-react";
import styles from "./styles.module.css";

type SearchResult = {
  _id: string;
  _type: string;
  excerpt?: string;
  featuredImage?: SanityImage;
  title: string;
  slug: {
    current: string;
  };
  articleType?: string;
};

type GroupedResult = {
  type: string;
  items: SearchResult[];
};

export function SearchModal() {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [filter, setFilter] = useState<string | null>(null);
  const [groups, setGroups] = useState<GroupedResult[] | null>(null);
  // const [filterMode, setFilterMode] = useState<"any" | "all">("any");
  // const [start, setStart] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // const limit = 3;

  const fetchArticles = async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);

    try {
      const res = await fetch(
        typeof window !== "undefined"
          ? `/api/search?q=${debouncedSearch}`
          : `${process.env.NEXT_PUBLIC_SANITY_BASE_URL}/api/search?q=${debouncedSearch}`,
        {
          method: "GET",
        }
      );

      const data = await res.json();

      if (Array.isArray(data.results)) {
        setResults(data.results);
        groupData(data.results);
      } else {
        console.error("Unexpected response format:", data);
      }

      //setStart((prev) => prev + limit);

      // setTotalCount(data.totalCount);

      // if (start + data.articles.length >= data.totalCount) {
      //   setHasMore(false);
      // }
    } catch (error) {
      console.error("Failed to load articles:", error);
      setHasMore(false);
    } finally {
      setIsLoading(false);
    }
  };

  function groupData(data: SearchResult[]) {
    const groupedData = data.reduce(
      (acc: { [key: string]: SearchResult[] }, item) => {
        const groupKey = item._type;
        if (!acc[groupKey]) {
          acc[groupKey] = [];
        }

        acc[groupKey].push(item);
        return acc;
      },
      {}
    );

    const groupedArray = Object.entries(groupedData).map(([key, items]) => ({
      type: key,
      items,
    }));

    setGroups(groupedArray);
  }

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 1000);

    return () => clearTimeout(handler);
  }, [search]);

  useEffect(() => {
    if (!debouncedSearch) return;
    fetchArticles();
  }, [debouncedSearch]);

  return (
    <div className={styles.search}>
      <div className={styles.heading}>
        <div className={styles.input}>
          <Search size={21} />
          <Input
            className={styles.inputField}
            type="text"
            name="global-search"
            placeholder="Search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />

          {isLoading && (
            <span className={styles.loading}>
              <RefreshCw size={21} />
            </span>
          )}

          {search && (
            <button
              className={styles.clearSearch}
              onClick={() => {
                setSearch("");
              }}
            >
              <XIcon size={16} />
            </button>
          )}
        </div>
      </div>

      <div
        className={`${styles.results} ${results.length ? "" : styles.empty}`}
      >
        {!results.length ? (
          <Text className={styles.emptyText}>Start typing to search</Text>
        ) : (
          <>
            {groups && (
              <div className={styles.filters}>
                {groups.map((group, i) => (
                  <div key={`${group.type}-${i}`} className={styles.filter}>
                    <button type="button" onClick={() => setFilter(group.type)}>
                      {group.type}
                      <span className={styles.count}>{group.items.length}</span>
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className={styles.list}>
              {results.map((item) => {
                if (filter !== null && item._type !== filter) {
                  return null;
                }

                let href = "";
                if (item._type === "blog") {
                  href = `/blog/articles/${item.slug.current}`;
                } else if (item._type === "page") {
                  href = `/${item.slug.current}`;
                }

                return (
                  <LocaleLink
                    key={item._id}
                    className={styles.item}
                    href={href}
                  >
                    <div className={styles.image}>
                      {item.featuredImage?.asset.url ? (
                        <Image
                          src={item.featuredImage?.asset.url ?? ""}
                          alt={
                            item.featuredImage?.asset.altText ||
                            item.featuredImage?.asset.description ||
                            "Item image"
                          }
                          width={600}
                          height={400}
                          priority={false}
                        />
                      ) : (
                        <div className={styles.imageHolder} />
                      )}
                    </div>
                    <div className={styles.content}>
                      <Text>{item.title}</Text>
                      <Text className={styles.details}>
                        {item._type}
                        {item.articleType && (
                          <span className={styles.type}>
                            <ChevronRight size={14} />
                            {item.articleType}
                          </span>
                        )}
                      </Text>
                      {/* <Text>{item.excerpt}</Text> */}
                    </div>
                  </LocaleLink>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
