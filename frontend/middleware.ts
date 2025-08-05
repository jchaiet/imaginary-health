import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

type RateRecord = { count: number; lastRequest: number };

const rateMap = new Map<string, RateRecord>();

export function middleware(req: NextRequest) {
  const ip = getClientIp(req);
  const now = Date.now();
  const windowMs = 60_000;
  const maxRequests = 10;

  const record = rateMap.get(ip) ?? { count: 0, lastRequest: now };

  if (now - record.lastRequest > windowMs) {
    //Reset window
    record.count = 1;
    record.lastRequest = now;
  } else {
    record.count++;
  }

  rateMap.set(ip, record);

  if (record.count > maxRequests) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  return NextResponse.next();
}

function getClientIp(req: NextRequest): string {
  const forwardedFor = req.headers.get("x-forwarded-for");

  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }

  const realIp = req.headers.get("x-real-ip");
  if (realIp) return realIp;

  return "127.0.0.1";
}

export const config = {
  matcher: ["/api/:path*"],
};
