import { sanityClient, urlForImage } from "@/sanity/client";
import { type ArticleItem } from "quirk-ui/next";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const start = parseInt((searchParams.get("start") as string) || "0");
  const limit = parseInt((searchParams.get("limit") as string) || "3");
  const sort = searchParams.get("sort") || "date-desc";
  const categories = searchParams.getAll("categories");
  const filterMode = searchParams.get("filterMode") || "any";
  const documentType = searchParams.get("documentType") || "blog";
  const includeFilters = searchParams.getAll("include");
  const excludeFilters = searchParams.getAll("exclude");
  const search = searchParams.get("search")?.trim();
  const locale = searchParams.get("locale") || "en-us";

  const sortFieldMap: Record<string, string> = {
    "date-desc": "publishDate desc",
    "date-asc": "publishDate asc",
    "title-asc": "title asc",
    "title-desc": "title desc",
    "popular-desc": "helpfulYesCount desc",
  };

  const order = sortFieldMap[sort] ?? "publishDate desc";

  let categoryConditions = "";

  const allFilters = [...new Set([...includeFilters, ...categories])];

  if (allFilters.length > 0) {
    categoryConditions +=
      filterMode === "all"
        ? `&& count((categories[]->_id)[@ in ${JSON.stringify(
            allFilters
          )}]) == ${allFilters.length}`
        : `&& count((categories[]->_id)[@ in ${JSON.stringify(allFilters)}]) > 0`;
  }

  if (excludeFilters.length > 0) {
    categoryConditions += ` && count((categories[]->_id)[@ in ${JSON.stringify(excludeFilters)}]) == 0`;
  }

  let searchCondition = "";
  if (search) {
    const escaped = search.replace(/"/g, '\\"');
    searchCondition = ` && (
      title match "*${escaped}*" || 
      excerpt match "*${escaped}*" ||
      metadata.description match "*${escaped}*" ||
      count(categories[title match "*${escaped}*"]) > 0 ||
      count(pageBuilder[(_type == "contentBlock" && text[].children[].text match "*${escaped}*")]) > 0 ||
      count(pageBuilder[(_type == "accordionBlock" && items[].content[].children[].text match "*${escaped}*")]) > 0 ||
      count(pageBuilder[(_type == "richTextBlock" && text[].children[].text match "*${escaped}*")]) > 0
    )`;
  }

  const localeCondition = `&& locale == "${locale}"`;

  const query = `*[
    _type == "${documentType}" 
    ${categoryConditions}
    ${searchCondition}
    ${localeCondition}
  ] | order(${order}) [${start}...${start + limit}] {
    _id,
    title,
    slug,
    excerpt,
    timeToRead,
    articleType,
    featuredImage{
      asset->{
        _id,
        url,
        altText,
        title,
        description
      }
    },
    publishDate,
    categories[]->{ _id, title, slug { current } }
  }`;

  const countQuery = `count(*[
    _type == "${documentType}" 
    ${categoryConditions}
    ${searchCondition}
    ${localeCondition}
  ])`;

  try {
    const [articles, totalCount] = await Promise.all([
      sanityClient.fetch(query),
      sanityClient.fetch(countQuery),
    ]);

    const resolvedArticles = articles.map((article: ArticleItem) => ({
      ...article,
      featuredImage: article.featuredImage
        ? {
            ...article.featuredImage,
            imageUrl: urlForImage(article.featuredImage)
              .width(600)
              .quality(90)
              .url(),
          }
        : null,
    }));

    return NextResponse.json({ articles: resolvedArticles, totalCount });
  } catch (error) {
    console.error("Error fetching articles:", error);
    return NextResponse.json(
      { error: "Failed to fetch articles" },
      { status: 500 }
    );
  }
}
