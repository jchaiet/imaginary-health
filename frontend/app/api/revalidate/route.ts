import { type NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { parseBody } from "next-sanity/webhook";

type WebhookPayload = { slug?: { current?: string } };

export async function POST(req: NextRequest) {
  try {
    if (!process.env.SANITY_REVALIDATE_SECRET) {
      return new Response(
        "Missing environment variable SANITY_REVALIDATE_SECRET",
        { status: 500 }
      );
    }

    const { isValidSignature, body } = await parseBody<WebhookPayload>(
      req,
      process.env.SANITY_REVALIDATE_SECRET
    );

    if (!isValidSignature) {
      const message = "Invalid signature";
      return new Response(JSON.stringify({ message, isValidSignature, body }), {
        status: 401,
      });
    } else if (!body?.slug?.current) {
      const message = "Bad request";
      return new Response(JSON.stringify({ message, body }), { status: 400 });
    }

    let message;
    if (body.slug.current === "home") {
      revalidatePath("/");
      message = `Updated route: Home Page`;
    } else {
      revalidatePath(body.slug.current);
      message = `Updated route: ${body.slug.current}`;
    }

    return NextResponse.json({ body, message });
  } catch (error) {
    console.error(error);
    return new Response((error as Error).message, { status: 500 });
  }
}
