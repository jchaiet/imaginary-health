import { sanityClient } from "@/sanity/client";
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

  const sortFieldMap: Record<string, string> = {
    "date-desc": "publishDate desc",
    "date-asc": "publishDate asc",
    "title-asc": "title asc",
    "title-desc": "title desc",
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

  const query = `*[
    _type == "${documentType}" 
    ${categoryConditions}
    ${searchCondition}
  ] | order(${order}) [${start}...${start + limit}] {
    _id,
    title,
    slug,
    excerpt,
    timeToRead,
    articleType,
    featuredImage,
    publishDate,
    categories[]->{ _id, title }
  }`;

  const countQuery = `count(*[
    _type == "${documentType}" 
    ${categoryConditions}
    ${searchCondition}
  ])`;

  try {
    const [articles, totalCount] = await Promise.all([
      sanityClient.fetch(query),
      sanityClient.fetch(countQuery),
    ]);
    return NextResponse.json({ articles, totalCount });
  } catch (error) {
    console.error("Error fetching articles:", error);
    return NextResponse.json(
      { error: "Failed to fetch articles" },
      { status: 500 }
    );
  }
}
