import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { sanityClient } from "./sanity/client";

type RateRecord = { count: number; lastRequest: number };

const rateMap = new Map<string, RateRecord>();

export async function middleware(req: NextRequest) {}

export const config = {
  matcher: ["/api/:path*"],
};
