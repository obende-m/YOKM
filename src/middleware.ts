import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { AUTH_COOKIE_NAME, verifySessionToken } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const secret = process.env.AUTH_SECRET;
  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
  const isAuthenticated = secret ? await verifySessionToken(token, secret) : false;

  const isLoginPage = request.nextUrl.pathname === "/admin/login";

  if (isLoginPage) {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    return NextResponse.next();
  }

  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
