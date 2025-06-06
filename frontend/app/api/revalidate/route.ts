import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");
  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  try {
    console.log("Revalidating site...");

    await fetch("https://imaginary-health.vercel.app", {
      next: { revalidate: 0 },
    });
    return NextResponse.json({ revalidated: true });
  } catch (error) {
    console.log("Error revalidating:", error);
    return NextResponse.json(
      { message: "Error revalidating" },
      { status: 500 }
    );
  }
}
