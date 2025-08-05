import { writeSanityClient } from "@/sanity/client";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { postId, isHelpful } = await req.json();

  if (!postId || typeof isHelpful !== "boolean") {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const fieldToIncrement = isHelpful ? "helpfulYesCount" : "helpfulNoCount";

  try {
    await writeSanityClient
      .patch(postId)
      .inc({ [fieldToIncrement]: 1 })
      .commit();

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Sanity update error:", err);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}
