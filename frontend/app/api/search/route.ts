import { NextRequest, NextResponse } from "next/server";
import { sanityClient } from "@/sanity/client";
import { imageAssetFragment } from "@/sanity/queries/fragments";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q");

  if (!q || q.trim() === "") {
    return NextResponse.json(
      { error: "Missing search query" },
      { status: 400 }
    );
  }

  const searchTerm = q.trim();

  try {
    const query = `
      *[
        _type in ["blog", "page"] &&
        (
          title match "*${searchTerm}*" || 
          excerpt match "*${searchTerm}*" ||
          metadata.description match "*${searchTerm}*" ||
          count(categories[title match "*${searchTerm}*"]) > 0 ||
          count(pageBuilder[(_type == "contentBlock" && text[].children[].text match "*${searchTerm}*")]) > 0 ||
          count(pageBuilder[(_type == "accordionBlock" && items[].content[].children[].text match "*${searchTerm}*")]) > 0 ||
          count(pageBuilder[(_type == "richTextBlock" && text[].children[].text match "*${searchTerm}*")]) > 0
        )
      ]{
        _id,
        _type,
        title,
        slug,
        articleType,
        excerpt,
        featuredImage{
          ${imageAssetFragment}
        }
      }
    `;

    const results = await sanityClient.fetch(query, {
      term: `*${searchTerm}*`,
    });

    return NextResponse.json({ results });
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
