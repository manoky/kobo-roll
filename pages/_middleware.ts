import { verifyToken } from "lib/jwtService";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  const { pathname } = req.nextUrl;
  const authenticated = verifyToken(req.cookies.token);

  if (pathname.includes("static")) {
    return NextResponse.next();
  }

  if (!authenticated && !pathname.includes("login")) {
    return NextResponse.redirect("/login");
  }

  return NextResponse.next();
}
