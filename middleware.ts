import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const BYPASS_COOKIE = "coming-soon-bypass";
const bypassCode = process.env.COMING_SOON_BYPASS_CODE ?? "saya-developer";

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // Allow the coming-soon page itself to render.
  if (pathname.startsWith("/coming-soon")) {
    const codeFromQuery = searchParams.get("code");

    if (codeFromQuery && codeFromQuery === bypassCode) {
      const response = NextResponse.next();
      response.cookies.set(BYPASS_COOKIE, bypassCode, {
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });

      return response;
    }

    return NextResponse.next();
  }

  const bypassCookie = request.cookies.get(BYPASS_COOKIE)?.value;
  const codeFromQuery = searchParams.get("code");

  if (codeFromQuery && codeFromQuery === bypassCode) {
    const response = NextResponse.next();
    response.cookies.set(BYPASS_COOKIE, bypassCode, {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  }

  if (bypassCookie === bypassCode) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/coming-soon", request.url));
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|_next/data|favicon.ico|sitemap.xml|robots.txt|.*\\..*).*)",
  ],
};

